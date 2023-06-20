import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useDesafio } from '../context/desafioContext';
import TareaPanelComponente from '../components/TareaPanelComponente';
import desafioService from '../service/desafio.service';
import { formatDeadline } from '../utils/utils';

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
          <h2>Esto es el título del desafío: {desafio.title}</h2>
          <h2>Esto es la fecha del vencimiento: {formatDeadline(desafio.deadline)}</h2>
          <h2>Lista de Tareas</h2>
        </div>
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        ) : (
          <>
            {tareas.length === 0 ? (
              <><p>No hay tareas disponibles.</p><button>Agregar boton Crear Tareas </button></>

            ) : (
              tareas.map((tarea) => (
                <TareaPanelComponente key={tarea._id} tarea={tarea} />
              ))
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default TareasPanel;
