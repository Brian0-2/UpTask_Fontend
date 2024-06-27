import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import Router from './router'

//Dependencias
// npm i -D tailwindcss postcss autoprefixer
// npx tailwindcss init -p
// npm i react-router-dom
// npm i -D @types/node
// npm i @headlessui/react @heroicons/react
// npm i react-hook-form
// npm i zod
// npm i axios
// npm i react-toastify
// npm i @tanstack/react-query
// documentacion de react-query : https://tanstack.com/query/v5/docs/framework/react/reference/useMutation
// npm i @tanstack/react-query-devtools : Herramienta para ver los datos cacheados
// npm i @chakra-ui/pin-inpu
// npm i @tailwindcss/forms
// npm i @dnd-kit/core

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
      {/* Herramientas de trabajo */}
      <ReactQueryDevtools />

    </QueryClientProvider>
  </React.StrictMode>,
)
