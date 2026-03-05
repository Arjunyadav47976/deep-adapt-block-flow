import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const nodes = [
  { id: 'edge-1', x: 60, y: 40, label: 'Edge Node 1', type: 'edge' },
  { id: 'edge-2', x: 180, y: 30, label: 'Edge Node 2', type: 'edge' },
  { id: 'edge-3', x: 300, y: 50, label: 'Edge Node 3', type: 'edge' },
  { id: 'fog-1', x: 100, y: 120, label: 'Fog Layer', type: 'fog' },
  { id: 'fog-2', x: 260, y: 110, label: 'Fog Layer', type: 'fog' },
  { id: 'cloud', x: 180, y: 200, label: 'Cloud BC', type: 'cloud' },
  { id: 'drl', x: 340, y: 180, label: 'DRL Agent', type: 'drl' },
];

const edges = [
  ['edge-1', 'fog-1'], ['edge-2', 'fog-1'], ['edge-2', 'fog-2'],
  ['edge-3', 'fog-2'], ['fog-1', 'cloud'], ['fog-2', 'cloud'], ['cloud', 'drl'],
];

const typeColors: Record<string, string> = {
  edge: 'hsl(162, 72%, 46%)',
  fog: 'hsl(200, 80%, 55%)',
  cloud: 'hsl(270, 60%, 58%)',
  drl: 'hsl(38, 92%, 55%)',
};

const NetworkTopology = () => {
  const getNode = (id: string) => nodes.find(n => n.id === id)!;

  return (
    <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Network Topology
        </CardTitle>
      </CardHeader>
      <CardContent>
        <svg viewBox="0 0 400 250" className="w-full h-auto">
          {edges.map(([from, to], i) => {
            const a = getNode(from);
            const b = getNode(to);
            return (
              <motion.line
                key={i}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke="hsl(220, 14%, 20%)"
                strokeWidth={1.5}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            );
          })}
          {/* Animated data packets */}
          {edges.map(([from, to], i) => {
            const a = getNode(from);
            const b = getNode(to);
            return (
              <motion.circle
                key={`packet-${i}`}
                r={2.5}
                fill="hsl(162, 72%, 46%)"
                initial={{ cx: a.x, cy: a.y, opacity: 0 }}
                animate={{
                  cx: [a.x, b.x],
                  cy: [a.y, b.y],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            );
          })}
          {nodes.map((node, i) => (
            <motion.g
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <circle
                cx={node.x} cy={node.y} r={14}
                fill={typeColors[node.type]}
                opacity={0.15}
              />
              <circle
                cx={node.x} cy={node.y} r={8}
                fill={typeColors[node.type]}
                opacity={0.9}
              />
              <text
                x={node.x} y={node.y + 24}
                textAnchor="middle"
                fill="hsl(215, 12%, 50%)"
                fontSize={8}
                fontFamily="'Space Grotesk', sans-serif"
              >
                {node.label}
              </text>
            </motion.g>
          ))}
        </svg>
        <div className="flex gap-4 mt-3 justify-center flex-wrap">
          {Object.entries(typeColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="capitalize">{type === 'drl' ? 'DRL Agent' : type}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkTopology;
