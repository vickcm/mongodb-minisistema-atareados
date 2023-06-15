import "../css/mainCss.css";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import ImageHome from "../imagenes/Home.png";
import { Link } from "react-router-dom";
import "../css/HomeEstilos.css";

function Homepages() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="img-home">
              <Image src={ImageHome} className="image" />
            </div>
          </Col>
          <div className="aling-button">
            <button className="btn-home">
              {" "}
              <Link to="/panel" className="btn">
                Ver Panel
              </Link>
            </button>
          </div>
          <div className="aling-a">
            <Link to="/desafio" className="btn">
              ¿Quieres crear un desafio?{" "}
            </Link>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Homepages;
