import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const trainingData = Array.from({ length: 50 }, (_, i) => ({
  episode: i * 20,
  reward: -200 + 180 * (1 - Math.exp(-i / 12)) + Math.random() * 15 - 7.5,
  loss: 2.5 * Math.exp(-i / 15) + Math.random() * 0.15,
}));

const chartConfig = {
  reward: { label: "Cumulative Reward", color: "hsl(var(--chart-1))" },
  loss: { label: "Training Loss", color: "hsl(var(--chart-2))" },
};

const DRLTrainingChart = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          DRL Agent Training Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <LineChart data={trainingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 12%)" />
            <XAxis dataKey="episode" stroke="hsl(215, 12%, 35%)" fontSize={10} tickLine={false} />
            <YAxis yAxisId="reward" stroke="hsl(215, 12%, 35%)" fontSize={10} tickLine={false} />
            <YAxis yAxisId="loss" orientation="right" stroke="hsl(215, 12%, 35%)" fontSize={10} tickLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line yAxisId="reward" type="monotone" dataKey="reward" stroke="var(--color-reward)" strokeWidth={2} dot={false} />
            <Line yAxisId="loss" type="monotone" dataKey="loss" stroke="var(--color-loss)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  </motion.div>
);

export default DRLTrainingChart;
