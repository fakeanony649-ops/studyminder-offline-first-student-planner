import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, Calendar, Pencil } from 'lucide-react';
import { Task, useTaskStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { TaskDialog } from './TaskDialog';
interface TaskItemProps {
  task: Task;
}
export function TaskItem({ task }: TaskItemProps) {
  const toggleTaskStatus = useTaskStore((s) => s.toggleTaskStatus);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const priorityColors = {
    high: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/30',
    medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/30',
    low: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/30',
  };
  const priorityBorders = {
    high: 'border-l-rose-500',
    medium: 'border-l-amber-500',
    low: 'border-l-emerald-500',
  };
  return (
    <>
      <Card className={cn(
        "transition-all duration-200 hover:shadow-md border-l-4",
        priorityBorders[task.priority],
        task.status === 'done' ? "opacity-60 grayscale-[0.5]" : "bg-card",
        task.priority === 'high' && task.status !== 'done' && "bg-rose-50/30 dark:bg-rose-950/10"
      )}>
        <CardContent className="p-4 flex items-center gap-4">
          <Checkbox
            checked={task.status === 'done'}
            onCheckedChange={() => toggleTaskStatus(task.id)}
            className="h-5 w-5 data-[state=checked]:bg-primary"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={cn(
                "font-bold truncate text-[15px]",
                task.status === 'done' && "line-through text-muted-foreground font-normal"
              )}>
                {task.title}
              </h3>
              <Badge variant="outline" className="text-[9px] uppercase font-bold py-0 h-4 bg-background">
                {task.subject}
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className={cn("px-1.5 py-0.5 rounded-sm capitalize font-medium border", priorityColors[task.priority])}>
                {task.priority}
              </span>
              <div className="flex items-center gap-1">
                <Calendar className="size-3" />
                <span>{format(parseISO(task.dueDate), 'MMM d, yyyy')}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-primary"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Pencil className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-destructive"
              onClick={() => deleteTask(task.id)}
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <TaskDialog 
        open={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen} 
        task={task}
      />
    </>
  );
}