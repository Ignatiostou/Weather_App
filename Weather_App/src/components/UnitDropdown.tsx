import {APP,WEATHER_API} from "@/config";
import {openWeatherApi} from "@/api";
import {useEffect,useCallback,useState} from "react";
import {Button} from "@/components/ui/button";
import { DropdownMenu,DropdownMenuContent,DropdownMenuRadioGroup,DropdownMenuLabel,
        DropdownMenuRadioItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { useWeather } from "@/hooks/useWeather";

import type { WeatherUnitType } from "@/components/WeatherProvider";



export const UnitDropdown = () => {

    const { setWeather } = useWeather();

    const [unit,setUnit]=useState<WeatherUnitType>(
        (localStorage.getItem(APP.STORE_KEY.UNIT) as WeatherUnitType) || WEATHER_API.DEFAULTS.UNIT
    );

    useEffect(()=>{
        setWeather({unit});
        localStorage.setItem(APP.STORE_KEY.UNIT, unit);
        
    }, [unit,setWeather]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" 
                size="icon" 
                className="border-border/60 
                bg-card/40 
                shadow-sm 
                hover:bg-card/70 hover:shadow-md transition-all duration-300">
                    {unit === 'metric' ? '°C' : '°F'}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-border/60 bg-gradient-to-b from-card to-card/90 shadow-lg">
                <DropdownMenuLabel className="text-muted-foreground">Weather Settings</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={unit} onValueChange={(value)=>setUnit(value as WeatherUnitType)}>
                    <DropdownMenuRadioItem value="metric">°C (Celsius)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="imperial">°F (Fahrenheit)</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}