'use client'
import { deleteTask } from "@/server";
import { Task } from "@/server/type";
import { useContextProvider } from "@/store/context";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react"
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";



const TaskCard = ({data}:{data:Task}) => {
  const {setIsCardOpen,isCardOpen,setCurrentTask}=useContextProvider()
  const queryClient=useQueryClient()
  const formatDate = (dateString: string | number | Date) => {
    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return date.toLocaleDateString();
    } catch (error) {
      console.error('Error parsing date:', error);
      return 'N/A';
    }
  };
   const handleDelete = async (id: number) => {
toast((t) => (
    <div>
      <p>Are you sure you want to delete this task?</p>

      <div className="flex justify-end gap-4 mt-4">
 
        <button
          className="px-3 py-1 bg-red-600 text-white rounded"
          onClick={async() => {
                 try {
      const res=await deleteTask(id)
      queryClient.invalidateQueries({queryKey:["tasks"]})
      
     }catch(e){throw new Error('Error deleting task');}
            toast.success('Task deleted successfully!');
            t.closeToast() 
          }}
        >
          Yes
        </button>

        {/* CANCEL BUTTON */}
        <button
          className="px-3 py-1 bg-gray-300 rounded"
          onClick={() => t.closeToast()}
        >
          Cancel
        </button>
      </div>
    </div>
  ));
   
 }

  const date = formatDate(data.created_at);


  // Safely handle potentially undefined/null values
  const title = data?.title || 'Untitled';
  const description = data?.description || 'No description';

  return (
    <div 
      onClick={() =>{ setIsCardOpen(!isCardOpen);setCurrentTask(data)}} 
      className="h-44 w-full flex-1 overflow-hidden rounded-2xl shadow-md border-t border-gray-100 
        hover:scale-105 transition-all ease-in duration-300 shadow-gray-300 max-w-44 min-w-44 bg-white cursor-pointer"
    >
      <div className="flex flex-col w-full h-full">
        <p 
          className={ ` ${data.status=='todo'?'bg-zinc-700 text-white':data.status=='progress'?' bg-yellow-500 text-black font-semibold':'bg-green-500 text-black font-semibold'} text-sm  px-2 rounded-t-lg h-10  flex items-center   overflow-hidden`}
          title={title}
        >
          <span className="truncate">{title}</span>
        </p>
        <p 
          className="flex-1 text-sm px-2 py-2 overflow-hidden line-clamp-3" 
          title={description}
        >
          {description}
        </p>
        <div className="flex p-2 flex-row text-xs justify-between items-center">
          <p className="truncate">{date}</p>
          <div className="flex flex-row gap-2">
       
            <button 
              className="hover:bg-red-50 cursor-pointer rounded transition-colors"
              onClick={(e) =>{ e.stopPropagation();handleDelete(data.id)}}
              aria-label="Delete task"
            >
              <RiDeleteBin6Line className="text-red-700" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskCard