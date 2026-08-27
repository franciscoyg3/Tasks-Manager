type Task = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
};

type AddTaskProps = {
  submitTask: (title: string, desc: string) => void;
};

type TaskProps = {
  tasks: Task[];
  showTask: boolean;
  completeTask: (taskId: number) => void;
  removeTask: (taskId: number) => void;
  seeDesc: (taskId: number) => void;
  selectedTask: Task | null;
  closeDesc: () => void;
};

export type {
  Task, TaskProps, AddTaskProps
};
