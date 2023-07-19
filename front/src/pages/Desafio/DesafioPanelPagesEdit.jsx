import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import ImagePlusMember from "../../imagenes/plus.png";
import ImageDeleteMember from "../../imagenes/trash.png";
import { useDesafio } from "../../context/desafioContext";

import "../../css/FormDesafioStyle.css";
import DesafioPanel from "./DesafioPanelPages";

// sin terminar no trae los datos. 

function TeamMembersInput({ memberInput, onChangeMemberInput, addMember, error }) {
  return (
    <Form.Group as={Col} sm="12" controlId="equipo">
      <Form.Label>Equipo</Form.Label>
      <p className="p-team-form">¡Recuerda agregar los mails de los integrantes!</p>
      <Row className="align-items-center">
        <Col xs={11}>
          <Form.Control
            type="equipo"
            value={memberInput}
            onChange={onChangeMemberInput}
          />
        </Col>
        <Col xs={1}>
          <a onClick={addMember} className="btn-plus-member" title="Agregar">
            <Image src={ImagePlusMember} />
          </a>
        </Col>
      </Row>
      {error && <p className="error-message">{error}</p>}
    </Form.Group>
  );
}

function TeamMembers({ members, deleteMember }) {
  if (!members || members.length === 0) {
    return <p>Todavía no hay integrantes en tu equipo</p>;
  }
  return (
    <div>
      <p>Integrantes:</p>
      {members.length === 0 ? (
        <p>Todavía no hay integrantes en tu equipo</p>
      ) : (
        members.map((member, index) => (
          <div key={index} className="member-item">
            <p>{member}</p>
            <a title="Eliminar" onClick={() => deleteMember(index)}><Image src={ImageDeleteMember} /></a>
          </div>
        ))
      )}
    </div>
  );
}

function DesafioPanelPagesEdit() {
  const navigate = useNavigate();
  const desafio = useDesafio();
  console.log(desafio);
  console.log(desafio.desafio.title);
  // Obtiene los datos actuales del desafío o inicializa con valores vacíos si es un nuevo desafío

  const [title, setTitle] = useState(desafio.desafio.title);
  const [members, setMembers] = useState(desafio.desafio.members);
  const [memberInput, setMemberInput] = useState("");
  const [deadline, setDeadline] = useState(desafio.desafio.deadline);
  const [error, setError] = useState("");

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeMemberInput = (event) => {
    setMemberInput(event.target.value);
  };

  const addMember = () => {
    if (memberInput.trim() !== "") {
      // Realizar la validación aquí
      if (members.includes(memberInput)) {
        setError("El miembro ya existe en el equipo.");
      } else {
        setMembers((prevMembers) => [...prevMembers, memberInput]);
        setMemberInput("");
        setError("");
      }
    }
  };

  const deleteMember = (index) => {
    setMembers((prevMembers) => prevMembers.filter((_, i) => i !== index));
  };

  const onChangeDate = (event) => {
    setDeadline(event.target.value);
  };

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log("submit", title, members, deadline);
      const challenge = {
        title,
        members,
        deadline,
      };

      // Aquí deberías enviar la solicitud para actualizar el desafío con los nuevos datos.

      navigate("/paneldesafio", { replace: true });
    },
    [title, members, deadline, navigate]
  );

  return (
    <>
      <Container className="container-desafio">
        <Form className="form-desafio" onSubmit={onSubmit}>
          <div className="titulo">
            <h1>Edita tu desafio</h1>
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
            <TeamMembersInput
              onChangeMemberInput={onChangeMemberInput}
              memberInput={memberInput}
              addMember={addMember}
              error={error}
            />
            <TeamMembers members={members} deleteMember={deleteMember}/>
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