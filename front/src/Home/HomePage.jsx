import Card from 'react-bootstrap/Card';
import '../css/mainCss.css'

function Homepages() {
  return (
    <>
    <div>
      <h1 className='titulo-home'>ACA PONEMOS LOS DESAFIOS CREADOS POR EL USUARIO</h1>
    </div>

  
        <Card style={{ width: '18rem' }} className='card-home'>
          <Card.Body>
            <Card.Title>Desafio pachuli</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Desafio</Card.Subtitle>
            <Card.Text>
             Aca vemos los datos del desafio
            </Card.Text>
            <Card.Link className='link-home' href="#">Ver desafio</Card.Link>
            <Card.Link  className='link-home'href="#">Ver recompensa</Card.Link>
          </Card.Body>
        </Card>
        </>
  );
}

export default Homepages;