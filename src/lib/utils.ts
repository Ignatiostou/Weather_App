import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

type Geolocating = {
  lat: number;
  lon: number;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getGeolocation = (): Promise<Geolocating> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`));
        },
      );
    }
  });
};
