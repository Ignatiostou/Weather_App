import { useMemo } from 'react';
import { useWeather } from '@/hooks/useWeather';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';

import type { ChartConfig } from '@/components/ui/chart';

const chartConfig = {
  rain: {
    label: 'Rain',
    color: '#3b82f6',
  },
  snow: {
    label: 'Snow',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

export const PrecipitationChart = () => {
  const { weather } = useWeather();

  const chartData = useMemo(() => {
    return weather?.hourly?.map((item) => ({
      hour: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true,
      }),
      rain: item.rain?.['1h'] || 0,
      snow: item.snow?.['1h'] || 0,
    }));
  }, [weather]);

  if (!weather || !chartData) return <Skeleton className='h-[420px]' />;

  return (
    <div className="relative w-full">
      <ChartContainer
        config={chartConfig}
        className='h-[420px] w-full'
      >
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
        >
          <XAxis
            dataKey='hour'
            tickLine={false}
            axisLine={false}
            tickCount={12}
            tickMargin={16}
            stroke="#888"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickCount={6}
            tickMargin={16}
            tickFormatter={(value) => `${value}mm`}
            stroke="#888"
            domain={[0, 'auto']}
          />
          <ChartTooltip content={<ChartTooltipContent />} />

          <Bar
            dataKey='rain'
            fill='#3b82f6'
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey='snow'
            fill='#60a5fa'
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
      
      <div className="absolute bottom-2 left-2 flex items-center gap-4 bg-card/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3b82f6' }} />
          <span className="text-xs text-muted-foreground">Rain</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#60a5fa' }} />
          <span className="text-xs text-muted-foreground">Snow</span>
        </div>
      </div>
    </div>
  );
};
