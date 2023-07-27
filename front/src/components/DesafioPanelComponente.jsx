import { useState } from "react";
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import "../css/PanelDesafioEstilos.css";

import { formatDeadline, getDaysRemaining, getMessage, formatDateForInput } from "../utils/utils";

// desafio panel puro sin editar 
function DesafioPanelComponente({ desafio }) {
  const { _id, title, deadline, members } = desafio;
  //console.log(desafio)
  const formattedDeadline = formatDeadline(deadline);
  const daysRemaining = getDaysRemaining(deadline);
  const message = getMessage(daysRemaining);
  //console.log(desafio.deadline)

  return (
    <Table striped bordered hover className="table-desafios mt-3">
      <thead>
        <tr>
          <th>Desafíos</th>
          <th>Fecha de Vencimiento</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td> {title} </td>
          <td> {desafio.deadline} </td>
          <td><Link to={`/desafio/${desafio._id}`} className="btn-ver-tareas">Ver tareas</Link></td>
        </tr>
      </tbody>
    </Table>
  );
}

export default DesafioPanelComponente;