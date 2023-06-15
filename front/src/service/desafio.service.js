import API from './api.service'

async function createChallenge(challenge) {
    return API.call({ uri: 'desafio', method: 'POST', body: challenge })
}


export default {
    createChallenge
}