import { Box, Paper, Typography } from "@mui/material";
import { useMap, type MapRef } from "@vis.gl/react-maplibre";
import { useState, useEffect } from "react";

type HoverBarProps = {
    map: MapRef|null
}

const PaperStyleProps = {
    width: '30vh', 
    height: '50%', 
    alignContent: 'center', 
    textAlign: 'center'
}

export default function AddHoverBar(currentMap:HoverBarProps)
{
    const [showMarker, setShowMarker] = useState(false)
    const [projectName, setProjectName] = useState("n/a")
    const [hoveredFeatureID, setHoveredFeatureID] = useState<string|number|undefined>()
    const [currentlyHovering, setCurrentlyHovering] = useState(false)

    useEffect(() => {
        const getMap = currentMap.map
        if (!getMap) return 
        if (hoveredFeatureID)
        {
            if (currentlyHovering)
                getMap.setFeatureState(
                    { source: 'my-data', id: hoveredFeatureID },
                    { hover: true }
                );
            else
                getMap.setFeatureState(
                    { source: 'my-data', id: hoveredFeatureID },
                    { hover: false }
                );
        }
        
    }, [currentlyHovering]);

    useEffect(() => {
        const getMap = currentMap.map
        if (!getMap) return 
     
        getMap.on('mouseover', 'point', (e) => {
            if (e.features)
            {
                setShowMarker(true)
                setProjectName(e.features[0].properties['ProjectName'])
            }
        })
        

        // mouse cursor appearance change
        getMap.on('mouseenter', 'point', (e) => {
            getMap.getCanvas().style.cursor = 'pointer';
            if (e.features) {
                setCurrentlyHovering(true)
                if (hoveredFeatureID) {
                    getMap.setFeatureState(
                        { source: 'my-data', id: hoveredFeatureID },
                        { hover: false }
                    );
                }
                setHoveredFeatureID(e.features[0].id);
            }
        });

        // change it back to a pointer when it leaves, turn hover feature off
        getMap.on('mouseleave', 'point', () => {
            setCurrentlyHovering(false)
            getMap.getCanvas().style.cursor = '';
            setShowMarker(false)
            if (hoveredFeatureID) {
                getMap.setFeatureState(
                    { source: 'my-data', id: hoveredFeatureID },
                    { hover: false }
                );
            }
        });
    }, [currentMap])

    return(
    showMarker && (
    <Box sx={{width: '100%',height: '10vh', zIndex: 10, display: 'flex', justifyContent: 'center'}}>
        <Paper sx={PaperStyleProps}>
            <Typography>{projectName}</Typography>
        </Paper>
    </Box>
    ))
}