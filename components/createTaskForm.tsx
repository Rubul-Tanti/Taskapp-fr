import { createTask } from "@/server";
import { useContextProvider } from "@/store/context";
import api from "@/utils/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { LuDelete } from "react-icons/lu";
import { toast } from "react-toastify";



type TaskFormData = {
  title: string;
  description: string;
};

const CreateTaskForm = () => {
  const {isCreateFormOpen: isOpenForm, setIsCreateFormOpen: setIsOpenForm}=useContextProvider()
  const [loading,setLoading]=useState(false)

  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
  });
const queryClient=useQueryClient()
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async(e: React.FormEvent) => {
      e.preventDefault();
    try{setLoading(true)
        const res=await createTask(formData)
       queryClient.invalidateQueries({queryKey:["tasks"]})
       toast.success('Task created successfully!');
        setIsOpenForm(false); 
    }catch(err){
        console.error('Error creating task:', err);
    }
    finally{setLoading(false)}
  };

  return (
    <div className="h-screen z-50 absolute top-0 w-screen bg-black/10 flex justify-center items-center">
      <div className="max-h-[450px] h-full max-w-[550px] w-full m-2 bg-white rounded-lg">
        <div className="w-full flex justify-between p-4">
          <p className="text-xl">Create Task</p>
          <button
            onClick={() => {
              setIsOpenForm(!isOpenForm);
            }}
            className="cursor-pointer"
          >
            <LuDelete size={24} color="gray" />
          </button>
        </div>

        <div className="mt-2">
          <form onSubmit={handleCreateTask} className="flex justify-center">
            <div className="flex flex-col w-5/6">
              <label className="mx-5 text-zinc-700">Task Title</label>

              <input
                className="outline-0 mt-1 p-2 rounded-lg border border-gray-300 mx-5"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Task Title"
              />

              <label className="mx-5 mt-3 text-zinc-700">Task Description</label>

              <textarea
                className="outline-0 mt-1 p-2 rounded-lg border border-gray-300 mx-5"
                placeholder="Task Description"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />

              <button
              disabled={loading}
                type="submit"
                className="bg-black text-white rounded-lg p-2 mt-5 mx-5"
              >{loading?'Creating...':'Create Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskForm;
