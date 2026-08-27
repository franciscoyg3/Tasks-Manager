import { ChevronRight, TrashIcon } from 'lucide-react';
import '../assets/css/tasks.css';
import type { TaskProps } from '../assets/types';

function Task({
  tasks,
  removeTask,
  completeTask,
  seeDesc,
  selectedTask,
  showTask,
  closeDesc,
}: TaskProps) {
  return (
    <div className="taskContainer">
      <ul className={`${showTask ? "" : "hidden"}`}>
        {tasks.length <= 0 ? (
          <li className="taskMsg">Nenhuma Tarefa Encontrada...</li>
        ) : (
          tasks.map((task) => (
            <li className="taskWrapper" key={task.id}>
              <button
                className={`task ${task.isCompleted ? "completed" : ""}`}
                onClick={() => completeTask(task.id)}
              >
                {task.title}
              </button>
              <button
                className="taskBtn"
                title="Ver Descrição"
                aria-label="Ver Descrição"
                onClick={() => seeDesc(task.id)}
              >
                <ChevronRight />
              </button>
              <button
                className="taskBtn"
                title="Apagar Tarefa"
                aria-label="Apagar Tarefa"
                onClick={() => removeTask(task.id)}
              >
                <TrashIcon />
              </button>
            </li>
          ))
        )}
      </ul>
      {selectedTask && (
        <div className="taskDetails">
          <h2>{selectedTask.title}</h2>
          <p>{selectedTask.description}</p>
          <button onClick={closeDesc}>Fechar Descrição</button>
        </div>
      )}
    </div>
  );
}

export default Task;