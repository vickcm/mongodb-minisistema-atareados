import { Button } from "bootstrap-4-react/lib/components";
import { Container } from "bootstrap-4-react/lib/components/layout";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImagePerfil from "../../imagenes/perfil.jpg";
import "../../css/PerfilEstilos.css";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileService from "../../service/profile.service";
import { useProfile } from "../../context/session.context"; // Importa el hook useProfile

function CreatePerfilPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const {profile, setProfile} = useProfile(); // Obtiene el perfil del contexto

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

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log("submit", username, age);
      const profileData = {
        username,
        age,
      };
      profileService
        .createProfile(profileData)
        .then(() => {
          console.log("perfil creado");
          setError("");
          // Actualizar el perfil en el contexto después de que se haya creado correctamente
          setProfile(profileData); // Llama a la función setProfile del contexto con el perfil recién creado
          navigate("/desafio", { replace: true });
        })
        .catch((error) => {
          setError(error.message); // Opción 1: usa err.error.message si el error se envía como { error: { message: "..."} }
          // setError(err.message); // Opción 2: usa err.message si el error se envía como { message: "..."}
        });
    },
    [username, age, navigate, setError, setProfile]
  );

  return (
    <>
      <Container className="container-perfil">
        <Form className="form-perfil" onSubmit={onSubmit}>
          <div className="img-perfil">
            <Image src={ImagePerfil} width="30%" className="img-perfil" />
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
            <Form.Group
              as={Col}
              md="6"
              className="label-perfil"
              controlId="age"
            >
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
            <Button type="submit" className="btn-desfio">
              Crear Perfil
            </Button>
          </div>
        </Form>
        {error && <p>{error}</p>}
      </Container>
    </>
  );
}

export default CreatePerfilPage;
