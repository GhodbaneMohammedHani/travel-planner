interface GeoCodeResult {
    country: string,
    formattedAddress:string
}
export async function getCountryFromCoordinates(lat:number,lng:number):Promise<GeoCodeResult> {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY!;
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    const response = await fetch(url,{
    headers: { 'User-Agent': 'MyApp/1.0' } // Required by OpenStreetMap
  });
    const data = await response.json()
    const country = data.address.country
    const formattedAddress = data.display_name

    return { country:country || "Unknown",formattedAddress: formattedAddress }
}