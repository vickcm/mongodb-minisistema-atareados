import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Desafio from './Desafio/FormDesafio'
import Recompesa from './Recompesas/RecompesasUsuarios'
import NavBar from './Home/Navbar'
import Error404 from './pages/Error404'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {path: '/', element: <App /> , errorElement: <Error404 /> },
  {path: '/desafio', element: <Desafio />},
  {path: '/recompesa', element: <Recompesa />},

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>  
    <NavBar />
   <RouterProvider router={router} />
  </React.StrictMode>,
)
