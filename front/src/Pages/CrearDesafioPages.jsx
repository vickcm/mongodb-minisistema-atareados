/* eslint-disable react/no-unescaped-entities */
import { Button } from 'bootstrap-4-react/lib/components';
import { Container } from 'bootstrap-4-react/lib/components/layout';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/FormDesafioStyle.css'

function FormDesafio() {
  return (
    <>
   <Container className="container-desafio">
    <Form>
    <div className='titulo'>
      <h1>Crea tu desafio</h1>
      <p>Carga los datos para crear el desafio</p>
    </div>
    <Row className="mb-3 rowDesafio">
      <Form.Group as={Col} md="4"  controlId="titulo">
        <Form.Label>Titulo del Desafio</Form.Label>
        <Form.Control type="titulo" />
      </Form.Group>
     
      <Form.Group as={Col} md="4"  controlId="equipo">
        <Form.Label>Equipo</Form.Label>
        <Form.Control type="equipo" />
      </Form.Group>

      <Form.Group as={Col} md="4"  controlId="date">
        <Form.Label>Fecha de vencimiento</Form.Label>
        <Form.Control type="date" />
      </Form.Group>

      </Row>
      <div className="aling-button-desafio">
    <Button href="/FormTareasList" className="btn-desfio">Crear las tareas</Button>
    </div>
    </Form>
   
    </Container>
    </>
  );
}



export default FormDesafio;
