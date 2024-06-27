import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task, TaskFormData } from '@/types/index';
import { useForm } from 'react-hook-form';
import TaskForm from './TaskForm';
import { updateTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

type EditTaskModalProps = {
    data: Task,
    taskId: Task['_id']
}

export default function EditTaskModal({data, taskId} : EditTaskModalProps) {
    /**Obtener projectId de la url */
    const params = useParams();
    const projectId = params.projectId!

    const navigate = useNavigate();
    const {register, handleSubmit, reset, formState: {errors}} = useForm<TaskFormData>({defaultValues: {
        name: data.name,
        description: data.description
    }});

    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: updateTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) =>{
            //Actualizar o refrescar la query para los projectos para que se refresquen en pantalla
            queryClient.invalidateQueries({queryKey: ['project', projectId]})
            //Actualizar o refrescar la query para las tareas para que si le damos a editar vuelva a consultar la api
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
            toast.success(data)
            reset()
            navigate(location.pathname, {replace: true})
        }
    });

    const handleEditTask = (formData: TaskFormData) =>{

       const data = {
        projectId,
        taskId, 
        formData
       }

       mutate(data);
    }

    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => { navigate(location.pathname, {replace: true}) } }>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                <DialogTitle
                                    as="h3"
                                    className="font-black text-4xl  my-5"
                                >
                                    Editar Tarea
                                </DialogTitle>

                                <p className="text-xl font-bold">Realiza cambios a una tarea en {''}
                                    <span className="text-fuchsia-600">este formulario</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    onSubmit={handleSubmit(handleEditTask)}
                                    noValidate
                                >
                    
                                    <TaskForm 
                                        register={register}
                                        errors={errors}
                                    />
                    
                                    <input
                                        type="submit"
                                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                                        value='Guardar Tarea'
                                    />
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}