import {useState} from "react";

import { Tabs,TabsTrigger,TabsList,TabsContent} from "@/components/ui/tabs";
import {Card,CardHeader,CardTitle,CardContent} from "@/components/ui/card";
import { OverviewChart } from "@/components/OverviewChart";
import { PrecipitationChart } from "@/components/PrecipitationChart";
import { WindChart } from "@/components/WindChart";
import { HumidityChart } from "@/components/HumidityChart";
import { CloudCoverChart } from "@/components/CloudCoverChart";
import { PressureChart } from "@/components/PressureChart";
import { UVChart } from "@/components/UVChart";
import { VisibilityChart } from "@/components/VisibilityChart";
import { FeelsLikeChart } from "@/components/FeelsLikeChart";

type Tab =
  | 'overview'
  | 'precipitation'
  | 'wind'
  | 'humidity'
  | 'cloudCover'
  | 'pressure'
  | 'uv'
  | 'visibility'
  | 'feelsLike';


const TABS_LIST = [
  {
    title: 'Overview',
    value: 'overview',
  },
  {
    title: 'Precipitation',
    value: 'precipitation',
  },
  {
    title: 'Wind',
    value: 'wind',
  },
  {
    title: 'Humidity',
    value: 'humidity',
  },
  {
    title: 'Cloud cover',
    value: 'cloudCover',
  },
  {
    title: 'Pressure',
    value: 'pressure',
  },
  {
    title: 'UV',
    value: 'uv',
  },
  {
    title: 'Visibility',
    value: 'visibility',
  },
  {
    title: 'Feels like',
    value: 'feelsLike',
  },
];

export const HourlyWeatherTabs = () => {

  const [tab,setTab]=useState<Tab>('overview');

 

  return (
    <Tabs value={tab} 
    onValueChange={(value)=>setTab(value as Tab)}
    className="py-6 gap-4">

        <div className='flex items-center gap-6 overflow-x-auto pb-2'>
            <h2 className='text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent whitespace-nowrap'>
              Hourly Details
            </h2>
            <TabsList className='bg-muted/50 backdrop-blur-sm gap-1.5 
            overflow-x-auto 
            overflow-y-hidden 
            rounded-xl border border-border/50 shadow-sm p-1.5 
            hover:shadow-md transition-shadow' 
            style={{scrollbarWidth:'none'}}>
                {TABS_LIST.map(({title,value}) => (
                    <TabsTrigger 
                        key={value} 
                        value={value} 
                        className='relative border-none 
                        data-[state=active]:bg-card
                        data-[state=active]:text-foreground
                        data-[state=active]:shadow-sm
                        data-[state=active]:scale-105
                        data-[state=inactive]:text-muted-foreground
                        data-[state=inactive]:hover:text-foreground
                        data-[state=inactive]:hover:bg-muted/80
                        rounded-lg px-4 py-2 text-sm font-medium
                        transition-all duration-200 ease-in-out
                        whitespace-nowrap
                        hover:scale-[1.02]'>
                        {title}
                        <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary scale-x-0 data-[state=active]:scale-x-100 transition-transform duration-200 rounded-full" 
                        data-state={tab === value ? 'active' : 'inactive'} />
                    </TabsTrigger>
                ))}
            </TabsList>

        </div>
        <TabsContent value="overview">
            <Card className="bg-card/50 backdrop-blur-sm shadow-sm border">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <OverviewChart />
                </CardContent>
            </Card>
        </TabsContent>

         <TabsContent value="precipitation">
            <Card className="bg-card/50 backdrop-blur-sm shadow-sm border">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Precipitation</CardTitle>
                </CardHeader>
                <CardContent>
                    <PrecipitationChart />
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="wind">
            <Card className="bg-card/50 backdrop-blur-sm shadow-sm border">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Wind</CardTitle>
                </CardHeader>
                <CardContent>
                    <WindChart />
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="humidity">
            <Card className="bg-card/50 backdrop-blur-sm shadow-sm border">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Humidity</CardTitle>
                </CardHeader>
                <CardContent>
                    <HumidityChart />
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="cloudCover">
            <Card className="bg-card/50 backdrop-blur-sm shadow-sm border">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Cloud Cover</CardTitle>
                </CardHeader>
                <CardContent>
                    <CloudCoverChart />
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="pressure">
            <Card className="bg-card/50 backdrop-blur-sm shadow-sm border">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Pressure</CardTitle>
                </CardHeader>
                <CardContent>
                    <PressureChart />
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="uv">
            <Card className="bg-card/50 backdrop-blur-sm shadow-sm border">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">UV Index</CardTitle>
                </CardHeader>
                <CardContent>
                    <UVChart />
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="visibility">
            <Card className="bg-card/50 backdrop-blur-sm shadow-sm border">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Visibility</CardTitle>
                </CardHeader>
                <CardContent>
                    <VisibilityChart />
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="feelsLike">
            <Card className="bg-card/50 backdrop-blur-sm shadow-sm border">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Feels Like</CardTitle>
                </CardHeader>
                <CardContent>
                    <FeelsLikeChart />
                </CardContent>
            </Card>
        </TabsContent>

      
    </Tabs>
  )
}

