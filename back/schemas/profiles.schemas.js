import yup from 'yup';

// Schema para validar datos del perfil 
// necesitamos agregar el user_id validado, para poder obtener el perfil del usuario que ingresó. 

const profileSchema = yup.object({
    name: yup.string().required(),
    age: yup.number().integer().min(6).required(),
    location: yup.string().required()
})



export { profileSchema };

