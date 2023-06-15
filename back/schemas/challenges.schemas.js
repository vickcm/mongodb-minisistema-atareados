import * as yup from 'yup';

const challengeSchema = yup.object().shape({
    title: yup.string().required('El título del desafío es obligatorio'),
    deadline: yup
      .date()
      .min(new Date(), 'La fecha de vencimiento debe ser posterior a la fecha actual')
      .required('La fecha de vencimiento es obligatoria'),
    members: yup
      .array()
      .of(yup.string().email('Ingrese una dirección de correo electrónico válida'))
      .required('Debe ingresar al menos un miembro')
  });

export {challengeSchema};


