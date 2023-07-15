import React, { useMemo } from "react";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import winner from "../imagenes/trofeo.png";
import { useDesafio } from "../context/desafioContext";

function TablaPuntos() {
  const desafio = useDesafio();
  console.log("desafio:", desafio);



  const members = useMemo(() => {
    if (desafio && Array.isArray(desafio.desafio.members)) {
      // Ordenar los miembros según los puntos (de mayor a menor)
      return [...desafio.desafio.members].sort((a, b) => b.points - a.points);
    }
    return [];
  }, [desafio]);
  return (
    <>
      <div style={{ borderTop: "1px dashed #4f70b675 ", marginLeft: 20, marginRight: 20, marginTop: 20 }}></div>
      <h1 className="titulo text-center mt-5">Tabla de Puntos</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Posición</th>
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
    </>
  );
}

export default TablaPuntos;
