import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const storageData = [
  { method: "Full BC", storage: 100, latency: 850 },
  { method: "Light Node", storage: 62, latency: 520 },
  { method: "Pruning", storage: 45, latency: 480 },
  { method: "Sharding", storage: 38, latency: 390 },
  { method: "DRL-Opt", storage: 22, latency: 210 },
];

const chartConfig = {
  storage: { label: "Storage (GB)", color: "hsl(var(--chart-1))" },
  latency: { label: "Latency (ms)", color: "hsl(var(--chart-3))" },
};

const StorageMetricsChart = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Storage Optimization Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <BarChart data={storageData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 12%)" />
            <XAxis dataKey="method" stroke="hsl(215, 12%, 35%)" fontSize={10} tickLine={false} />
            <YAxis stroke="hsl(215, 12%, 35%)" fontSize={10} tickLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="storage" fill="var(--color-storage)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="latency" fill="var(--color-latency)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  </motion.div>
);

export default StorageMetricsChart;
