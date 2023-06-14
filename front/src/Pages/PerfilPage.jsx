/* eslint-disable react/no-unescaped-entities */
import { Button } from 'bootstrap-4-react/lib/components';
import { Container } from 'bootstrap-4-react/lib/components/layout';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ImagePerfil from '../imagenes/perfil.jpg'
import '../css/PerfilEstilos.css'

function PerfilPage() {
  return (
    <>
    <Container className="container-perfil">
      <Form className='form-perfil'>
        <div className="img-perfil">
            <Image src={ImagePerfil} width='50%' rounded />
        </div>
        <Row className="mb-3 rowDesafio">
          <Form.Group as={Col} md="6"  controlId="titulo" className="label-perfil">
            <Form.Label className="nombre-perfil">Nombre</Form.Label>
            <Form.Control type="titulo" placeholder='Juan Jose' />
          </Form.Group>
        
          <Form.Group as={Col} md="6"  controlId="equipo" className="label-perfil">
            <Form.Label className="nombre-perfil">Usuario</Form.Label>
            <Form.Control type="equipo"  placeholder='juanjose2023' />
          </Form.Group>
          <Form.Group  className="label-perfil">
          <Form.Label className="nombre-perfil">Email</Form.Label>

          <Form.Control className='place-perfil' size="lg" type="text" placeholder="juajose@gmail.com" />
          </Form.Group>
          <Form.Group className="label-perfil">
          <Form.Label className="nombre-perfil">Edad</Form.Label>

          <Form.Control className='place-perfil' size="lg" type="text" placeholder="27 años" />
          </Form.Group>
        </Row>
        <div className="aling-button-desafio">
          <Button href="/FormTareasList" className="btn-desfio">Editar Perfil</Button>
        </div>
      </Form>
    </Container>
    </>
  );
}

export default PerfilPage;