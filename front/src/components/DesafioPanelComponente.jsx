import Accordion from "react-bootstrap/Accordion";
import "../css/PanelDesafioEstilos.css";
import { useState } from "react";


function formatDeadline(date) {
  const formattedDate = new Date(date);
  const day = formattedDate.getDate().toString().padStart(2, "0");
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = formattedDate.getFullYear();
  return `${day}/${month}/${year}`;
}

function getDaysRemaining(deadline) {
  const now = new Date();
  const endDate = new Date(deadline);
  const timeDiff = endDate.getTime() - now.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysRemaining;
}

function getMessage(daysRemaining) {
  if (daysRemaining < 0) {
    return "El desafío ha finalizado. ¡Sé el próximo ganador!";
  } else if (daysRemaining === 0) {
    return "¡El desafío finaliza hoy! No pierdas más tiempo.";
  } else {
    return `Faltan ${daysRemaining} días para que finalice el desafío. ¡Tú puedes lograrlo!`;
  }
}

function DesafioPanelComponente ({desafio}){
  const { _id, title, deadline, members } = desafio;
  const [editTitle, setEditTitle] = useState(desafio.title);
  const [editDeadline, setEditDeadline] = useState(desafio.deadline);

/*   const handleTitleChange = (event) => {
    setEditTitle(event.target.value);
  };

  const handleDeadlineChange = (event) => {
    setEditDeadline(event.target.value);
  };
 */
  

  const formattedDeadline = formatDeadline(deadline);
  const daysRemaining = getDaysRemaining(deadline);
  const message = getMessage(daysRemaining);

  

 /*  
  const handleEdit = () => {
    // Realiza la edición del desafío utilizando los valores editables
    const editedDesafio = {
      ...desafio,
      title: editTitle,
      deadline: editDeadline,
    };

    // Lógica para guardar los cambios o enviar la solicitud de edición al servidor
    // ...
  }; */


  return (
    <Accordion defaultActiveKey="0" className="acordion">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="header-acordeon">
          {title}  {formattedDeadline}
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
              
              <button >Editar</button>

            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default DesafioPanelComponente;