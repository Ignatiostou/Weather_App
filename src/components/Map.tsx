import mapboxgl from 'mapbox-gl'

import {MAPBOX} from '@/config'

import { useEffect,useMemo,useRef,useState} from 'react'
import { useTheme } from '@/components/ThemeProvider'
import { useWeather } from '@/hooks/useWeather'
import { Marker } from '@/components/Marker'

import type { LngLatLike,Map as Maptype} from 'mapbox-gl'


export const Map = () => {

    const {theme} = useTheme()
    const {weather}=useWeather()

    const center = useMemo<LngLatLike>(
        () =>
            weather?.location?.lon && weather?.location?.lat
                ? [weather.location.lon, weather.location.lat]
                : MAPBOX.DEFAULTS.CENTER,
        [weather]
    );


    const mapContainerRef=useRef<HTMLDivElement>(null);

    const [map,setMap]=useState<Maptype|null>(null);

    // Initialize map only once
    useEffect(()=>{
        if(!mapContainerRef.current) return;
            
        mapboxgl.accessToken=import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

        const mapInstance = new mapboxgl.Map({
            container:mapContainerRef.current,
            style:theme==='dark'?'mapbox://styles/mapbox/dark-v10':'mapbox://styles/mapbox/streets-v11',
            center,
            zoom:MAPBOX.DEFAULTS.ZOOM,
        });
        
        mapInstance.on('load', () => {
            setMap(mapInstance);
        });
        
        return () => {
            mapInstance.remove();
            setMap(null);
        };
    }, [theme]);

    // Update center and style separately
    useEffect(() => {
        if (!map || !center) return;
        
        map.flyTo({
            center,
            zoom: MAPBOX.DEFAULTS.ZOOM,
            essential: true
        });
    }, [map, center]);

    // Update style when theme changes
    useEffect(() => {
        if (!map) return;
        
        const style = theme === 'dark' 
            ? 'mapbox://styles/mapbox/dark-v10' 
            : 'mapbox://styles/mapbox/streets-v11';
        
        map.setStyle(style);
    }, [map, theme]);

  return (
    <div ref={mapContainerRef} className="h-[300px] bg-card text-card-foreground
    rounded-xl border overflow-hidden shadow-sm">
    {map && weather && <Marker map={map} coordinates={center} />}
    </div>
  )
}