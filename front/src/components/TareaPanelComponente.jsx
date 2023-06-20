import React from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { useState } from 'react';
import '../css/TareaPanelComponente.css';

function TareaPanelComponente({ tarea }) {

  const [isCompleted, setIsCompleted] = useState(false);

  const { _id, title, description, responsible, points } = tarea;

  const handleEdit = () => {
    // Lógica para editar la tarea
  };

  const handleComplete = () => {
    console.log('Tarea completada:', _id);
    setIsCompleted(true);
  };

  return (
    <Accordion defaultActiveKey="0" className="acordion">
      <Accordion.Item eventKey="0">
        <Accordion.Header >
          {title}  
          <div className="iconos">
           
           
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="body-acordeon">
            <div className="body-acordeon-izq">
              <p className={`header-acordeon ${isCompleted ? 'completed' : ''}`}>Titulo {tarea.title}</p>
              <p>Descripción {tarea.description}</p>
              <p>Responsable {tarea.responsible}</p>
              <p>Puntos {tarea.points}</p>
            </div>
            <div>
              <a variant="primary" onClick={handleEdit}>Editar</a>
            </div>
            <div>
              <a onClick={handleComplete}>Completada</a>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default TareaPanelComponente;
