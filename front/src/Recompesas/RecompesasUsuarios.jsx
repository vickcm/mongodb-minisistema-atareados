/* eslint-disable react/no-unescaped-entities */
import { Button } from 'bootstrap-4-react/lib/components';
import { Container } from 'bootstrap-4-react/lib/components/layout';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function RecompesasUsuarios() {
  return (
    <>
   <Container>
      <div className='titulo'>
        <h2>Lista de Tareas</h2>
        <p>Asigna las tareas a los usuarios, arma tantas tareas como creas necesario</p>
      </div>
  
      
    <Form className='form_tareas_list'>
    <Row className="mb-3 ">
      <Form.Group as={Col} md="3"  controlId="">
        <Form.Control type="usuario" placeholder="usuario" className='form' />
      </Form.Group>
      <Form.Group as={Col} md="3"  controlId="">
        <Form.Control type="Tarea" placeholder="Tarea"  className='form'/>
      </Form.Group>
      <Form.Group as={Col} md="3"  controlId="">
      <Button primary className='button'>Agregar más tareas</Button>
      </Form.Group>
      </Row>
    </Form>
    <Button dark href="/RecompesasUsuarios">Crear Desafio</Button>
    </Container>
    </>
  );
}

export default RecompesasUsuarios;