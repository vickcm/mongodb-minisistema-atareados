import { Container, Button } from "bootstrap-4-react";
import DesafioPanelComponente from "../Components/DesafioPanelComponente";
import "../css/PanelDesafioEstilos.css";
import { useProfile } from "../context/session.context";
import { useEffect, useState } from "react";
import desafioService from "../service/desafio.service.js";

function DesafioPanel() {
  const profile = useProfile();
  const [desafios, setDesafios] = useState([]);


  useEffect(() => {
    desafioService.getChallenges().then((desafios) => {
      setDesafios(desafios);
    });
  }, []);

  // Ordenar los desafíos del más próximo al más lejano
  const sortedDesafios = desafios.sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [desafiosPerPage] = useState(5);

  // Calcular el índice inicial y final de los desafíos a mostrar en la página actual
  const indexOfLastDesafio = currentPage * desafiosPerPage;
  const indexOfFirstDesafio = indexOfLastDesafio - desafiosPerPage;
  const currentDesafios = sortedDesafios.slice(indexOfFirstDesafio, indexOfLastDesafio);

  // Función para cambiar a la siguiente página
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  console.log(desafios)

  // Función para cambiar a la página anterior
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <Container>
      {currentDesafios.map((desafio) => (
        <DesafioPanelComponente key={desafio._id} desafio={desafio}  />
      ))}
      <div className="pagination">
        <Button disabled={currentPage === 1} onClick={prevPage}>
          Anterior
        </Button>
        <Button disabled={currentDesafios.length < desafiosPerPage} onClick={nextPage}>
          Siguiente
        </Button>
      </div>
    </Container>
  );
}

export default DesafioPanel;
