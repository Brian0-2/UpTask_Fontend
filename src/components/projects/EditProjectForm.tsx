import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { Project, ProjectFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
  data: ProjectFormData,
  projectId: Project['_id']
}

export default function EditProjectForm({data, projectId}: EditProjectFormProps) {
    
      const navigate = useNavigate();
      //Hook de Reac-Hook-Form
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ defaultValues: {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description,
      } });

      //Hook para Invalidar los query cacheados en caso de que ya exista y quiero que hagas otra consulta
      const queryClient = useQueryClient()

      //Base de React Query
      const {mutate} = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
          toast.error(error.message)
        },
        onSuccess: (data) => {
          // Refrescar los datos cada que se aga un cambio se le conoce como refreshing a un proyecto, 
          // solo en este caso porque si no, se guarda en cache la consulta 
          // y nunca recargara los datos nuevos utiliza los datos de la cache ya guardados,
          //Simulando a un useState pero esto es mas optimizado en 1 sola linea y no reahaciendo peticiones innecesarias al servidor
          queryClient.invalidateQueries({queryKey: ['projects']})
          queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
          toast.success(data)
          navigate('/')
        }
      });

        //Si se pasa la validacion se manda a llamar al servicio del api
  const handleForm = (formData: ProjectFormData) =>{
    const data = {
      formData,
      projectId
    }
    //Solamente toma una variable , por eso en este caso pasamos data porque necesitabamos pasar los datos y a que projecto pertenecen
    mutate(data)
  };
      
    return (
        <>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black">Editar Proyecto</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">
              Llena el siguiente formulario para editar el proyecto
            </p>
            <nav className="my-5">
              <Link
                className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                to={"/"}
              >
                Volver a Proyectos
              </Link>
            </nav>
    
            <form
              className="mt-10 bg-white shadow-lg p-10 rounded-lg"
              onSubmit={handleSubmit(handleForm)}
              noValidate
            >
              <ProjectForm 
                register={register}
                errors={errors}
              />
              
              <input
                type="submit"
                value="Guardar Cambios"
                className=" bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
              />
            </form>
          </div>
        </>
      );
}
