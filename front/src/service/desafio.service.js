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

async function updateTask(id,taskId,task) {
    return API.call({ uri: `desafios/${id}/tareas/${taskId}`, method: 'PATCH', body: task })
}

async function getPoints(id) {
    return API.call({ uri: `desafios/${id}/puntos`, method: 'GET' })
}

async function getSuggestedTask() {
    return API.call({ uri: `sugerenciatareas`, method: 'GET' })
}

async function updateChallenge(id,challenge) {
    return API.call({ uri: `desafios/${id}`, method: 'PATCH', body: challenge })
}







export default {
    createChallenge,
    getChallengesByUserId,
    getChallenges, 
    getTasks, 
    getChallengeById,
    createTask, 
    getTaskById, 
    updateTask, 
    getPoints,
    getSuggestedTask,
    updateChallenge,

}