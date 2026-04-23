import { useMemo } from 'react';
import { useWeather } from '@/hooks/useWeather';
import {
  Area,
  AreaChart,
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
  visibility: {
    label: 'Visibility',
    color: '#14b8a6',
  },
} satisfies ChartConfig;

export const VisibilityChart = () => {
  const { weather } = useWeather();

  const chartData = useMemo(() => {
    return weather?.hourly?.map((item) => ({
      hour: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true,
      }),
      visibility: item.visibility ? (item.visibility / 1000).toFixed(1) : 0,
    }));
  }, [weather]);

  if (!weather || !chartData) return <Skeleton className='h-[420px]' />;

  return (
    <div className="relative w-full">
      <ChartContainer
        config={chartConfig}
        className='h-[420px] w-full'
      >
        <AreaChart
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
            tickFormatter={(value) => `${value}km`}
            stroke="#888"
            domain={[0, 'auto']}
          />
          <ChartTooltip content={<ChartTooltipContent />} />

          <Area
            type='natural'
            dataKey='visibility'
            stroke='#14b8a6'
            fill='#14b8a6'
            fillOpacity={0.5}
            strokeWidth={2}
            strokeOpacity={1}
          />
        </AreaChart>
      </ChartContainer>
      
      <div className="absolute bottom-2 left-2 flex items-center gap-4 bg-card/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#14b8a6' }} />
          <span className="text-xs text-muted-foreground">Visibility</span>
        </div>
      </div>
    </div>
  );
};