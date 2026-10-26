import { createPortal} from "react-dom"
import mapboxgl from 'mapbox-gl'

import { useEffect,useMemo,useRef} from 'react'
import { useWeather } from '@/hooks/useWeather'
import {APP,WEATHER_API} from '@/config'
import { ThermometerSunIcon } from "lucide-react"

import type { Map,LngLatLike,Marker as MarkerType} from 'mapbox-gl'
import type { WeatherUnitType } from "@/components/WeatherProvider"

type Props={
    map:Map,
    coordinates:LngLatLike;
}

export const Marker = ({map,coordinates}:Props) => {

    const {weather}=useWeather();

    const markerRef=useRef<MarkerType|null>(null);

    const markerElement=useMemo(() => {
        const el=document.createElement('div');
        el.className='marker-container';
        return el;
    }, []);

    const weatherUnit=(localStorage.getItem(
        APP.STORE_KEY.UNIT) as WeatherUnitType) || WEATHER_API.DEFAULTS.UNIT;

    useEffect(()=>{
        if(!map || !coordinates) return;
        
        if(!markerRef.current){
            markerRef.current=new mapboxgl.Marker({
                element:markerElement,
                anchor: 'bottom'
            })
            .setLngLat(coordinates)
            .addTo(map);
        } else {
            markerRef.current.setLngLat(coordinates);
        }
        
        return () => {
            if(markerRef.current) {
                markerRef.current.remove();
                markerRef.current = null;
            }
        };
    }, [map, coordinates, markerElement]);
    
    if(!weather?.current?.temp) return null;

  return createPortal(
        <div className="relative flex items-center gap-2 bg-card text-card-foreground rounded-lg p-2 shadow-md font-semibold
        text-sm drop-shadow-lg">
            <ThermometerSunIcon size={16} className="text-orange-500" />
        
            <span>{weather.current.temp.toFixed(1)}°{weatherUnit === 'metric' ? 'C' : 'F'}</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rotate-45
            size-3 bg-card shadow-md">
            </div>
        </div>,
        markerElement
    );
}

