/* eslint-disable react/no-unescaped-entities */
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
import { useProfile } from "../../context/session.context";
import profileService from "../../service/profile.service";
import { toast } from "react-toastify";


function CreatePerfilPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [nacimiento, setNacimiento] = useState("");
  const [error, setError] = useState("");
  const {profile, setProfile} = useProfile();

  const onChangeUsername = useCallback(
    (event) => {
      setUsername(event.target.value);
    },
    [setUsername]
  );

  const onChangeAge = useCallback(
    (event) => {
      setNacimiento(event.target.value);
    },
    [setNacimiento]
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!username) {
        setError("El nombre de usuario es obligatorio");
        return;
      }

      if (!nacimiento) {
        setError("La fecha de nacimiento es obligatoria");
        return;
      }

      console.log("submit", username, nacimiento);
      const profileData = {
        username,
        nacimiento
      };
      profileService
        .createProfile(profileData)
        .then(() => {
          console.log("perfil creado");
          setError("");
          toast.success(profileData.username + " tu perfil fue creado con éxito");
          // Actualizar el perfil en el contexto después de que se haya creado correctamente
          setProfile(profileData); // Llama a la función setProfile del contexto con el perfil recién creado
          navigate("/desafio", { replace: true });
        })
        .catch((error) => {
          setError(error.message); // Opción 1: usa err.error.message si el error se envía como { error: { message: "..."} }
        });
    },
    [username, nacimiento, navigate, setError, setProfile]
  );

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
              md="6" className="label-perfil" controlId="nacimiento">
              <Form.Label className="nombre-perfil">Fecha de Nacimiento</Form.Label>
              <Form.Control
                className="place-perfil"
                onChange={onChangeAge}
                value={nacimiento}
                size="lg"
                type="date"
              />
            </Form.Group>
            
          </Row>

          <div className="row justify-content-center my-4">
          {error && <p className="error-message">{error}</p>}

          </div>
          
         


          <div className="aling-button-desafio">
            <Button type="submit"  className="btn-desfio">
              Crear Perfil
            </Button>
          </div>
        </Form>
      
      </Container>
    </>
  );
}

export default CreatePerfilPage;
