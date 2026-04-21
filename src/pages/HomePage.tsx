import React from 'react';
import { useTaskStore } from '@/lib/store';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskItem } from '@/components/tasks/TaskItem';
import { isToday, parseISO } from 'date-fns';
import { CheckCircle2, Clock, AlertCircle, LayoutDashboard } from 'lucide-react';
export function HomePage() {
  const tasks = useTaskStore((s) => s.tasks);
  const todayTasks = tasks.filter(t => t.dueDate && isToday(parseISO(t.dueDate)));
  const completedCount = tasks.filter(t => t.status === 'done').length;
  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;
  const highPriorityCount = tasks.filter(t => t.priority === 'high' && t.status !== 'done').length;
  return (
    <AppLayout container>
      <div className="space-y-8 animate-fade-in">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
          <p className="text-muted-foreground">Here is what's on your plate for today.</p>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Progress</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completionRate}%</div>
              <p className="text-xs text-muted-foreground">Overall tasks completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Due Today</CardTitle>
              <Clock className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayTasks.length}</div>
              <p className="text-xs text-muted-foreground">Tasks needing attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical</CardTitle>
              <AlertCircle className="h-4 w-4 text-rose-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{highPriorityCount}</div>
              <p className="text-xs text-muted-foreground">High priority pending</p>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Today's Schedule</h2>
          </div>
          {todayTasks.length > 0 ? (
            <div className="grid gap-3">
              {todayTasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="pt-6 text-center text-muted-foreground">
                No tasks scheduled for today. Take a break!
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
}