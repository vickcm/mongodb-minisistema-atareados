import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, Link} from 'react-router-dom';


function App(){
      
    const navigate = useNavigate()
    
    const onLogOut = () =>{
      fetch('http://locahost:2023/api/auth/logout', {
        method: 'POST',
        headers: {
          'auth-token': localStorage.getItem('token')
        }
        })
    
        localStorage.removeItem('token')
    
        navigate('/login', {replace: true})
    
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Atareados</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <li><Link href="/">Home </Link> </li>
                <li><Link href="/desafio">Desafio </Link> </li>
                <li><Link href="/recompesa">Recompensa </Link> </li>
                <li><Link href="/perfil">Perfil </Link> </li>
                <li><Link onClick={onLogOut}>Salir </Link> </li>
                </Nav>
    
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
    
    }
    

export default App;