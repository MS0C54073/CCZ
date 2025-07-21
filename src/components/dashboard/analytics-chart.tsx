"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { analyticsData } from "@/lib/data";

export function AnalyticsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={analyticsData.chartData}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
            contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
            }}
        />
        <Bar dataKey="applications" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
