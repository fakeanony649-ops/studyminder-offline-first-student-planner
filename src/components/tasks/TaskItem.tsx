import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, Calendar } from 'lucide-react';
import { Task, useTaskStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
interface TaskItemProps {
  task: Task;
}
export function TaskItem({ task }: TaskItemProps) {
  const toggleTaskStatus = useTaskStore((s) => s.toggleTaskStatus);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const priorityColors = {
    high: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    low: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  };
  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md border-l-4",
      task.priority === 'high' ? "border-l-rose-500" : 
      task.priority === 'medium' ? "border-l-amber-500" : "border-l-emerald-500",
      task.status === 'done' && "opacity-60"
    )}>
      <CardContent className="p-4 flex items-center gap-4">
        <Checkbox 
          checked={task.status === 'done'} 
          onCheckedChange={() => toggleTaskStatus(task.id)}
          className="h-5 w-5"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={cn(
              "font-semibold truncate",
              task.status === 'done' && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            <Badge variant="secondary" className="text-[10px] uppercase font-bold py-0 h-4">
              {task.subject}
            </Badge>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className={cn("px-1.5 py-0.5 rounded capitalize", priorityColors[task.priority])}>
              {task.priority}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="size-3" />
              <span>{format(parseISO(task.dueDate), 'MMM d, yyyy')}</span>
            </div>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground hover:text-destructive shrink-0"
          onClick={() => deleteTask(task.id)}
        >
          <Trash2 className="size-4" />
        </Button>
      </CardContent>
    </Card>
  );
}