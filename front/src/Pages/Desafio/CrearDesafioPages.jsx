import { Button } from "bootstrap-4-react/lib/components";
import { Container } from "bootstrap-4-react/lib/components/layout";
import { useCallback, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import ImagePlusMember from "../../imagenes/plus.png";	
import ImageDeleteMember from "../../imagenes/trash.png";	
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AlertaCrearPerfilComponente from "../../components/AlertaCrearPerfilComponente";

import "../../css/FormDesafioStyle.css";

import desafioService from "../../service/desafio.service.js";

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
  return (
    <div className="member-list">
      <h2>Integrantes:</h2>
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
  )  
}

function FormDesafio() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [members, setMembers] = useState([]);
  const [memberInput, setMemberInput] = useState("");
  const [deadline, setDeadline] = useState("");
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

      desafioService
        .createChallenge(challenge)
        .then(({ challenge }) => {
          console.log("Equipo creado", challenge);
          setError("");
          navigate("/paneldesafio", { replace: true });
        })
        .catch((err) => {
          setError(err.error.message);
        });
    },
    [title, members, deadline, navigate, setError]
  );

  return (
    <>
      <AlertaCrearPerfilComponente />
      <Container className="container-desafio">
        <Form className="form-desafio" onSubmit={onSubmit}>
          <div className="titulo">
            <h1>Crea tu desafio</h1>
            <p>Carga los datos para crear el desafio</p>
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
          </Row>
          <div className="aling-button-desafio">
            <Button className="btn-desfio">Crear Desafío</Button>
          </div>
        </Form>
        <p>{error}</p>
        <TeamMembers members={members} deleteMember={deleteMember}/>
      </Container>
    </>
  );
}

export default FormDesafio;