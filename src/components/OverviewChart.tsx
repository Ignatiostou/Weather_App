import { useMemo } from 'react';
import { useWeather } from '@/hooks/useWeather';
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';

import type { ChartConfig } from '@/components/ui/chart';

const chartConfig = {
  temp: {
    label: 'Temperature',
    color: '#60a5fa',
  },
  feels_like: {
    label: 'Feels like',
    color: '#a78bfa',
  },
} satisfies ChartConfig;

export const OverviewChart = () => {
  const { weather } = useWeather();

  const chartData = useMemo(() => {
    return weather?.hourly?.map((item) => ({
      hour: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true,
      }),
      temp: item.temp.toFixed(),
      feels_like: item.feels_like.toFixed(),
    }));
  }, [weather]);

  if (!weather || !chartData) return <Skeleton className='h-[420px]' />;

  return (
    <ChartContainer
      config={chartConfig}
      className='h-[420px] w-full'
    >
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{ top: 20, right: 30, left: 10, bottom: 40 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#444" />
        <XAxis
          dataKey='hour'
          tickLine={false}
          axisLine={false}
          tickCount={12}
          tickMargin={16}
          stroke="#888"
        />
        <YAxis
          dataKey='temp'
          tickLine={false}
          axisLine={false}
          tickCount={6}
          tickMargin={16}
          tickFormatter={(value) => `${value}°`}
          stroke="#888"
          domain={['auto', 'auto']}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend 
          content={<ChartLegendContent />} 
          verticalAlign="bottom"
          align="left"
        />

        <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="feelsLikeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity={0} />
            </linearGradient>
        </defs>

        <Area
          type='natural'
          dataKey='temp'
          stroke='#60a5fa'
          fill='#60a5fa'
          fillOpacity={0.5}
          strokeWidth={2}
          strokeOpacity={1}
        />
        <Area
          type='natural'
          dataKey='feels_like'
          stroke='#a78bfa'
          fill='#a78bfa'
          fillOpacity={0.5}
          strokeWidth={2}
          strokeOpacity={1}
        />
      </AreaChart>
    </ChartContainer>
  );
};
