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
    projectCategory: "Click on any project to show details",
    projectStartDate: "",
    projectEndDate: "",
    projectDescription: ""
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
                console.log(e.features[0].properties)
                setClickedProjectDetails({
                    projectTitle: e.features[0].properties['ProjectName'],
                    projectCategory: e.features[0].properties['ProjectCategory'],
                    projectDescription: e.features[0].properties['ProjectDescription'],
                    projectStartDate: new Date(e.features[0].properties['ProjectStartDate']).toLocaleDateString(),
                    projectEndDate: new Date(e.features[0].properties['ProjectEndDate']).toLocaleDateString()
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
            <Typography paddingBottom="1em" fontWeight="bold">{clickedProjectDetails.projectCategory}</Typography>
            <Typography paddingBottom="1em" >{clickedProjectDetails.projectStartDate} - {clickedProjectDetails.projectEndDate}</Typography>
            <Typography paddingBottom="1em" >{clickedProjectDetails.projectDescription}</Typography>
        </Box>
    )
}