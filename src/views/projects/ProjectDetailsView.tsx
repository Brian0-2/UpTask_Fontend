import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFullProjectDetails } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { useMemo } from "react";

export default function ProjectDetailsView() {
  const { data: user, isLoading: authLoading } = useAuth();

  const navigate = useNavigate();
  //useParams es un hoock de react-router-doom para obtener los datos de la ruta en este caso /projects/:projectId/edit
  const params = useParams();
  //* ! indica que siempre va a esperar por el dato a typescript y esto para evitar que sea de tipo any
  const projectId = params.projectId!;

  const {
    data,
    isLoading,
    // error, me retorna infomacion mas completa sobre el error
    isError,
  } = useQuery({
    //se pasa projectId para que la consulta sea unica porque se cachean las consultas cuando se vuelve a consultar y esto nos daria problemas.
    queryKey: ["project", projectId],
    queryFn: () => getFullProjectDetails(projectId),
    //retry son las veces que va a hacer esta peticion , se le puede pasar cantidad de veces que ara la peticion como retry: 3 o intentalo 3 veces,
    // booleanos para indicar que no lo aga que a la primera lo realice y obtenga el error o que se cumplio la promesa
    retry: false,
  });

  const canEdit = useMemo(() => data?.manager === user?._id,[data,user])

  if (isLoading && authLoading) {
    return "Cargando...";
  }

  if (isError) {
    return <Navigate to="/404" />;
  }


  if (data && user)
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          {data.description}
        </p>

        {isManager(data.manager, user._id) && (
          <nav className="my-5 flex gap-3">
            <button
              type="button"
              className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
              onClick={() => navigate(location.pathname + "?newTask=true")}
            >
              Agregar Tarea
            </button>
            {/* Agregar a la URL actual si no tiene el / al principio */}
            <Link
              to={"team"}
              className="bg-fuchsia-600 hover:bg-fucnsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            >
              Colaboradores
            </Link>
          </nav>
        )}

        <TaskList 
          tasks={data.tasks} 
          canEdit={canEdit}  
        />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
}
