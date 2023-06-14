export async function call({ uri, method = 'GET', body = undefined }) {
    return fetch(`http://localhost:2023/api/${uri}`, {
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      method,
      body: JSON.stringify(body)
    })
      .then(async response => {
        console.log(response); // Agregado para depuración
  
        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
          }
          const errorData = await response.json(); // Obtener el cuerpo de la respuesta como JSON
          throw errorData; // Lanzar el objeto errorData
        }
  
        const responseData = await response.json(); // Obtener el cuerpo de la respuesta como JSON
        return responseData; // Devolver el objeto responseData
      });
  }
  
  export default {
    call
  }
  