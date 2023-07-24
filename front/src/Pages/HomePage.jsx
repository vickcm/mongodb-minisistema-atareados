import "../css/mainCss.css";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { motion } from "framer-motion"; // Importar motion desde Framer Motion
import Row from "react-bootstrap/Row";
import ImageHome from "../imagenes/Home.png";
import { Link } from "react-router-dom";
import AlertaCrearPerfilComponente from "../components/AlertaCrearPerfilComponente";
import "../css/HomeEstilos.css";

function Homepages() {
  return (
    <>
      <AlertaCrearPerfilComponente />
      <Container>
        <Row>
          <Col>
            {/* Utilizar motion.img en lugar de Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }} // Propiedades iniciales de la animación
              animate={{ opacity: 1, scale: 1 }} // Propiedades animadas
              transition={{ duration: 0.5 }} // Duración de la animación
              className="img-home"
            >
              <motion.img
                src={ImageHome}
                alt="Home"
                className="image"
              />
            </motion.div>
          </Col>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="aling-button"
          >
            {/* Utilizar motion.button en lugar de button */}
            <motion.button
              whileHover={{ scale: 1.1 }} // Animación al pasar el mouse sobre el botón
              className="btn-home"
            >
              {" "}
              <Link to="/paneldesafio" className="btn">
                Ver Panel
              </Link>
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="aling-a"
          >
            {/* Utilizar motion.a en lugar de Link */}
            <motion.a
              whileHover={{ scale: 1.1 }} // Animación al pasar el mouse sobre el enlace
              href="/desafio"
              className="btn"
            >
              ¿Quieres crear un desafío? Anímate a jugar
            </motion.a>
          </motion.div>
        </Row>
      </Container>
    </>
  );
}

export default Homepages;
