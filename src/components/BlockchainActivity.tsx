import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Block {
  id: number;
  hash: string;
  txCount: number;
  size: string;
  time: string;
  optimized: boolean;
}

const generateHash = () =>
  "0x" + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join("");

const generateBlock = (id: number): Block => ({
  id,
  hash: generateHash(),
  txCount: Math.floor(Math.random() * 120) + 10,
  size: (Math.random() * 2.5 + 0.3).toFixed(2) + " KB",
  time: "just now",
  optimized: Math.random() > 0.3,
});

const BlockchainActivity = () => {
  const [blocks, setBlocks] = useState<Block[]>(() =>
    Array.from({ length: 5 }, (_, i) => ({
      ...generateBlock(1000 + i),
      time: `${(5 - i) * 3}s ago`,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks(prev => {
        const newBlock = generateBlock(prev[0].id + 1);
        return [newBlock, ...prev.slice(0, 4)];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Live Blockchain Activity
          </CardTitle>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-primary font-mono">LIVE</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <AnimatePresence mode="popLayout">
          {blocks.map((block) => (
            <motion.div
              key={block.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border/30"
            >
              <div className="flex items-center gap-3">
                <div className="font-mono text-xs text-muted-foreground">#{block.id}</div>
                <div className="font-mono text-xs text-foreground/80">{block.hash}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-mono">{block.txCount} tx</span>
                <span className="text-xs text-muted-foreground font-mono">{block.size}</span>
                {block.optimized && (
                  <Badge variant="outline" className="text-[10px] border-primary/40 text-primary px-1.5 py-0">
                    DRL-OPT
                  </Badge>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default BlockchainActivity;
