import './index.css'
import { Map, type MapRef } from '@vis.gl/react-maplibre'
import { middleOfAuckland } from './lib/constants'
import Nav from './Nav'
import Stack from '@mui/material/Stack'
import 'maplibre-gl/dist/maplibre-gl.css'; 
import AddLayer from './components/addLayer'
import AddHoverBar from './components/addHoverBar'
import { useState } from 'react'
import DetailsPane from './components/detailsPane'

export default function App() {
  const [currentMap, setCurrentMap] = useState<MapRef|null>(null)

  const handleComponentALoaded = (currentMap:MapRef) => {
    setCurrentMap(currentMap)
  };

  return (
    <Stack gap={10}>
      <Nav/>
      <Stack direction="row" gap={0}>
          <DetailsPane map={currentMap}/>
        <AddHoverBar map={currentMap}/>
      </Stack>
        <div className="map">
          <Map 
            initialViewState={{
              longitude: middleOfAuckland[0],
              latitude: middleOfAuckland[1],
              zoom: 12
            }}
            mapStyle="https://tiles.openfreemap.org/styles/liberty"
          >
            <AddLayer onLoad={handleComponentALoaded}/>
          </Map>
        </div>
    </Stack>
  )
}
