import React, { use } from 'react'
import TaskCard from '../taskCard'
import { useContextProvider } from '@/store/context'

const Completed = () => {
  const {taskList}=useContextProvider()
  const completedTasks = taskList.filter(task => task.status === 'completed');
  return (
         <div className="w-full rounded-lg bg-green-50 h-[250px] sm:h-[270px] border border-gray-100 mb-4">
          <p className='bg-green-300 text-black font-semibold text-xs sm:text-sm max-w-24 sm:max-w-28 rounded-lg p-2 m-2'>Completed</p>
          <div className='flex flex-row overflow-x-auto h-[calc(100%-3.5rem)] gap-2 p-2'>
            {completedTasks.length > 0 ? (
              completedTasks.map((item) => (
                <TaskCard data={item} key={item.id}
                />
              ))
            ) : (
              <div className='flex justify-center items-center w-full h-full'>
                <p className='text-gray-400 text-sm sm:text-base'>No completed tasks yet</p>
              </div>
            )}
          </div>
        </div>
  )
}

export default Completed
