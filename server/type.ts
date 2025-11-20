export type Task = {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'progress' | 'todo';
  createdAt: string|number|Date // ISO date string
};
 export type taskList=Task[];
 export type fetchTasksResponse={
    data:taskList,
    success:boolean,
    message:string
 }