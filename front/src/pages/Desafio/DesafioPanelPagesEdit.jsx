import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useDesafio } from "../../context/desafioContext"; // Importa el contexto que contiene los datos del desafío


import "../../css/FormDesafioStyle.css";

function DesafioPanelPagesEdit() {
  const navigate = useNavigate();
  const desafioData = useDesafio(); // Obtiene los datos del desafío desde el contexto
  
 console.log("desafioData", desafioData);

 
  if (!desafioData || Object.keys(desafioData).length === 0 || !desafioData.desafio) {
    // Muestra un mensaje de carga mientras se obtienen los datos del desafío
    return <p>Cargando...</p>;
  }

  const { title, members, deadline } = desafioData.desafio;
  const [memberInput, setMemberInput] = useState("");
  const [error, setError] = useState("");


  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeDate = (event) => {
    setDeadline = event.target.value;
    console.log(setDeadline)
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("submit", title, deadline);
    const challenge = {
      title,
      deadline,
      members,
    };
    // Aquí deberías enviar la solicitud para actualizar el desafío con los nuevos datos.
    // Puedes usar 'challenge' para enviar los datos al servidor o donde sea necesario.

    navigate("/paneldesafio", { replace: true });
  };

  return (
    <>
      <Container className="container-desafio">
        <Form className="form-desafio" onSubmit={onSubmit}>
          <div className="titulo">
            <h1>Edita tu desafío</h1>
            <p>Edita los datos de tu desafío</p>
          </div>
          <Row className="mb-3 rowDesafio">
            <Form.Group as={Col} sm="12" controlId="titulo">
              <Form.Label>Título del Desafio</Form.Label>
              <Form.Control
                type="titulo"
                value={title}
                onChange={onChangeTitle}
              />
            </Form.Group>
            <Form.Group as={Col} sm="12" controlId="date">
              <Form.Label>Fecha de vencimiento</Form.Label>
              <Form.Control
                type="date"
                value={deadline}
                onChange={onChangeDate}
              />
            </Form.Group>
            {/* Aquí puedes agregar los campos relacionados con los miembros si es necesario */}
          </Row>
          <div className="aling-button-desafio">
            <Button className="btn-desfio">Guardar Cambios</Button>
          </div>
        </Form>
        <p>{error}</p>
      </Container>
    </>
  );
}

export default DesafioPanelPagesEdit;
