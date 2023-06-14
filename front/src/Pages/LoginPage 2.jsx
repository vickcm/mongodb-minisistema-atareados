import { useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/LoginPage.css'
import { useNavigate } from 'react-router-dom';

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

        // refactorizar a servicio 
        
        fetch('http://localhost:2023/api/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
        })
        .then(async response =>  {
            if(!response.ok){
                throw await response.json()
            }
            return  response.json()
        }) 
        .then(({data}) => {
            setError('')
            localStorage.setItem('token', data.token)
            console.log( 'sesión iniciada:', data.account, data.token)
            navigate('/desafio', {replace: true})

        })
        .catch(err => {
            setError(err.error.message)
        })
    } 

    return(
        <div className="page">
            <div className="container">
                <Form className="form-login" onSubmit={onSubmit}> 
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