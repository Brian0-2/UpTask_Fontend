import { dashboardProjectSchema, editProjectSchema, Project, ProjectFormData, projectSchema } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";


export async function createProject(formData: ProjectFormData){
    try {
        //axios arroja data 2 veces por eso el el {data}
        const { data } = await api.post('/projects', formData)
        //Regresa el dato del api a onSuccesss de React Query
        return data
    } catch (error) {
        //Verificamos que sea un error de axios y para typescript existe isAxiosError y le pasamos el error
        // y comprobamos tambien si error.response existe tambien
        if(isAxiosError(error) && error.response){
            //Arrojamos un error para que React Query pueda leerlo en onError
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjects(){

    try {
        const {data} = await api.get('/projects')
        const response = dashboardProjectSchema.safeParse(data)
        if(response.success){
         return response.data
        }
    } catch (error) {
        //Verificamos que sea un error de axios y para typescript existe isAxiosError y le pasamos el error
        // y comprobamos tambien si error.response existe tambien
        if(isAxiosError(error) && error.response){
            //Arrojamos un error para que React Query pueda leerlo en onError
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectById(id : Project['_id']){
    try {
        const {data} = await api.get(`/projects/${id}`);
        const response = editProjectSchema.safeParse(data);
        if(response.success){
            return response.data;
        }   
    } catch (error) {
        //Verificamos que sea un error de axios y para typescript existe isAxiosError y le pasamos el error
        // y comprobamos tambien si error.response existe tambien
        if(isAxiosError(error) && error.response){
            //Arrojamos un error para que React Query pueda leerlo en onError
            throw new Error(error.response.data.error)
        }
    }
}

export async function getFullProjectDetails(id : Project['_id']){
    try {
        const {data} = await api.get(`/projects/${id}`);
        const response = projectSchema.safeParse(data);
        if(response.success){
            return response.data;
        }   
    } catch (error) {
        //Verificamos que sea un error de axios y para typescript existe isAxiosError y le pasamos el error
        // y comprobamos tambien si error.response existe tambien
        if(isAxiosError(error) && error.response){
            //Arrojamos un error para que React Query pueda leerlo en onError
            throw new Error(error.response.data.error)
        }
    }
}

type ProjectAPIType = {
    formData: ProjectFormData,
    projectId: Project['_id']
}
export async function updateProject({formData,projectId}: ProjectAPIType){
    try {
        const {data} = await api.put<string>(`/projects/${projectId}`, formData)
        return data;
    } catch (error) {
        //Verificamos que sea un error de axios y para typescript existe isAxiosError y le pasamos el error
        // y comprobamos tambien si error.response existe tambien
        if(isAxiosError(error) && error.response){
            //Arrojamos un error para que React Query pueda leerlo en onError
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteProject(id : Project['_id']){
    try {
        const {data} = await api.delete<string>(`/projects/${id}`)
        return data;
    } catch (error) {
        //Verificamos que sea un error de axios y para typescript existe isAxiosError y le pasamos el error
        // y comprobamos tambien si error.response existe tambien
        if(isAxiosError(error) && error.response){
            //Arrojamos un error para que React Query pueda leerlo en onError
            throw new Error(error.response.data.error)
        }
    }
}