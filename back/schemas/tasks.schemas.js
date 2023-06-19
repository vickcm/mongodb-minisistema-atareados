import yup from 'yup';

const taskSchema = yup.object().shape({
    title: yup.string().required('The task title is required'),
    description: yup.string().required('The task description is required'),
    responsible: yup.string().required('The task responsible is required'),
    points: yup
      .number()
      .integer('Los puntos deben ser un número entero')
      .min(1, 'Los puntos deben ser un número mayor a 0')
      .max(100, 'Los puntos no deben ser superior a 100')
      .required('El puntaje es requerido'),
  });

  
  export { taskSchema};
