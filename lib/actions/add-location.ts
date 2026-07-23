"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";
async function geocodeAddress(address: string) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY!;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    const response = await fetch(url,{
    headers: { 'User-Agent': 'MyApp/1.0' } // Required by OpenStreetMap
  });
    const data = await response.json()
    console.log(data);
    const lat = parseFloat(data[0].lat)
    const lng = parseFloat(data[0].lon)
    return {lat,lng};
}
export async function addLocation(formData:FormData,tripId:string){
    const session = await auth()
    if(!session){
        throw new Error("Not authenticated");
    }
    const  address = formData.get("address")?.toString()
    if(!address){
        throw new Error("Missing address")
    }
    const {lat,lng} = await geocodeAddress(address)
    const count = await prisma.location.count({
        where:{
            tripId
        }
    })
    await prisma.location.create({
        data: {
            locationTitle: address,
            lat,
            lng,
            tripId,
            order:count
        }
    })
    redirect(`/trips/${tripId}`)
}