import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, RotateCcw, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useDashboard } from '@/contexts/DashboardContext';

export const ScenarioController = () => {
  const { setScenario, resetScenario } = useDashboard();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const scenarios = [
    { name: 'Trusted Employee', color: 'bg-gradient-success', index: 0 },
    { name: 'New Device', color: 'bg-gradient-warning', index: 1 },
    { name: 'Impossible Travel', color: 'bg-gradient-warning', index: 2 },
    { name: 'Compromised Device', color: 'bg-gradient-danger', index: 3 },
  ];

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDrag={(e, info) => {
        setPosition({ x: info.offset.x, y: info.offset.y });
      }}
      className="fixed bottom-8 right-8 z-50 cursor-move"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-card/90 backdrop-blur-glass border-primary/50 shadow-glow p-6 min-w-[320px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Demo Controller</h3>
          </div>
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="space-y-3">
          {scenarios.map((scenario, index) => (
            <Button
              key={scenario.index}
              onClick={() => setScenario(scenario.index)}
              className={`w-full justify-start ${scenario.color} hover:opacity-90 shadow-md transition-all`}
              size="lg"
            >
              <span className="font-semibold">Scenario {index + 1}:</span>
              <span className="ml-2">{scenario.name}</span>
            </Button>
          ))}
          
          <Button
            onClick={resetScenario}
            variant="outline"
            className="w-full border-muted-foreground/30 hover:bg-muted"
            size="lg"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset to Default
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          💡 Drag this panel to reposition
        </p>
      </Card>
    </motion.div>
  );
};
