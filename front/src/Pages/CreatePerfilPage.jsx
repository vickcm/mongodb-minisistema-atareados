/* eslint-disable react/no-unescaped-entities */
import { Button } from "bootstrap-4-react/lib/components";
import { Container } from "bootstrap-4-react/lib/components/layout";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImagePerfil from "../imagenes/perfil.jpg";
import "../css/PerfilEstilos.css";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileService from "../service/profile.service";

function CreatePerfilPage() {

  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const onChangeUsername = useCallback(
    (event) => {
      setUsername(event.target.value);
    },
    [setUsername]
  );

  const onChangeAge = useCallback(
    (event) => {
      setAge(event.target.value);
    },
    [setAge]
  );

  const onSubmit = useCallback((event) => {
    event.preventDefault()
    console.log("submit", username, age)
    const profile = {
        username,
        age
    }
    profileService.createProfile(profile)

    .then(({profile}) => {
        console.log("perfil creado", profile)
        setError('')
        navigate('/desafio', {replace: true})
    })
    .catch(err => {
        setError(err.error.message)
    })
}, [username, age, navigate, setError])

  return (
    <>
      <Container className="container-perfil">
        <Form className="form-perfil" onSubmit={onSubmit}>
          <div className="img-perfil">
            <Image src={ImagePerfil} width="30%" className='img-perfil' />
          </div>
          <Row className="mb-3 rowDesafio">
            <Form.Group
              as={Col}
              md="6"
              controlId="username"
              className="label-perfil"
            >
              <Form.Label className="nombre-perfil">
                Nombre de Usuario
              </Form.Label>
              <Form.Control
                type="equipo"
                onChange={onChangeUsername}
                value={username}
                placeholder="juanjose2023"
              />
            </Form.Group>
            <Form.Group   as={Col}
              md="6" className="label-perfil" controlId="age">
              <Form.Label className="nombre-perfil">Edad</Form.Label>
              <Form.Control
              
                className="place-perfil"
                onChange={onChangeAge}
                value={age}
                size="lg"
                type="text"
                placeholder="27 años"
              />
            </Form.Group>
          </Row>
          <div className="aling-button-desafio">
            <Button type="submit"  className="btn-desfio">
              Crear Perfil
            </Button>
          </div>
        </Form>
        <p>{error} </p>
      </Container>
    </>
  );
}

export default CreatePerfilPage;
