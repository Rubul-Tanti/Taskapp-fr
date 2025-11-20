'use client'
import CreateTaskForm from '@/components/createTaskForm';
import TaskCard from '@/components/taskCard';
import TaskDetailsPage from '@/components/taskDetailsPage';
import logo from '@/public/logo.png'
import { createTask, fetchData } from '@/server';
import { Task, taskList } from '@/server/type';
import { useContextProvider } from '@/store/context';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import Progress from '@/components/home/progress';
import Todo from '@/components/home/todo';
import Completed from '@/components/home/completed';

const Dashboard=()=>{
  const {taskList,setTaskList,isCreateFormOpen: isOpenForm, setIsCreateFormOpen: setIsOpenForm, isCardOpen, setIsCardOpen}=useContextProvider()
    const { data, error:Error, isLoading } = useQuery({queryKey:['tasks'],queryFn:fetchData})
    useEffect(()=>{
      if(data?.data){
          setTaskList(data.data as taskList)
      }
    },[data])
    if(isLoading){
      return <div className='h-screen w-full flex justify-center items-center'>
        <p>Loading...</p>
      </div>
    }

 return <div className="h-screen transition-all relative duration-300 ease-in w-full overflow-hidden">
      {isCardOpen && <TaskDetailsPage />}
      {isOpenForm && <CreateTaskForm />}
      
      {/* Header */}
      <header className="h-14 sm:h-16 flex justify-between items-center px-3 sm:px-5 mb-2 border-b border-gray-200">
        <Image src={logo} alt="logo" className='h-auto w-10 sm:w-12 rounded-lg' />
        <p className='font-semibold font-sans text-sm sm:text-base'>Rubul Tanti</p>
      </header>

      {/* Main Content */}
      <div className='h-[calc(100%-3.5rem)] sm:h-[calc(100%-4rem)] p-2 sm:p-4 overflow-y-auto'>
        
        {/* Top Section - In Progress & To Do */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-5 mb-3 sm:mb-5">
          
          {/* In Progress Section */}
            <Progress/>

          {/* To Do Section */}
        <Todo/>
        </div>

        {/* Completed Section */}
        <Completed/>
      </div>
    </div>
}

const Home = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard/>
    </QueryClientProvider>
  )
}

export default Home;