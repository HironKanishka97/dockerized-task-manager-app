import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import { BASE_URL } from "./constants";
import { useState } from "react";
import { useForm } from "react-hook-form";





const fetchTasks = () => {
  return axios.get(BASE_URL + 'getall').then(response => response.data)
}

const addTask = (task) => {
  return axios.post(BASE_URL + 'save', task)
}
const updateTask = (task) => {
  return axios.put(BASE_URL + 'update', task)
}
const deleteTask = (task) => {
  return axios.delete(`${BASE_URL}delete`, { params: { id: task.id } })
}


function App() {

  const queryClient = useQueryClient();
  const [editingTask, setEditingTask] = useState(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      completed: false,
    },
  });

  const { data: taskarray, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks
  })

  const addMutation = useMutation({
    mutationFn: addTask,
    onSuccess: (response) => {
      console.log("Add Success : ", response.data);
      queryClient.invalidateQueries(['tasks']);
      reset({ title: "", description: "", completed: false });
    },
    onerror: (error) => { console.error("Add Unsuccess : ", error.data) }
  })

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: (response) => {
      console.log("Update Success : ", response.data);
      queryClient.invalidateQueries(['tasks']);
      setEditingTask(null)
      reset({ title: "", description: "", completed: false });
    },
    onerror: (error) => { console.error("Update Unsuccess : ", error.data) }
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (response) => {
      console.log("Delete Success : ", response.data);
      queryClient.invalidateQueries(['tasks']);
      setEditingTask(null)
      reset({ title: "", description: "", completed: false });
    },
    onerror: (error) => { console.error("Delete Unsuccess : ", error.data) }
  })

  const handleAdd = (task) => {
    addMutation.mutate(task)

  };
  const handleUpdate = (task) => {
    updateMutation.mutate(
      { ...editingTask, ...task })

  };
  const handleDelete = (tsk) => {
    deleteMutation.mutate(tsk)

  };
  const fillForm = (task) => {
    setEditingTask(task);
    reset({
      title: task.title,
      description: task.description,
      completed: task.completed,
    });
  };


  if (isLoading) return <p>still loading...</p>
  if (error) return <p>something gone wrong...": "+ {error.message}</p>

  return (
    <div className="h-screen w-screen bg-white flex flex-col">

      {/* Header */}
      <h1 className="text-4xl font-bold text-center m-6 text-black">SimpleTask</h1>

      <div className="flex flex-1 w-full max-w-6xl mx-auto px-6 gap-6">

        <div className="w-1/3">
          {/* <TaskForm /> */}
          <form className="flex flex-col bg-white p-4 gap-3 mb-6">

            <input
              {...register("title", { required: true })}
              placeholder="Task Title"
              className="p-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <textarea
              {...register("description", { required: true })}
              placeholder="Task Description"
              className="p-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("completed")}
                className="w-5 h-5"
              />
              Mark as Completed
            </label>
            <div className="flex gap-3 justify-end px-5">
              {!editingTask &&
                <button
                  type="button"
                  disabled={editingTask}
                  onClick={handleSubmit(handleAdd)}
                  className="bg-blue-500 max-w-[100px] text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
                >Save
                </button>}
              {editingTask &&
                <button
                  type="button"
                  disabled={!editingTask}
                  onClick={handleSubmit(handleUpdate)}
                  className="bg-orange-500 max-w-[100px] text-white px-4 py-2 rounded shadow hover:bg-orange-600 transition"
                >Update
                </button>}
              {editingTask &&
                <button
                  type="button"
                  disabled={!editingTask}
                  onClick={() => handleDelete(editingTask)}
                  className="bg-red-500 max-w-[100px] text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
                >Delete
                </button>}
            </div>
          </form>
        </div>


        <div className="w-2/3 h-[600px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 bg-gray-200 rounded shadow">
            <h1 className="text-2xl font-bold text-center m-1 text-black">Tasks</h1>
            <ul className="space-y-4">
              {taskarray?.tasks && taskarray.tasks.length > 0 ? (
                  taskarray.tasks.map((task) => (
                      <li
                          key={task.id}
                          className="flex justify-between items-center p-4 bg-white shadow rounded"
                          onClick={() => fillForm(task)}
                      >
                        <div className="flex flex-col">
                          <p className="font-bold text-xl p-1">{task.title}</p>
                          <p>{task.description}</p>
                          {task.completed ? <p className="text-green-600">Completed</p> :
                              <p className="text-red-600">Incomplete</p>}
                        </div>
                      </li>
                  ))
              ) : (
                  <li className="p-4 bg-gray-100 text-center text-gray-500 rounded">
                    No Tasks Available
                  </li>
              )}
            </ul>

          </div>
        </div>


      </div>
    </div>


  )
}

export default App
