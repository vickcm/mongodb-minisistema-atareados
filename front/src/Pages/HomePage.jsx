import '../css/mainCss.css'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import ImageHome  from "../imagenes/Home.png"
import '../css/HomeEstilos.css'

function Homepages() {
  return (
    <>
    <Container>
      <Row>
        <Col>
          <div className="img-home">
            <Image src={ImageHome} className='image'/>
          </div>
        </Col>
        <div className="aling-button">
          <button className="btn-home">Ir a Panel</button>
        </div>
        <div className="aling-a">
          <a className="link-crear">¿Quieres crear un desafio?</a>
        </div>
      </Row>
    </Container>
    </>
  );
}

export default Homepages;