import { useContextProvider } from '@/store/context';
import React from 'react'
import TaskCard from '../taskCard';

const Progress = () => {
    const {taskList}=useContextProvider()
  const progressTasks = taskList.filter(task => task.status === 'progress');
  return (
           <div className="w-full lg:flex-1 bg-amber-50 border border-gray-100 rounded-lg h-[300px] sm:h-[350px] lg:h-[450px] p-2 sm:p-3">
            <p className='bg-amber-300 text-black font-semibold text-xs sm:text-sm max-w-24 sm:max-w-28 rounded-lg p-2'>In Progress</p>
            <div className='flex flex-row flex-wrap overflow-y-auto h-[calc(100%-3rem)] gap-2 mt-2'>
              {progressTasks.length > 0 ? (
                progressTasks.map((item) => (
                  <TaskCard 
                  data={item} 
                 key={item.id}
           
                  />
                ))
              ) : (
                <div className='flex justify-center items-center w-full h-full'>
                  <p className='text-gray-400 text-sm sm:text-base'>No tasks in Progress yet</p>
                </div>
              )}
            </div>
          </div>
  )
}

export default Progress
