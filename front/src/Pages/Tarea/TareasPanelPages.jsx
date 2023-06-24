import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDesafio } from '../../context/desafioContext';
import TareaListItem from '../../components/TareaItemListComponente';
import desafioService from '../../service/desafio.service';
import { formatDeadline } from '../../utils/utils';
import "../../css/Tarea.css";

function TareasPanel() {
  const [tareas, setTareas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const desafio = useDesafio();
  const id = desafio._id;

  useEffect(() => {
    setIsLoading(true);

    desafioService.getTasks(id)
      .then((tareas) => {
        setTareas(tareas);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar las tareas:', error);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <>
      <Container>
        <div className="titulo">
          <h1>Desafío: {desafio.title}</h1>
          <p>Fecha del vencimiento: {formatDeadline(desafio.deadline)}</p>
          <h2>Lista de Tareas</h2>
          <Link to={`/desafio/${desafio._id}/tareas/nueva`} className="btn-tareas">Crear Tareas</Link>
        </div>
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        ) : (
          <>
            {tareas.length === 0 ? (
              <><p className='p-none-tarea'>No hay tareas disponibles.</p></>
            ) : (
              <div className='tareas-list-cards'>
                {tareas.map((tarea) => (
                  <TareaListItem key={tarea._id} tarea={tarea}/>
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default TareasPanel;
