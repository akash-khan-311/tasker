import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import Search from "./Search";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";

const TaskBoard = () => {
  const defaultData = {
    id: crypto.randomUUID(),
    title: "Learn NextJs",
    description:
      "Learn NextJs lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tags: ["react", "nextjs", "js"],
    priority: "High",
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([defaultData]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }

    if (
      (newTask.title === "" && newTask.description === "",
      newTask.tags === [],
      newTask.priority === "")
    ) {
      setShowAddModal(true);
    } else {
      console.log("task added successfully");
      setShowAddModal(false);
    }
  };
  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowAddModal(true);
  };
  const handleDeleteTask = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id));
    console.log(task.title);
  };
  const handleFavorite = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTask = [...tasks];
    newTask[taskIndex].isFavorite = !newTask[taskIndex].isFavorite;
    setTasks(newTask);
  };

  const handleSearch = (searchTerm) => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks([...filtered]);
  };

  const handleDeleteAll = async () => {
    await alert("Are you sure you want to delete all tasks?");
    await setTasks([]);
  };

  return (
    <>
      <section className="mb-20" id="tasks">
        {showAddModal && (
          <AddTaskModal
            taskToUpdate={taskToUpdate}
            showAddModal={showAddModal}
            setShowAddModal={setShowAddModal}
            onSave={handleAddTask}
          />
        )}
        <div className="container mx-auto">
          {/* Search Box */}
          <div className="p-2 flex justify-end">
            <Search onSearch={handleSearch} />
          </div>
          {/* Search Box Ends */}
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskAction
              onAddClick={() => setShowAddModal(true)}
              onDeleteAll={handleDeleteAll}
            />
            {tasks.length > 0 ? (
              <TaskList
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onFavorite={handleFavorite}
              />
            ) : (
              <p className="text-center text-3xl">
                No Tasks Found. Please Add One.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default TaskBoard;
