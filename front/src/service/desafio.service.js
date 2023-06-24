import API from './api.service'

async function createChallenge(challenge) {
    return API.call({ uri: 'desafios', method: 'POST', body: challenge })
}

async function getChallengesByUserId(id) {
    return API.call({ uri: 'desafios', method: 'POST', body: id })
}

async function getChallenges() {
    return API.call({ uri: 'desafios', method: 'GET' })
}

async function getChallengeById(desafioId) {

    return API.call({ uri: `desafios/${desafioId}` , method: 'GET' })

}

async function getTasks(id) {

    return API.call({ uri: `desafios/${id}/tareas` , method: 'GET' })

}

async function createTask(id,task) {
    return API.call({ uri: `desafios/${id}/tareas`, method: 'POST', body: task })
}

async function getTaskById(id,taskId) {
    return API.call({ uri: `desafios/${id}/tareas/${taskId}`, method: 'GET' })
}



export default {
    createChallenge,
    getChallengesByUserId,
    getChallenges, 
    getTasks, 
    getChallengeById,
    createTask, 
    getTaskById

}