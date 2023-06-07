import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/auth.service'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
        <div className="container">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
        
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Ingresar
              </Button>
            </Form>
        </div>
        
    )
}

export default LoginPage