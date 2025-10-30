import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson"
import { categories, defaultCategory } from "./constants"

function identifyCategory(projectName:string)
{
  for (const [category ,terms] of Object.entries(categories))
  {
    for (const term of terms)
    {
      const includesTerm = projectName.toLowerCase().includes(term.toLowerCase())

      if (includesTerm)
        return category
    }
  }
  return defaultCategory
}

export function addProjectCategories(geojson:FeatureCollection<Geometry, GeoJsonProperties>)
{
    const newGeoJSON = geojson

    newGeoJSON.features.map((feature)=>{
      if (feature.properties)
      {
        feature.properties.ProjectCategory = identifyCategory(feature.properties.ProjectName)
      }
    })

    return newGeoJSON
}