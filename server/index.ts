import api from '../utils/axios';
import { fetchTasksResponse } from './type';
 export const createTask=async(formData:{title:string,description:string})=>{
try{
    const res=await api.post('user/v1/create-task',formData)
    return res?.data
}catch(e){
    throw new Error('Error creating task');
}
}

  export  const fetchData=async()=>{
      try{
        const res=await api.get('user/v1/fetch-tasks')
            return res?.data as fetchTasksResponse
    }catch(e){
        throw new Error('Error fetching tasks');
            }
          }

          export const deleteTask=async(id:number)=>{
            try{
                const res=await api.delete(`user/v1/delete-task/${id}`)
                return res?.data 
            }catch(e){
                throw new Error('Error deleting task');
            }
          }
          export const updateTask=async(id:number,formData:{title:string,description:string,status:string})=>{
            try{
                const res=await api.put(`user/v1/update-task/${id}`,formData)}catch(e){
                throw new Error('Error updating task');
            }}