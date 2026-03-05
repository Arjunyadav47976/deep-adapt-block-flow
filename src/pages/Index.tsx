import { motion } from "framer-motion";
import {
  Database, Cpu, HardDrive, Activity, Zap, Shield, Blocks, Network,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetricCard from "@/components/MetricCard";
import NetworkTopology from "@/components/NetworkTopology";
import DRLTrainingChart from "@/components/DRLTrainingChart";
import StorageMetricsChart from "@/components/StorageMetricsChart";
import BlockchainActivity from "@/components/BlockchainActivity";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 glow-primary">
              <Blocks className="text-primary" size={22} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">BlockIIoT-DRL</h1>
              <p className="text-xs text-muted-foreground">Adaptive Storage Optimization</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono text-primary">System Active</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-6"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Adaptive Blockchain Storage
            <span className="text-gradient"> Optimization</span>
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-sm sm:text-base">
            Deep Reinforcement Learning for IoT — reducing on-chain storage by up to 78%
            while maintaining data integrity and sub-200ms query latency.
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Storage Saved" value="78.2%" change="+4.1% vs. baseline" icon={HardDrive} delay={0} />
          <MetricCard title="Query Latency" value="142ms" change="-63% optimized" icon={Zap} delay={0.1} />
          <MetricCard title="Throughput" value="2,847" change="tx/sec peak" icon={Activity} delay={0.2} />
          <MetricCard title="IoT Devices" value="1,024" change="nodes connected" icon={Cpu} delay={0.3} />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-secondary/50 border border-border/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <Database size={14} className="mr-1.5" /> Overview
            </TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <Cpu size={14} className="mr-1.5" /> DRL Training
            </TabsTrigger>
            <TabsTrigger value="network" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <Network size={14} className="mr-1.5" /> Network
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid lg:grid-cols-2 gap-4">
              <StorageMetricsChart />
              <BlockchainActivity />
            </div>
            {/* System Health */}
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Shield size={14} /> System Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Blockchain Sync", value: 98 },
                  { label: "DRL Model Accuracy", value: 94 },
                  { label: "Network Uptime", value: 99.7 },
                  { label: "Storage Efficiency", value: 87 },
                ].map((item) => (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-mono text-foreground">{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-1.5 bg-secondary" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="space-y-4">
            <DRLTrainingChart />
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Model Architecture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "Algorithm", value: "PPO (Proximal Policy Optimization)" },
                    { label: "State Space", value: "Block size, tx frequency, node capacity" },
                    { label: "Action Space", value: "Store/Prune/Offload/Compress" },
                    { label: "Reward", value: "−αΔStorage + βIntegrity − γLatency" },
                    { label: "Episodes", value: "1,000 (converged at ~600)" },
                    { label: "Learning Rate", value: "3e-4 with cosine annealing" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg bg-secondary/40 border border-border/30">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-mono mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="network">
            <NetworkTopology />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-12 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          Adaptive Blockchain Storage Optimization for IoT Using Deep Reinforcement Learning — Research Dashboard
        </p>
      </footer>
    </div>
  );
};

export default Index;
