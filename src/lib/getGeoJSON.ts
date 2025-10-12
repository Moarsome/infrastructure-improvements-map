import type { FeatureCollection } from "geojson";

export async function loadGeoJSON(filePath: string): Promise<FeatureCollection|null> {
    
  try {
    
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text()
    const geojsonData = await JSON.parse(text);
    return geojsonData;
  } catch (error) {
    console.error("Error loading GeoJSON:", error);
    return null
  }
}