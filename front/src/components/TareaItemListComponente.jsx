import React from 'react';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import '../css/TareaPanelComponente.css';

function TareaListItem({ tarea }) {

    const [isCompleted, setIsCompleted] = useState(false);

    const { _id, title, description, responsible, points } = tarea;

    const handleEdit = () => {
    // Lógica para editar la tarea
    };

    const handleComplete = () => {
        console.log('Tarea completada:', _id);
        setIsCompleted(true);
    };

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title className={`title-card ${isCompleted ? 'completed' : ''}`}>{tarea.title}</Card.Title>
                <Card.Text>
                    Descripción: {tarea.description}
                </Card.Text>
                <p>Responsable: {tarea.responsible}</p>
                <p>Puntos: {tarea.points}</p>
                <Card.Link href="#" onClick={handleEdit}>Editar</Card.Link>
                <Card.Link href="#" onClick={handleComplete}>Completada</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default TareaListItem;