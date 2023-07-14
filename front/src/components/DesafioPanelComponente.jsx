import { useState } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import "../css/PanelDesafioEstilos.css";

import { formatDeadline, getDaysRemaining, getMessage } from "../utils/utils";

function DesafioPanelComponente({ desafio }) {
  const { _id, title, deadline, members } = desafio;
  const [editTitle, setEditTitle] = useState(desafio.title);
  const [editDeadline, setEditDeadline] = useState(desafio.deadline);

  const formattedDeadline = formatDeadline(deadline);
  const daysRemaining = getDaysRemaining(deadline);
  const message = getMessage(daysRemaining);
  console.log(desafio)

  return (
    <>
    <Card style={{ margin: '2rem' }}>
      <Card.Body>
        <Card.Title>{title} </Card.Title>
        <Card.Text>
          Equipo:
          <ul className="list-unstyled">
            {members.map((member) => (
              <li key={member._id}>
                {member.username} ({member.age} años) - {member.email}
              </li>
            ))}
          </ul>
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Fecha de vencimiento: {formattedDeadline}</ListGroup.Item>
        <ListGroup.Item>{message}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link className="btn-editar-desafio" href="#">Editar</Card.Link>
        <Link to={`/desafio/${desafio._id}`} className="btn-ver-tareas">Ver tareas</Link>
      </Card.Body>
    </Card>
    </>
  );
}

export default DesafioPanelComponente;
