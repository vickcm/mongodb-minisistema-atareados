
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import { useSession } from "../context/session.context";
import "../css/AlertaCrearPerfilComponente.css";

function AlertaCrearPerfilComponente() {
    const { profile } = useSession();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!profile.username) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [profile]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {profile.username ? (
                <p className='visually-hidden'>Ingresaste como {profile.username}</p>
            ) : (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear Perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='div-crear-perfil'>
                            <p>Por favor crea tu perfil para poder seguir navegando en Atareados</p>
                            <Link to={`/crearperfil`}>Crear Perfil</Link>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
}


export default AlertaCrearPerfilComponente;