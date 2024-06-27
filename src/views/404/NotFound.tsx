
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
        <h1 className='font-black text-center text-4xl text-white'>Pagina no encontrada 404</h1>
        <p className='mt-10 text-center text-white'>
            Tal vez quieras volver a {' '}
            <Link className='text-fuchsia-500' to={'/'} >Proyectos</Link>
        </p>
    </>
  )
}
