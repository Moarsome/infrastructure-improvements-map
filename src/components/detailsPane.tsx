import { Box, Typography } from "@mui/material";
import type { MapRef } from "@vis.gl/react-maplibre";
import { useEffect, useState } from "react";
import { centroid } from "../lib/getPolygonCenter";
import type { Polygon } from "geojson";

type HoverBarProps = {
    map: MapRef|null
}

const defaultProjectDetails = {
    projectTitle: "Welcome",
    projectDescription: "Click on any project to show details" 
}

export default function DetailsPane(currentMap:HoverBarProps)
{
    const [clickedProjectDetails, setClickedProjectDetails] = useState(defaultProjectDetails)

    useEffect(() => {
        const getMap = currentMap.map
        if (!getMap) return 
        getMap.on('click', 'point', (e) => {
                if (e.features) 
                {
                    getMap.setFeatureState(
                        { source: 'my-data', id: e.features[0].id },
                        { clicked: true }
                    );
                    setClickedProjectDetails({
                        projectTitle: e.features[0].properties['ProjectName'],
                        projectDescription: e.features[0].properties['ProjectDescription']
                    })
                    const polygon = (e.features[0].geometry as Polygon)
                    const coordinates = centroid(polygon)

                    getMap.flyTo({
                    center: [coordinates[0], coordinates[1]],
                    zoom: 15
                    });
                }
            });
    })

    return (
        <Box  sx={{padding: "2em", width:"20em", height:"50em", bgcolor: "#FFFF", zIndex: 10, position: 'absolute'}}>
            <Typography paddingBottom="1em" variant="h6">{clickedProjectDetails.projectTitle}</Typography>
            <Typography>{clickedProjectDetails.projectDescription}</Typography>
        </Box>
    )
}