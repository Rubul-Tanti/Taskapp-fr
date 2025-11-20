'use client'
import { fetchData } from '@/server';
import { Task, taskList } from '@/server/type';
import { useQuery } from '@tanstack/react-query';
import React,{createContext, Dispatch, useContext, useEffect, useState} from 'react';

interface AppContextType {
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string>>;
  isCreateFormOpen: boolean;
  setIsCreateFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCardOpen: boolean;
  setIsCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  taskList: taskList;
  setTaskList: Dispatch<React.SetStateAction<taskList>>;
  currentTask:Task
  ,setCurrentTask:Dispatch<React.SetStateAction<Task>>
}

export const AppContext = createContext<AppContextType>({
  error: null,
  setError: () => {},
  isCreateFormOpen: false,
  setIsCreateFormOpen: () => {},
  isCardOpen: false,
  setIsCardOpen: () => {},
  taskList: [],
  setTaskList:()=>{},
  currentTask:{id:0,
  title:'',
  description:'',
  status:'todo',
  createdAt:''},
  setCurrentTask:()=>{}
});

const ContextProvider=({children}:{children:React.ReactNode})=>{
    const [error,setError]=useState('')
    const [isCreateFormOpen,setIsCreateFormOpen]=useState(false)
    const [isCardOpen,setIsCardOpen]=useState(false)
    const [taskList,setTaskList]=useState<taskList>([])
    const [currentTask,setCurrentTask]=useState<Task>({id:0,
  title:'',
  description:'',
  status:'todo',
  createdAt:''})

    return <AppContext.Provider value={{currentTask,setCurrentTask,error,setError,isCreateFormOpen,setIsCreateFormOpen,isCardOpen,setIsCardOpen,taskList,setTaskList}}>{children}</AppContext.Provider>

}
const useContextProvider=()=>{
    const ctx=useContext(AppContext)
    if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
  return ctx;
}
export {ContextProvider,useContextProvider}