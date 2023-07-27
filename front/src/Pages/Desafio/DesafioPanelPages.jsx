import { Container, Button } from "bootstrap-4-react";
import DesafioPanelComponente from "../../components/DesafioPanelComponente";
import "../../css/PanelDesafioEstilos.css";
import { useProfile } from "../../context/session.context";
import { useEffect, useState } from "react";
import desafioService from "../../service/desafio.service.js";
import Image from "react-bootstrap/Image";
import ImageArrowLeft from "../../imagenes/flecha-izquierda.png";
import ImageArrowRight from "../../imagenes/flecha-derecha.png";
import AlertaCrearPerfilComponente from "../../components/AlertaCrearPerfilComponente";

function DesafioPanel() {
  const profile = useProfile();
  const [desafios, setDesafios] = useState([]);
  const [showHistorial, setShowHistorial] = useState(false); // Estado para controlar si se muestra el historial de desafíos o los desafíos actuales

  useEffect(() => {
    desafioService.getChallenges().then((desafios) => {
      setDesafios(desafios);
    });
  }, []);

  console.log(desafios);
  // Obtener la fecha actual
  const fechaActual = new Date();

  // Filtrar y ordenar los desafíos con fechas posteriores o iguales a la fecha actual (desafíos actuales)
  const currentDesafios = desafios
    .filter((desafio) => new Date(desafio.deadline) >= fechaActual)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  // Filtrar y ordenar los desafíos con fechas anteriores a la fecha actual (desafíos vencidos)
  const historialDesafios = desafios
    .filter((desafio) => new Date(desafio.deadline) < fechaActual)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const [currentPage, setCurrentPage] = useState(1);
  const [desafiosPerPage] = useState(5);

  // Función para cambiar a la siguiente página
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Función para cambiar a la página anterior
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const toggleHistorial = () => {
    setShowHistorial(!showHistorial);
  };

  return (
    <>
      <AlertaCrearPerfilComponente />
      <div className="container">
        <div className="d-flex justify-content-between mt-4">
          <h1 className="titulo">Panel de Desafíos</h1>
          <button className="btn-ver-historial" onClick={toggleHistorial}>
            {showHistorial ? "Historial de Desafíos" : "Desafíos Actuales"}
          </button>
        </div>
        {showHistorial
          ? historialDesafios.map((desafio) => (<DesafioPanelComponente key={desafio._id} desafio={desafio} />))
          : currentDesafios.map((desafio) => (<DesafioPanelComponente key={desafio._id} desafio={desafio} />))
        }
      </div>
      <div className="pagination">
        <Button disabled={currentPage === 1} onClick={prevPage}>
          <Image src={ImageArrowLeft} />
        </Button>
        <Button disabled={currentDesafios.length < desafiosPerPage} onClick={nextPage}>
          <Image src={ImageArrowRight} />
        </Button>
      </div>
    </>
  );
}

export default DesafioPanel;