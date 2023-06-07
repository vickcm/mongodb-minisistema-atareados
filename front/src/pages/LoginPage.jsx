import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../service/autenticacion.service'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './LoginPage.css'

function LoginPage(){
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()


    const onChangeUserName = (event) =>{
        setUserName(event.target.value)
    }

    const onChangePassword = (event) =>{
        setPassword(event.target.value)
    }



    useEffect(()=>{
        authService.logout()
        localStorage.removeItem('token')
    }, [])


    const onSubmit = (event) =>{
        event.preventDefault()

        authService.login({userName, password})
        .then(({token, account})=>{
            console.log("Sesion iniciada", {token, account})
            
            localStorage.setItem('token', token)

            navigate('/', {replace: true}) // reemplaza la pagina actual en el historial
        })
        .catch(e=>{
            console.log("Error al iniciar sesion", error)
            setError(e.error.message)
        })


    }

    return(
       <div className="page">
        <div className="container">
            <Form onSubmit={onSubmit}>
            <h1 className="text-center">Iniciar Sesion</h1>
              <Form.Group className="col-mb-6">
                <Form.Label>Usuario:</Form.Label>
                <Form.Control type="text" placeholder="Tu usuario" value={userName} onChange={onChangeUserName} />
              </Form.Group>
        
              <Form.Group className="col-mb-6" >
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Tu clave" value={password} onChange={onChangePassword}/>
              </Form.Group>

              <Button type="submit" className='button'>
                INGRESAR
              </Button>
            </Form>
        </div>
        </div>
    )
}

export default LoginPage