import { useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/LoginPage.css'
import { useNavigate } from 'react-router-dom';
import authService from '../service/autentication.service.js';

function LoginPage(){
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const onChangeEmail = (event) =>{
        setEmail(event.target.value)
    }

    const onChangePassword = (event) =>{
        setPassword(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault() 
        console.log('submit', email, password)
        authService.login({email, password})

        .then((data) => {
            console.log("data", data.responseAccount.token)
            
            setError('')

            localStorage.setItem('token', data.responseAccount.token)

            navigate('/desafio', {replace: true})
           
        })
        .catch(err => {
            setError(err.error.message)
        })

      
    } 

    return(
        <div className="page">
            <div className="container">
                <Form onSubmit={onSubmit}> 
                    <h1 className="text-center">Iniciar Sesión</h1>
                    <Form.Group className="col-mb-6">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email"  placeholder="Tu email" value={email} onChange={onChangeEmail} />
                    </Form.Group>
                    <Form.Group className="col-mb-6" >
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Tu clave" value={password} onChange={onChangePassword}/>
                    </Form.Group>
                    <p> {error} </p>
                    <Button type="submit" className='button'>
                        Ingresar
                    </Button>
                </Form> 
            </div>
        </div>
    )
}

export default LoginPage