import yup from 'yup';

// Schema para validar los datos de la cuenta
// email y password
// password: al menos 6 caracteres, una mayúscula, una minúscula y un número

const accountSchema = yup.object({
    email: yup.string().email().required(),
    password: yup
    .string()
    .min(6)
    .required()
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/,
        'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número'
      ),

})

export { accountSchema };

    