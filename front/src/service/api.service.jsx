async function call({ uri, method = 'GET', body = undefined }) {
    return fetch(`http://localhost:2023/api/${uri}`, {
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        method,
        body: JSON.stringify(body)
    })
        .then(async response => {
            if (response.ok) {
                return await response.json()
            }
            else {
                if (response.status === 401) {
                    localStorage.removeItem('token')

                    throw { error: { message: 'No autorizado' } }
                }

                throw await response.json()
            }
        })
}

export default {
    call
}