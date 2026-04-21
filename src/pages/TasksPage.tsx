import React, { useState } from 'react';
import { useTaskStore } from '@/lib/store';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TaskDialog } from '@/components/tasks/TaskDialog';
import { TaskItem } from '@/components/tasks/TaskItem';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
export function TasksPage() {
  const tasks = useTaskStore((s) => s.tasks);
  const [filter, setFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });
  return (
    <AppLayout container>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Tasks</h1>
            <p className="text-muted-foreground">Manage your studies and assignments.</p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)} className="btn-gradient">
            <Plus className="mr-2 h-4 w-4" /> Add Task
          </Button>
        </div>
        <Tabs defaultValue="all" onValueChange={setFilter} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="todo">To Do</TabsTrigger>
            <TabsTrigger value="in-progress">Doing</TabsTrigger>
            <TabsTrigger value="done">Done</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="grid gap-3">
          <AnimatePresence mode="popLayout">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <TaskItem task={task} />
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center text-muted-foreground border-2 border-dashed rounded-xl">
                No tasks found in this category.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <TaskDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </AppLayout>
  );
}