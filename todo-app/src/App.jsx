import React, { useEffect, useState } from "react";
import { getTasks, addTask } from "./services/api";
import TaskCard from "./components/tasks/TaskCard";
import TaskDetailModal from "./components/tasks/TaskDetailModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleAddTask = async () => {
    if (newTask.trim() === "") return;
    await addTask({ title: newTask, description: "Yeni görev", duedate: new Date() });
    setNewTask("");
    loadTasks(); // Güncellenmiş listeyi getir
  };

  return (
    <div className="static h-screen">
      <div className="flex flex-col h-auto justify-center items-center p-10">
        <h2 className="font-[poppins-regular] text-[#131842] text-5xl mb-10 mt-5 ">Todo List</h2>
        <div className="flex gap-5">
          <input
            type="text"
            className="w-200 h-10 bg-amber-50 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Yeni görev ekleyin..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="cursor-pointer rounded-md bg-[#8adc82] px-3 text-white shadow transition-all duration-150 hover:bg-[#66a560] active:scale-95 active:shadow-none" onClick={handleAddTask}>
            <span className="material-symbols-outlined mt-1">
              add
            </span>
          </button>
        </div>
      </div>
      {/* Görev Listeleri */}
      <TaskCard tasks={tasks} onClick={setSelectedTask} />
      <TaskDetailModal
        task={selectedTask}
        reloadTasks={loadTasks}
        onClosing={() => setSelectedTask(null)} />
    </div>
  );
}

export default App;
