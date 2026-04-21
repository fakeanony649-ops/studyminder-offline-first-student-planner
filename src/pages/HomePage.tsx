import React from 'react';
import { useTaskStore } from '@/lib/store';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TaskItem } from '@/components/tasks/TaskItem';
import { isToday, parseISO } from 'date-fns';
import { CheckCircle2, Clock, AlertCircle, LayoutDashboard, BarChart3 } from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend 
} from 'recharts';
export function HomePage() {
  const tasks = useTaskStore((s) => s.tasks);
  const todayTasks = tasks.filter(t => t.dueDate && isToday(parseISO(t.dueDate)));
  const completedCount = tasks.filter(t => t.status === 'done').length;
  const pendingCount = tasks.length - completedCount;
  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;
  const highPriorityCount = tasks.filter(t => t.priority === 'high' && t.status !== 'done').length;
  const pieData = [
    { name: 'Completed', value: completedCount },
    { name: 'Pending', value: pendingCount || (tasks.length === 0 ? 1 : 0) },
  ];
  const COLORS = ['#10B981', '#E2E8F0'];
  // Data for subject distribution
  const subjectMap = tasks.reduce((acc, task) => {
    acc[task.subject] = (acc[task.subject] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const barData = Object.entries(subjectMap).map(([name, count]) => ({
    name,
    count,
  })).slice(0, 5); // Top 5 subjects
  return (
    <AppLayout container>
      <div className="space-y-8 animate-fade-in">
        <header>
          <h1 className="text-4xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="text-lg text-muted-foreground">Focus on your goals and stay organized.</p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="relative overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Completion</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{completionRate}%</div>
                  <p className="text-xs text-muted-foreground mt-1">Efficiency score</p>
                </div>
                <div className="h-[60px] w-[60px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={18}
                        outerRadius={25}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Due Today</CardTitle>
              <Clock className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{todayTasks.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Active tasks for now</p>
            </CardContent>
          </Card>
          <Card className="border-rose-100 dark:border-rose-900/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-rose-600 dark:text-rose-400">Critical Focus</CardTitle>
              <AlertCircle className="h-4 w-4 text-rose-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-rose-600 dark:text-rose-400">{highPriorityCount}</div>
              <p className="text-xs text-muted-foreground mt-1">High priority items</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart3 className="size-4 text-primary" />
                <CardTitle className="text-base">Subject Distribution</CardTitle>
              </div>
              <CardDescription>Number of tasks per subject</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px]">
              {barData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical" margin={{ left: -20 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={80} fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground italic text-sm">
                  Add tasks to see distribution.
                </div>
              )}
            </CardContent>
          </Card>
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <LayoutDashboard className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Today's Agenda</h2>
            </div>
            <div className="grid gap-3">
              {todayTasks.length > 0 ? (
                todayTasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))
              ) : (
                <Card className="border-dashed bg-muted/20">
                  <CardContent className="pt-8 pb-8 text-center text-muted-foreground">
                    <p className="font-medium text-foreground">All clear for today!</p>
                    <p className="text-sm mt-1">Enjoy your free time or get ahead on tomorrow.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}