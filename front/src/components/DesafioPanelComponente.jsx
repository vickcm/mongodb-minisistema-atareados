import Accordion from "react-bootstrap/Accordion";
import "../css/PanelDesafioEstilos.css";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { formatDeadline, getDaysRemaining, getMessage } from "../utils/utils";

function DesafioPanelComponente({ desafio }) {
  const { _id, title, deadline, members } = desafio;
  const [editTitle, setEditTitle] = useState(desafio.title);
  const [editDeadline, setEditDeadline] = useState(desafio.deadline);

  const formattedDeadline = formatDeadline(deadline);
  const daysRemaining = getDaysRemaining(deadline);
  const message = getMessage(daysRemaining);

  return (
    <Accordion defaultActiveKey="0" className="acordion">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="header-acordeon">
          {title} {formattedDeadline}
          <div className="iconos">
            {/* Iconos */}
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="body-acordeon">
            <div className="body-acordeon-izq">
              <p>Fecha de vencimiento: {formattedDeadline}</p>
              <p>{message}</p>
              <p>Equipo:</p>
              <ul>
                {members.map((member) => (
                  <li key={member._id}>
                    {member.username} ({member.age} años) - {member.email}
                  </li>
                ))}
              </ul>

              <button>Editar</button>
              <Link to={`/desafio/${desafio._id}`}>Ver tareas</Link>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default DesafioPanelComponente;
