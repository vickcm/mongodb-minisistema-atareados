import Table from 'react-bootstrap/Table';

function TablaPuntos() {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Responsable</th>
                    <th>Tarea</th>
                    <th>Puntos</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
            </tbody>
        </Table>
    );
}

export default TablaPuntos;