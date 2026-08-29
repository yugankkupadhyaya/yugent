import { motion } from 'motion/react';
import { ArrowLeft, Clock, Layers, Sparkles, Target } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ModuleCard } from './ModuleCard';

function StatTile({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-border/70 bg-background/60 p-3">
      <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="size-3.5" />
        <span>{label}</span>
      </div>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

export function RoadmapResult({ roadmap, onBack }) {
  if (!roadmap) return null;

  const modules = Array.isArray(roadmap.modules) ? roadmap.modules : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between gap-3">
        <Button type="button" variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="size-4" /> All roadmaps
        </Button>
        <Badge variant="outline">{roadmap.level}</Badge>
      </div>

      <Card>
        <CardHeader>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
            Your roadmap
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
            {roadmap.title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Target: <span className="font-medium text-foreground">{roadmap.targetPackage}</span>
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatTile icon={Target} label="Level" value={roadmap.level} />
            <StatTile icon={Clock} label="Duration" value={roadmap.duration} />
            <StatTile icon={Layers} label="Modules" value={`${modules.length} topics`} />
          </div>
        </CardContent>
      </Card>

      <div>
        <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" /> Learning modules
        </div>
        <div className="flex flex-col gap-3">
          {modules.map((mod, index) => (
            <ModuleCard key={mod.title || index} mod={mod} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default RoadmapResult;
