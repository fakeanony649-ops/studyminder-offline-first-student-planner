import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Calendar } from '@/components/ui/calendar';
import { useTaskStore } from '@/lib/store';
import { TaskItem } from '@/components/tasks/TaskItem';
import { isSameDay, parseISO, format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, ClipboardList } from 'lucide-react';
export function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const tasks = useTaskStore((s) => s.tasks);
  const selectedTasks = tasks.filter(task => 
    date && task.dueDate && isSameDay(parseISO(task.dueDate), date)
  );
  const hasTasksOnDay = (day: Date) => {
    return tasks.some(task => task.dueDate && isSameDay(parseISO(task.dueDate), day));
  };
  return (
    <AppLayout container>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Keep track of your upcoming deadlines.</p>
        </header>
        <div className="grid gap-6 lg:grid-cols-12">
          <Card className="lg:col-span-7">
            <CardHeader className="flex flex-row items-center gap-2">
              <CalendarIcon className="size-5 text-primary" />
              <CardTitle>Academic Schedule</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center p-0 pb-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border-none"
                modifiers={{
                  hasEvent: (day) => hasTasksOnDay(day)
                }}
                modifiersStyles={{
                  hasEvent: { 
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    color: 'hsl(var(--primary))'
                  }
                }}
              />
            </CardContent>
          </Card>
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 px-1">
              <ClipboardList className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">
                {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
              </h2>
            </div>
            <div className="space-y-3">
              {selectedTasks.length > 0 ? (
                selectedTasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))
              ) : (
                <Card className="border-dashed bg-muted/30">
                  <CardContent className="py-12 text-center text-muted-foreground">
                    <p>No tasks scheduled for this day.</p>
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