import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { openWeatherApi } from "@/api";
import { APP,WEATHER_API } from "@/config";
import type {
  CurrentWeather,
  MinutelyForecast,
  HourlyForecast,
  DailyForecast,
  Alert,
  Geocoding,
  WeatherTimezone,
  OneCallWeatherRes,
} from "@/types";

export type WeatherUnitType ="metric" | "imperial";


type Weather = {
  current: CurrentWeather | null;
  minutely: MinutelyForecast[] | null;
  hourly: HourlyForecast[] | null;
  daily: DailyForecast[] | null;
  alerts?: Alert[] | null;
  timezone: WeatherTimezone | null;

  // κρατάμε και human-readable info
  location:
    | (Pick<Geocoding, "lat" | "lon"> & {
        name?: string;
        country?: string;
        state?: string;
      })
    | null;

  loading: boolean;
  error?: string | null;
};

type WeatherStateParam = {
  lat?: number;
  lon?: number;
  unit?: WeatherUnitType;
};

type WeatherProviderState = {
  weather: Weather | null;
  setWeather: (params: WeatherStateParam) => Promise<void>;
};

const initialState: WeatherProviderState = {
  weather: null,
  setWeather: async () => {},
};

export const WeatherProviderContext = createContext<WeatherProviderState>(initialState);

export const WeatherProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const defaultLat = parseFloat(localStorage.getItem(APP.STORE_KEY.LAT) || WEATHER_API.DEFAULTS.LAT.toString());
  const defaultLon = parseFloat(localStorage.getItem(APP.STORE_KEY.LON) || WEATHER_API.DEFAULTS.LON.toString());
  const defaultUnit = (localStorage.getItem(APP.STORE_KEY.UNIT) as WeatherUnitType) || WEATHER_API.DEFAULTS.UNIT;

  const [weather, setWeatherState] = useState<Weather | null>(null);

  const oneCall = useCallback(
    async (lat: number, lon: number, units: WeatherUnitType) => {
      const response = await openWeatherApi.get("/data/3.0/onecall", {
        params: {
          lat,
          lon,
          units,
        },
      });
      return response.data as OneCallWeatherRes;
    },
    [],
  );

  const reverseGeocoding = useCallback(
    async (lat: number, lon: number, limit: number = 1) => {
      const response = await openWeatherApi.get("/geo/1.0/reverse", {
        params: {
          lat,
          lon,
          limit,
        },
      });
      return response.data as Geocoding[];
    },
    [],
  );

  const getWeather = useCallback(
    async ({ lat = defaultLat, lon = defaultLon, unit = defaultUnit }: WeatherStateParam) => {
      setWeatherState((prev) =>
        prev
          ? { ...prev, loading: true, error: null }
          : {
              current: null,
              minutely: null,
              hourly: null,
              daily: null,
              alerts: null,
              timezone: null,
              location: null,
              loading: true,
              error: null,
            },
      );

      try {
        const [oneCallResponse, locationInfo] = await Promise.all([
          oneCall(lat, lon, unit),
          reverseGeocoding(lat, lon),
        ]);

        const loc = locationInfo[0] || null;

        setWeatherState({
          current: oneCallResponse.current,
          minutely: oneCallResponse.minutely,
          hourly: oneCallResponse.hourly,
          daily: oneCallResponse.daily,
          alerts: oneCallResponse.alerts || null,
          location: loc
            ? {
                lat: loc.lat,
                lon: loc.lon,
                name: loc.name,
                country: loc.country,
                state: loc.state,
              }
            : null,
          timezone: {
            timezone: oneCallResponse.timezone,
            offset: oneCallResponse.timezone_offset,
          },
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Get weather error:", error);
        setWeatherState((prev) =>
          prev
            ? { ...prev, loading: false, error: "Failed to fetch weather" }
            : {
                current: null,
                minutely: null,
                hourly: null,
                daily: null,
                alerts: null,
                timezone: null,
                location: null,
                loading: false,
                error: "Failed to fetch weather",
              },
        );
      }
    },
    [defaultLat, defaultLon, defaultUnit, oneCall, reverseGeocoding],
  );

  const value = useMemo(
    () => ({
      weather,
      setWeather: getWeather,
    }),
    [weather, getWeather],
  );

  //Initial weather call

  useEffect(() => {
    (async () => await getWeather({}))();
  }, [getWeather]);

  return <WeatherProviderContext.Provider value={{weather,setWeather:getWeather}}>
    {children}
    </WeatherProviderContext.Provider>;
};
