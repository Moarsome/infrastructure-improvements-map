import type { FeatureCollection } from "geojson";
import { type FillLayerSpecification } from "maplibre-gl";
import { useState, useEffect } from "react";
import { middleOfAuckland } from "../lib/constants";
import { loadGeoJSON } from "../lib/getGeoJSON";
import { Source, Layer, useMap, type MapRef} from "@vis.gl/react-maplibre";
import { addFeatureIDs } from "../lib/addFeatureIDs";
import { addProjectCategories } from "../lib/categoriseProjects";

type AddLayerProps = {
  onLoad: (mapCurrent:MapRef) => void;
};
 
 export default function AddLayer({onLoad}:AddLayerProps ) {
    
    const defaultGeojson: FeatureCollection = {
    type: 'FeatureCollection',
    features: [
        {
        type: 'Feature', geometry: { type: 'Point', coordinates: [middleOfAuckland[0], middleOfAuckland[1]] },
        properties: null
        }
    ]
    };

    const layerStyle: FillLayerSpecification = {
        id: 'point',
        type: 'fill',
        paint: {
            'fill-color': [
            'match',
            ['get', 'ProjectCategory'], 
            'pedestrian', '#007cbf',
            'cycling', '#2ea85dff',
            'transit', '#7800beff',
            'car', '#96291aff',
            'grey'
            ],
            
            'fill-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    1,
                    0.8
                ],
            'fill-outline-color':['case',
                    ['boolean', ['feature-state', 'clicked'], false],
                    '#FFFF',
                    '#FFFF'
                ]
                    
        },
        source: 'https://api.maptiler.com/tiles/contours/tiles.json?key=ZDDbImwebSw8CysloxvF'
    };

    const [loadedGeoJSON, setLoadedGeoJSON] = useState(defaultGeojson)
    const map = useMap()

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadGeoJSON('https://infrastructureappst.blob.core.windows.net/infrastructure-gis-app-cn/AT_Infrastructure_Projects.geojson.gz');
            if (!data) return;
            const newData = addFeatureIDs(data)
            const dataWithCategories = addProjectCategories(newData)
            setLoadedGeoJSON(dataWithCategories);
            if (map.current) onLoad(map.current);
        };
        fetchData();
        }, []); 

    return(
        <Source id="my-data" type="geojson" data={loadedGeoJSON}>
            <Layer {...layerStyle}>
                
            </Layer>
        </Source>
    )
}
