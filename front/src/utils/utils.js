// utils.js

function formatDeadline(date) {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, "0");
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = formattedDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
  function getDaysRemaining(deadline) {
    const now = new Date();
    const endDate = new Date(deadline);
    const timeDiff = endDate.getTime() - now.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysRemaining;
  }
  
  function getMessage(daysRemaining) {
    if (daysRemaining < 0) {
      return "El desafío ha finalizado. ¡Sé el próximo ganador!";
    } else if (daysRemaining === 0) {
      return "¡El desafío finaliza hoy! No pierdas más tiempo.";
    } else {
      return `Faltan ${daysRemaining} días para que finalice el desafío. ¡Tú puedes lograrlo!`;
    }
  }
  
  export { formatDeadline, getDaysRemaining, getMessage };
  