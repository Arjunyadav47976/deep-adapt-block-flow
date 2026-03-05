import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  icon: LucideIcon;
  delay?: number;
}

const MetricCard = ({ title, value, change, positive = true, icon: Icon, delay = 0 }: MetricCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <Card className="glow-primary border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-bold mt-1 font-mono">{value}</p>
            <p className={`text-xs mt-1 font-mono ${positive ? 'text-primary' : 'text-destructive'}`}>
              {positive ? '↑' : '↓'} {change}
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
            <Icon size={20} />
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default MetricCard;
