import { useState } from "react";
import { LuTrash2 } from "react-icons/lu";

const TodoListInput = ({ todoList = [], setTodoList }) => {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (!task.trim()) return;

    setTodoList([
      ...todoList,
      { text: task.trim(), completed: false },
    ]);
    setTask("");
  };

  const handleDelete = (index) => {
    setTodoList(todoList.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-2 space-y-2">
      {todoList.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between px-3 py-2 hover:bg-slate-50 rounded"
        >
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-400">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{item.text}</span>
          </div>

          <LuTrash2
            className="text-rose-500 cursor-pointer"
            onClick={() => handleDelete(index)}
          />
        </div>
      ))}

      <div className="flex gap-2 mt-2">
        <input
          className="form-input flex-1"
          placeholder="Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-2 bg-slate-100 rounded"
        >
          + Add
        </button>
      </div>
    </div>
  );
};

export default TodoListInput;
