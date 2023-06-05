/* eslint-disable react/no-unescaped-entities */
import { Button } from 'bootstrap-4-react/lib/components';
import { Container } from 'bootstrap-4-react/lib/components/layout';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './FormDesafioStyle.css'

function FormDesafio() {
  return (
    <>
   <Container>
   <div className='titulo'>
      <h1>Carga los usuarios</h1>
      <p>Para crear el listado de "atareados" carga primero los usuarios</p>
    </div>
    <Form>
    <Row className="mb-3">
      <Form.Group as={Col} md="6"  controlId="formGroupEmail">
        <Form.Label>Usuario</Form.Label>
        <Form.Control type="usuario" placeholder="usuario" />
      </Form.Group>
      <Form.Group as={Col} md="6"  controlId="formGroupPassword">
        <Form.Label>Mail</Form.Label>
        <Form.Control type="mail" placeholder="mail" />
      </Form.Group>
      <Form.Group as={Col} md="6"  controlId="formGroupEmail">
        <Form.Label>Usuario</Form.Label>
        <Form.Control type="usuario" placeholder="usuario" />
      </Form.Group>
      <Form.Group as={Col} md="6"  controlId="formGroupPassword">
        <Form.Label>Mail</Form.Label>
        <Form.Control type="mail" placeholder="mail" />
      </Form.Group>
      </Row>
      <Button >Agregar otro usuario</Button>
    </Form>
    <Button dark href="/FormTareasList">Crear Equipos</Button>
    </Container>
    </>
  );
}



export default FormDesafio;
