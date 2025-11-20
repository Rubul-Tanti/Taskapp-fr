import React from 'react'
import TaskCard from '../taskCard';
import { useContextProvider } from '@/store/context';

const Todo = () => {
      const {taskList,setIsCreateFormOpen:setIsOpenForm,isCreateFormOpen:isOpenForm}=useContextProvider()
  const todoTasks = taskList.filter(task => task.status === 'todo');
  return (
      <div className="w-full lg:w-[400px] bg-gray-100 rounded-lg border border-gray-100 h-[300px] sm:h-[350px] lg:h-[450px] p-2 sm:p-3">
            <div className='flex flex-row justify-between items-center gap-2'>
              <p className='bg-gray-300 text-black font-semibold text-xs sm:text-sm max-w-20 rounded-lg p-2'>To Do</p>
              <button
                onClick={() => setIsOpenForm(!isOpenForm)}
                className='p-2 bg-black text-white rounded-lg text-xs sm:text-sm whitespace-nowrap hover:bg-gray-800 transition-colors'
              >
                Create Task +
              </button>
            </div>
            <div className='flex flex-row flex-wrap lg:min-w-[450px]  overflow-x-hidden gap-2 mt-2 overflow-y-auto h-[calc(100%-3rem)]'>
              {todoTasks.length > 0 ? (
                todoTasks.map((item) => (
                  <TaskCard data={item} 
               key={item.id} 
                  />
                ))
              ) : (
                <div className='flex justify-center items-center w-full h-full'>
                  <p className='text-gray-400 text-sm sm:text-base'>Create tasks</p>
                </div>
              )}
            </div>
          </div>
  )
}

export default Todo
