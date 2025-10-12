import type { Polygon } from "geojson";

import { useState, useEffect } from "react";

import { useMap, Popup} from "@vis.gl/react-maplibre";
import { centroid } from "../lib/getPolygonCenter";

 /*
 export default function AddPopup() {
    const [marketCoords, setMarkerCoords] = useState([0,0])
    const [showMarker, setShowMarker] = useState(false)
    const [projectName, setProjectName] = useState("n/a")
    const { current: map } = useMap(); 
    
    useEffect(() => {
        if (!map) return;
    
        (async () => {
            map.on('mouseover', 'point', (e) => {
                if (e.features)
                {
                    const polygon = (e.features[0].geometry as Polygon)
                    const coordinates = centroid(polygon)
                    setMarkerCoords(coordinates)
                    setShowMarker(true)
                    setProjectName(e.features[0].properties['ProjectName'])
                }
            })
            map.on('click', 'point', (e) => {
                if (e.features)
                {
                    const polygon = (e.features[0].geometry as Polygon)
                    const coordinates = centroid(polygon)

                    map.flyTo({
                    center: [coordinates[0], coordinates[1]],
                    minZoom: 20
                    });
                }
            });

            // mouse cursor appearance change
            map.on('mouseenter', 'point', () => {
                map.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'point', () => {
                map.getCanvas().style.cursor = '';
                setShowMarker(false)
            });
        }
        )();
    }, [map]);

    return(
        showMarker && (
        <Popup 
        longitude={marketCoords[0]}
        latitude={marketCoords[1]}>
            {projectName}
            </Popup>
        )
    )
}
*/