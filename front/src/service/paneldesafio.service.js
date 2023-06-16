import API from './api.service'

//traigo todos los desafios generados por el admin
export async function getAll() {
    return API.call({ uri: 'challenge' })
}


//aca traigo uno puntual por id
export async function getById(idChallenge) {
    return API.call({ uri: `desafio/${idChallenge}` })
}

export default {
    getAll,
    getById
}