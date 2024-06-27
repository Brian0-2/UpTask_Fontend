import { Navigate, useLocation, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "@/api/TaskAPI";
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {

    //Obtengo el projecto de la url
    const params = useParams()
    // el signo ! es para que solo sea string
    const projectId = params.projectId!;

    //Obtener el taskId de la url
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    // el signo ! es para que solo sea string
    const taskId = queryParams.get('editTask')!;
    
    const {data, isError} = useQuery({
        queryKey: ['task', taskId],
        queryFn:() => getTaskById({projectId, taskId}),
        // !! Retorna si una variable existe o no , true or false.
        // enable: controla cuando hacer una consulta o no
        enabled: !! taskId,
        retry: false
    })

    if(isError) return <Navigate to={'/404'} />
    if(data) return <EditTaskModal data={data} taskId={taskId}/>

}
