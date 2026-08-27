import { useEffect, useState } from 'react';
import './assets/css/app.css';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import type { Task } from './assets/types';

function App() {
  const [showTask, setShowTask] = useState<boolean>(true);
  const [msgError, setMsgError] = useState<string>('');
  const [msgSuccess, setMsgSuccess] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>(() => {
    try{
      const data = localStorage.getItem('tasks');
      const parsedData = data ? JSON.parse(data) : []
      if (!Array.isArray(parsedData)) {
        return [];
      }

      const isValid = parsedData.every(
        (task: Task) =>
          task &&
          typeof task.id === "number" &&
          typeof task.title === "string" &&
          typeof task.description === "string" &&
          typeof task.isCompleted === "boolean",
      );

      if (isValid) {
        return parsedData;
      }

      return [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const removeTask = (taskId: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));

    if (taskId === selectedTask?.id) {
      setSelectedTask(null);
      setShowTask(true);
    }
  }

  const completeTask = (taskId: number) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (taskId === task.id) {
          return { ...task, isCompleted: !task.isCompleted };
        }

        return task;
      }),
    );
  }

  const submitTask = (title: string, desc: string) => {
    setMsgError('');
    setMsgSuccess('');
    
    if (!title.trim() || !desc.trim()) {
      setMsgError("Os campos não podem estar vazios!");
      return;
    }
    if (title.length > 30) {
      setMsgError("O título não pode ter mais de 30 caracteres");
      return;
    }
    if (desc.length > 40) {
      setMsgError("A descrição não pode ter mais de 40 caracteres");
      return;
    }

    if (
      tasks.some(
        (task) =>
          task.title.toLowerCase() === title.toLowerCase() &&
          task.description.toLowerCase() === desc.toLowerCase(),
      )
    ) {
      setMsgError("A tarefa já foi adicionada!");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description: desc,
      isCompleted: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setMsgSuccess("Tarefa Adicionada com sucesso!");
  }

  const toggleTaskVisibility = () => {
    setShowTask((prev) => !prev);
  }
  
  const seeDesc = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setSelectedTask(task);
    }

    toggleTaskVisibility();
  }

  const closeDesc = () => {
    setSelectedTask(null);
    setShowTask(true);
  }

  return (
    <>
      <h1>Gerenciador de Lista de Tarefas</h1>
      {msgSuccess && <p className="msgSuccess">{msgSuccess}</p>}
      {msgError && <p className="msgError">{msgError}</p>}
      <AddTask submitTask={submitTask} />
      <Tasks
        tasks={tasks}
        removeTask={removeTask}
        completeTask={completeTask}
        seeDesc={seeDesc}
        showTask={showTask}
        selectedTask={selectedTask}
        closeDesc={closeDesc}
      />
    </>
  );
}

export default App;