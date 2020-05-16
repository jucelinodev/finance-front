import * as Yup from 'yup'

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Campo obrigatorio!')
    .min(3, 'Nome do titulo muito curto!')
    .max(30, 'Nome do titulo muito longo!'),
  value: Yup.number().required('Campo obrigatorio!'),
  type: Yup.string().required('Campo obrigatorio!'),
  category: Yup.string()
    .required('Campo obrigatorio!')
    .min(3, 'Nome da categoria muito curto!')
    .max(30, 'Nome da categoria muito longo!')
})

export default validationSchema
