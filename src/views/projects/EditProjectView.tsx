import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/ProjectAPI";
import EditProjectForm from "@/components/projects/EditProjectForm";

export default function EditProjectView() {

    //useParams es un hoock de react-router-doom para obtener los datos de la ruta en este caso /projects/:projectId/edit
    const params = useParams();
    //* ! indica que siempre va a esperar por el dato a typescript y esto para evitar que sea de tipo any
    const projectId = params.projectId!;
    
    const {data, 
           isLoading, 
          // error, me retorna infomacion mas completa sobre el error 
           isError
        } = useQuery({
        //se pasa projectId para que la consulta sea unica porque se cachean las consultas cuando se vuelve a consultar y esto nos daria problemas.
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId),
        //retry son las veces que va a hacer esta peticion , se le puede pasar cantidad de veces que ara la peticion como retry: 3 o intentalo 3 veces, 
        // booleanos para indicar que no lo aga que a la primera lo realice y obtenga el error o que se cumplio la promesa
        retry: false
    });

    if(isLoading){
        return 'Cargando...'
    }

    if(isError){
        return <Navigate to='/404' />
    }

    if(data) return (
        <EditProjectForm data={data} projectId={projectId} />
    )
}
