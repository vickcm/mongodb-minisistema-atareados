import * as yup from 'yup';

const profileSchema = yup.object().shape({
  username: yup.string().required('El nombre de usuario es obligatorio'),
  edad: yup.number().required('La edad es obligatoria').positive('La edad debe ser un número positivo'),
});

export default profileSchema;

