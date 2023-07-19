import React, { useEffect, useState, useMemo } from "react";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import winner from "../imagenes/trofeo.png";
import { useParams } from "react-router-dom";
import desafioService from "../service/desafio.service.js";

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
