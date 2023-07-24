import { useState } from "react";
import { Link } from 'react-router-dom';
import Accordion from "react-bootstrap/Accordion";
import "../css/PanelDesafioEstilos.css";

import { formatDeadline, getDaysRemaining, getMessage, formatDateForInput } from "../utils/utils";

// desafio panel puro sin editar 
function DesafioPanelComponente({ desafio }) {
  const { _id, title, deadline, members } = desafio;
  console.log(desafio)

  const formattedDeadline = formatDeadline(deadline);
  const daysRemaining = getDaysRemaining(deadline);
  const message = getMessage(daysRemaining);
  console.log(desafio.deadline)

  return (
    <Accordion defaultActiveKey="0" className="acordion">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="header-acordeon">
          {title} 
          <div className="iconos">
            {/* Iconos */}
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="body-acordeon">
            <div className="body-acordeon-izq">
              <p>Fecha de vencimiento: {desafio.deadline}</p>
              <p>{message}</p>
              <p>Equipo:</p>
              <ul className="list-unstyled">
                {members.map((member) => (
                  <li key={member._id}>
                    {member.username}  - {member.email}
                  </li>
                ))}
              </ul>
              <div className=" d-flex">
                <Link to={`/desafio/${desafio._id}`} className="btn-ver-tareas">Ver tareas</Link>
              </div>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default DesafioPanelComponente;
