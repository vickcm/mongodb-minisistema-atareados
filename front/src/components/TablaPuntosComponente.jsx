import React, { useEffect, useState, useMemo, useCallback } from "react";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import winner from "../imagenes/trofeo.png";
import { useDesafio } from "../context/desafioContext";
import desafioService from "../service/desafio.service.js";

function TablaPuntos() {
  const desafio = useDesafio();
  const [members, setMembers] = useState([]);

  console.log("tabla de puntos:", desafio);

  const sortMembers = useCallback(() => {
    if (desafio) {
      // Ordenar los miembros según los puntos (de mayor a menor)
      const sortedMembers = [...desafio.members].sort((a, b) => b.points - a.points);
      setMembers(sortedMembers);
    }
  }, [desafio]);

  useEffect(() => {
    sortMembers();
  }, [desafio.members, sortMembers, desafio.tasks]);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const idDesafio = desafio.id; // Reemplaza 'id' con el nombre de la propiedad que contiene el ID del desafío en tu objeto desafio
        if (idDesafio) {
          const points = await desafioService.getPoints(idDesafio);
          console.log(points)
          // Actualizar los miembros con los datos de puntos
          setMembers(points);
        }
      } catch (error) {
        console.error("Error al obtener los puntos:", error);
      }
    };
    fetchPoints();
  }, [desafio.id]);

  const renderTable = useMemo(() => {
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
          {members.map((member, index) => (
            <tr key={member._id}>
              <td>
                {index === 0 ? (
                  <Image src={winner} alt="Copa" />
                ) : (
                  index + 1
                )}
              </td>
              <td>{member.username}</td>
              <td>{member.points}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }, [members]);

  return <div>{renderTable}</div>;
}

export default TablaPuntos;
