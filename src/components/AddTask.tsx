import { useState, type ChangeEvent } from "react";
import "../assets/css/addTask.css";
import type { AddTaskProps } from "../assets/types";

function AddTask({ submitTask }: AddTaskProps) {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const resetData = () => {
    setNewTask({title: '', description: ''})
  }

  const captureTaskData = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="addTaskContainer">
      <input
        className="inputField"
        type="text"
        placeholder="Inserir título da tarefa..."
        name="title"
        onChange={captureTaskData}
        value={newTask.title}
      />
      <input
        className="inputField"
        type="text"
        placeholder="Inserir descrição da tarefa..."
        name="description"
        onChange={captureTaskData}
        value={newTask.description}
      />
      <button
        className="addTaskBtn"
        type="button"
        onClick={() => {
          submitTask(newTask.title, newTask.description);
          resetData();
        }}
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTask;
