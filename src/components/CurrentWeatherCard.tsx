import {APP,WEATHER_API} from "@/config";
import {openWeatherApi} from "@/api";
import {useEffect,useCallback,useState} from "react";
import { useWeather } from "@/hooks/useWeather";
import {Card,CardContent,CardHeader,CardTitle,CardFooter,CardDescription} from "@/components/ui/card";
import {Navigation2Icon} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton";
import type { WeatherUnitType } from "@/components/WeatherProvider";

export const CurrentWeatherCard = () => {

    const { weather } = useWeather();

    if (!weather || !weather.current) return <Skeleton className="min-h-[200px] rounded-xl" />;

    const currentWeather={
        dt:new Date(weather.current.dt * 1000).toLocaleTimeString('en-US',
        {timeStyle:'short'}),
        iconCode:weather.current.weather[0].icon,
        temp:weather.current.temp.toFixed(),
        description:weather.current.weather[0].description,
        windSpeed:weather.current.wind_speed.toFixed(),
        windDeg:weather.current.wind_deg,
        humidity:weather.current.humidity,
        feelsLike:weather.current.feels_like.toFixed(),
        visibility:(weather.current.visibility / 1000).toFixed(),
        pressure:weather.current.pressure,
        dewPoint:weather.current.dew_point.toFixed(),
        uvi:weather.current.uvi.toFixed(),
        }

        const weatherUnit=localStorage.getItem(APP.STORE_KEY.UNIT) as WeatherUnitType || WEATHER_API.DEFAULTS.UNIT;
  return (
    <Card className="container mx-auto rounded-xl bg-card/40 shadow-sm border-border/60">
        <CardHeader>
            <CardTitle className="text-2xl">Current Weather</CardTitle>
            <CardDescription>
                {currentWeather.dt}
            </CardDescription>
        </CardHeader>
        <CardContent className="grow">
            <div className="flex flex-wrap items-center gap-x-6">
                <figure className="flex items-center gap-x-2">
                    <img src={`https://openweathermap.org/img/wn/${currentWeather.iconCode}@4x.png`} 
                    alt={currentWeather.description} 
                    width={70}
                    height={70}
                    className="object-contain"
                    />
                    
                </figure>
                <p className="text-4xl font-bold flex items-start sm:text-5xl">
                    {currentWeather.temp}°
                </p>
                <span className="text-3xl">
                    {APP.UNIT.TEMP[weatherUnit]}
                </span>
                <p className="text-sm capitalize">{currentWeather.description}</p>
                <div className="text-sm flex items-center gap-2">
                    <span className="text-muted-foreground">Feels like:</span>
                    <span>{currentWeather.feelsLike}°</span>
                </div>


            </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-x-8 gap-y-2 items-center justify-between">
            <div>
                <p className="text-sm text-muted-foreground">Wind</p>
                <div className="flex items-center gap-x-2">
                    <Navigation2Icon style={{ transform: `rotate(${currentWeather.windDeg}deg)` }} size={16} fill="currentColor" />
                    <span>{currentWeather.windSpeed} {APP.UNIT.WIND[weatherUnit]}</span>
                </div>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Humidity</p>
                <span>{currentWeather.humidity}%</span>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Visibility</p>
                <span>{currentWeather.visibility} km</span>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Pressure</p>
                <span>{currentWeather.pressure} hPa</span>
            </div>
        </CardFooter>
    </Card> 
  )
}

