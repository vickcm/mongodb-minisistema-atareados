import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import profileService from "../../service/profile.service";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";



function PerfilPageEdit() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [nacimiento, setNacimiento] = useState("");

  useEffect(() => {
    profileService.getProfile()
      .then(profile => {
        setUsername(profile.username);
        setNacimiento(profile.nacimiento);
      })
      .catch(err => {
        console.log(err);
        navigate('/crearperfil', { replace: true });
      });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    const updatedProfile = {
      username,
      nacimiento,
      
    };

    profileService.updateProfile(updatedProfile)
      .then(() => {
        toast.success("Perfil editado correctamente");
        navigate('/perfil', { replace: true });
      })
      .catch(err => {
        toast.error("Error al editar el perfil");
        console.log(err);
        // Manejar el error en caso de que ocurra
      });
  };

  return (
    <Container>
      <h2>Editar perfil</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Nombre de usuario</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formNacimiento">
          <Form.Label>Fecha de nacimiento</Form.Label>
          <Form.Control
            type="date"
            value={nacimiento}
            onChange={e => setNacimiento(e.target.value)}
          />
        </Form.Group>
       
        <Button variant="primary" type="submit">
          Guardar cambios
        </Button>
      </Form>

    </Container>
  );
}

export default PerfilPageEdit;
