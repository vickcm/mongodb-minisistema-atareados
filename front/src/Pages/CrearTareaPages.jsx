/* eslint-disable react/no-unescaped-entities */
import { Button } from 'bootstrap-4-react/lib/components';
import { Container } from 'bootstrap-4-react/lib/components/layout';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/FormDesafioStyle.css'

function TareasForm() {
  return (
    <>
   <Container className="container-desafio">
    <Form>
    <div className='titulo'>
      <h1>El titulo del desafio</h1>
      <p>Carga las tareas que consideres necesarias</p>
    </div>
    <Row className="mb-3 rowDesafio">
      <Form.Group as={Col} md="4"  controlId="titulo">
        <Form.Label>Titulo de la tarea</Form.Label>
        <Form.Control type="titulo" />
      </Form.Group>
     
      <Form.Group as={Col} md="4"  controlId="descripcion">
        <Form.Label>Describe la tarea</Form.Label>
        <Form.Control type="descripcion" />
      </Form.Group>
      <Form.Group as={Col} md="4"  controlId="puntos">
        <Form.Label>Asigna los puntos</Form.Label>
        <Form.Control type="puntos" />
      </Form.Group>
      <Form.Select aria-label="Default select example" className="form-select">
      <option>Selecciona el usuario</option>
      <option value="1">Juan</option>
      <option value="2">Jose</option>
      <option value="3">Joaquinlto</option>
    </Form.Select>

      </Row>
      <div className="aling-button-desafio">
    <Button href="/FormTareasList" className="btn-desfio">Añadir tarea</Button>
    </div>
    </Form>
   
    </Container>
    </>
  );
}



export default TareasForm;
