import Accordion from "react-bootstrap/Accordion";
import "../css/PanelDesafioEstilos.css";

function DesafioPanelComponente ({desafio}){
  const { _id, title, deadline, members } = desafio;


  return (
    <Accordion defaultActiveKey="0" className="acordion">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="header-acordeon">
          {title}
          <div className="iconos">
            {/* Iconos */}
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="body-acordeon">
            <div className="body-acordeon-izq">
              <p>Fecha de vencimiento: {deadline}</p>
              <p>Asignado a:</p>
              <ul>
                {members.map((member) => (
                  <li key={member._id}>
                    {member.username} ({member.age} años) - {member.email}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}


export default DesafioPanelComponente;