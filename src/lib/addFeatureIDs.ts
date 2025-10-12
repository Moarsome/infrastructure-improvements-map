// Adds missing IDs to features

import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

export function addFeatureIDs(geojson:FeatureCollection<Geometry, GeoJsonProperties>)
{
    let currentID = 1
    const newGeoJSON = geojson

        newGeoJSON.features.map((feature)=>{
        feature.id = currentID
        currentID++
    })

    return newGeoJSON
}