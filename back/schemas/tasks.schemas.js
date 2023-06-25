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


const updateTaskSchema = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
  responsible: yup.string(),
  points: yup
    .number()
    .integer('Points must be an integer')
    .min(1, 'Points must be greater than 0')
    .max(100, 'Points must not exceed 100'),
  isComplete: yup.boolean().default(false),

});




  
export { taskSchema, updateTaskSchema };
