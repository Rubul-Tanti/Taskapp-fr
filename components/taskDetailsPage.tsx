import { useContextProvider } from '@/store/context';
import React, { useState, useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import { LuDelete } from "react-icons/lu";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { deleteTask, updateTask } from '@/server';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';


const TaskDetailsPage = () => {
  const { isCardOpen, setIsCardOpen, currentTask: data,} = useContextProvider();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo'
  });
  const queryClient=useQueryClient()
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
            t.closeToast() 
            toast.success('Task deleted successfully!');
            handleClose();
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
  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || '',
        description: data.description || '',
        status: data.status || 'todo'
      });
    }
  }, [data]);

  const handleClose = () => {
    setIsCardOpen(false);
    setIsEditing(false);
  };

  const handleUpdate = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
        const res=await updateTask(data.id,formData)
        toast.success('Task updated successfully!');
        setIsEditing(false);
        handleClose();
        queryClient.invalidateQueries({queryKey:["tasks"]})
    }catch(err){
        console.error('Error updating task:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatDate = (date: string | Date|number) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-black bg-green-300';
      case 'progress':
        return 'text-black bg-yellow-30';
      default:
        return 'text-gray-600 bg-gray-300';
    }
  };

  if (!data) return null;

  return (
    <div 
      onClick={handleClose}
      className='h-screen z-50 fixed top-0 left-0 w-screen bg-black/50 flex justify-center items-center p-4'
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className='max-h-[90vh] overflow-y-auto max-w-[550px] w-full bg-white rounded-lg shadow-2xl'
      >
        {/* Header */}
        <div className='w-full flex justify-between items-start p-6 border-b'>
          <h2 className='text-2xl font-bold text-gray-800'>
            {isEditing ? 'Edit Task' : 'Task Details'}
          </h2>
          <div className="flex flex-row gap-2">
            {!isEditing && (
              <>
                <button 
                  className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                  onClick={() => setIsEditing(true)}
                  aria-label="Edit task"
                >
                  <CiEdit color="gray" size={20} />
                </button>
                <button 
                  className="p-2 hover:bg-red-50 rounded transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(data.id);
                    
                  }}
                  aria-label="Delete task"
                >
                  <RiDeleteBin6Line color="red" size={20} />
                </button>
              </>
            )}
            <button 
              onClick={handleClose}
              className='p-2 hover:bg-gray-100 rounded transition-colors'
              aria-label="Close"
            >
              <LuDelete size={24} color='gray' />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className='p-6'>
          {!isEditing ? (
            // View Mode
            <div className='space-y-6'>
              <div>
                <p className='text-sm text-gray-500 mb-1'>Title</p>
                <p className='text-xl font-semibold text-gray-800'>{data.title}</p>
              </div>
              
              <div>
                <p className='text-sm text-gray-500 mb-1'>Description</p>
                <p className='text-gray-700 whitespace-pre-wrap'>
                  {data.description || 'No description provided'}
                </p>
              </div>
              
              <div className='flex flex-col sm:flex-row gap-4'>
                <div className='flex-1'>
                  <p className='text-sm text-gray-500 mb-1'>Created At</p>
                  <p className='text-gray-700'>
                    {data.createdAt ? formatDate(data.createdAt) : 'N/A'}
                  </p>
                </div>
                
                <div className='flex-1'>
                  <p className='text-sm text-gray-500 mb-1'>Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(data.status)}`}>
                    {data.status === 'progress' ? 'In Progress' : 
                     data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            // Edit Mode
            <form onSubmit={handleUpdate} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Title
                </label>
                <input 
                  type='text'
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  placeholder='Enter task title'
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
                  required
                />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Description
                </label>
                <textarea 
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  placeholder='Enter task description'
                  rows={4}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none'
                />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Status
                </label>
                <select
                  name='status'
                  value={formData.status}
                  onChange={handleChange}
                  className={` w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none`}
                >
                  <option value="todo">To Do</option>
                  <option value="progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              <div className='flex gap-3 pt-4'>
                <button 
                  type='submit'
                  className='flex-1 bg-black text-white rounded-lg py-2.5 hover:bg-gray-800 transition-colors font-medium'
                >
                  Update Task
                </button>
                <button 
                  type='button'
                  onClick={() => setIsEditing(false)}
                  className='flex-1 bg-gray-200 text-gray-700 rounded-lg py-2.5 hover:bg-gray-300 transition-colors font-medium'
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;