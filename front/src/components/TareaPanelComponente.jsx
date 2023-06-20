import React from 'react';
import { Accordion, Button } from 'react-bootstrap';

function TareaPanelComponente({ tarea }) {
  const { _id, title, description, responsible, points } = tarea;

  const handleEdit = () => {
    // Lógica para editar la tarea
  };

  const handleComplete = () => {
    // Lógica para marcar la tarea como completada
  };

  return (
    <Accordion defaultActiveKey="0" className="acordion">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="header-acordeon">
          {title}  
          <div className="iconos">
           
           
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="body-acordeon">
            <div className="body-acordeon-izq">
              <p>Titulo {tarea.title}</p>
              <p>Descripción {tarea.description}</p>
              <p>Responsable {tarea.responsible}</p>
              <p>Puntos {tarea.points}</p>
            </div>
            <div>
              <a variant="primary" onClick={handleEdit}>Editar</a>
            </div>
            <div>
              <a variant="success" onClick={handleComplete}>Completada</a>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default TareaPanelComponente;
