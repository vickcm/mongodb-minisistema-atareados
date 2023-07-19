import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import "../css/PanelDesafioEstilos.css";

import {
  formatDeadline,
  getDaysRemaining,
  getMessage,
} from "../utils/utils";

//  prueba de poner en el componente el editar sin finalizar 

function DesafioPanelComponente({ desafio }) {
  const { _id, title, deadline, members } = desafio;
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(desafio.title);
  const [editDeadline, setEditDeadline] = useState(desafio.deadline);
  const [editMembers, setEditMembers] = useState(
    desafio.members.map((member) => ({ ...member }))
  );

  const formattedDeadline = formatDeadline(deadline);
  const daysRemaining = getDaysRemaining(deadline);
  const message = getMessage(daysRemaining);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Aquí deberías implementar la lógica para guardar los cambios del desafío.
    // Por ejemplo, puedes enviar una solicitud al servidor para actualizar el desafío.
    // Luego, establecer el modo de edición como falso y actualizar el título, fecha límite y miembros del desafío.
    setIsEditing(false);
    // Ejemplo de cómo podrías actualizar el desafío con la nueva información:
    // updateDesafio(_id, editTitle, editDeadline, editMembers);
    // updateDesafio es una función ficticia, deberías reemplazarla con la función real que actualice el desafío en el servidor.
  };

  const handleMemberChange = (index, key, value) => {
    setEditMembers((prevMembers) =>
      prevMembers.map((member, i) => (i === index ? { ...member, [key]: value } : member))
    );
  };

  return (
    <>
      <Card style={{ margin: "2rem" }}>
        <Card.Body>
          {isEditing ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <input
                type="date"
                value={formattedDeadline}
                onChange={(e) => setEditDeadline(e.target.value)}
              />
            </>
          ) : (
            <Card.Title>{title}</Card.Title>
          )}
          {editMembers.map((member, index) =>
            isEditing ? (
              <div key={index}>
            
                <input
                  type="email"
                  value={member.email}
                  onChange={(e) => handleMemberChange(index, "email", e.target.value)}
                />
              </div>
            ) : (
              <div key={index}>
                <p>
                  {member.username} ({member.age} años) - {member.email}
                </p>
              </div>
            )
          )}
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            Fecha de vencimiento: {formattedDeadline}
          </ListGroup.Item>
          <ListGroup.Item>{message}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          {isEditing ? (
            <>
              <button onClick={handleSaveClick}>Guardar</button>
              <button onClick={() => setIsEditing(false)}>Cancelar</button>
            </>
          ) : (
            <button onClick={handleEditClick}>Editar</button>
          )}
          <Link to={`/desafio/${desafio._id}`} className="btn-ver-tareas">
            Ver tareas
          </Link>
          <Link to={`/desafio/${desafio._id}/editar`} className="btn-ver-tareas">
           editar
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

export default DesafioPanelComponente;