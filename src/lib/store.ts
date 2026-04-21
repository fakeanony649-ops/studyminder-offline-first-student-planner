import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export type Priority = 'high' | 'medium' | 'low';
export type Status = 'todo' | 'in-progress' | 'done';
export interface Task {
  id: string;
  title: string;
  description?: string;
  subject: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  createdAt: string;
}
interface TaskState {
  tasks: Task[];
  subjects: string[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  addSubject: (subject: string) => void;
  removeSubject: (subject: string) => void;
}
export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      subjects: ['Mathematics', 'Science', 'English', 'History', 'Art', 'PE', 'Music'],
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
      toggleTaskStatus: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) => {
            if (t.id !== id) return t;
            const nextStatus: Status = t.status === 'done' ? 'todo' : 'done';
            return { ...t, status: nextStatus };
          }),
        })),
      addSubject: (subject) => 
        set((state) => ({
          subjects: state.subjects.includes(subject) 
            ? state.subjects 
            : [...state.subjects, subject]
        })),
      removeSubject: (subject) =>
        set((state) => ({
          subjects: state.subjects.filter(s => s !== subject)
        })),
    }),
    {
      name: 'studyminder-storage',
    }
  )
);