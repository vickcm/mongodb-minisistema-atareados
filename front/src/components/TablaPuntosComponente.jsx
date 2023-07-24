import { useEffect, useState, useMemo } from "react";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import winner from "../imagenes/trofeo.png";
import { useParams } from "react-router-dom";
import desafioService from "../service/desafio.service.js";
import { motion } from "framer-motion";

function TablaPuntos() {
  const { idDesafio } = useParams();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchPoints = async () => {
      console.log("Obteniendo puntos...");
      console.log("idDesafio:", idDesafio);
      try {
        const response = await desafioService.getPoints(idDesafio);
        console.log(response);
        const updatedMembers = response.map((item, index) => ({
          _id: index + 1,
          username: item.username,
          points: item.points
        }));
        setMembers(updatedMembers);
      } catch (error) {
        console.error("Error al obtener los puntos:", error);
      }
    };

    fetchPoints();
  }, [idDesafio]);

  // Función para ordenar los miembros por puntaje de mayor a menor
  const sortMembers = (members) => {
    return [...members].sort((a, b) => b.points - a.points);
  };

  const sortedMembers = useMemo(() => sortMembers(members), [members]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Responsable</th>
          <th>Puntos</th>
        </tr>
      </thead>
      <tbody>
        {sortedMembers.map((member, index) => (
          <motion.tr
            key={member._id}
            initial={{ backgroundColor: "transparent" }}
            animate={{
              backgroundColor: index === 0 ? "#FFD700" : "transparent",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              fontSize: index === 0 ? "1.1em" : "1em", // Aumenta el tamaño de fuente para el ganador
              fontWeight: index === 0 ? "bold" : "normal", // Pone en negrita al ganador
            }}
          >
            <td>
              {index === 0 ? (
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: 100 }} // Desplazamiento de la copa solo para el ganador
                  transition={{ duration: 0.5 }}
                >
                  <Image src={winner} alt="Copa" />
                </motion.div>
              ) : (
                index + 1
              )}
            </td>
            <td>{member.username}</td>
            <td>{member.points}</td>
          </motion.tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TablaPuntos;
