import React from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'

import api from '../services/api'
import validationSchema from '../validations/newTransactionValidationSchema'

const NewTransaction: React.FC = () => {
  const initialValues = {
    title: '',
    value: '',
    type: '',
    category: ''
  }

  let history = useHistory()

  const onSubmit = async (values: any) => {
    if (values.type === 'Entrada') values.type = 'income'
    if (values.type === 'Saida') values.type = 'outcome'

    try {
      await api.post('/transaction', values)
      history.push('/')
    } catch (error) {
      if (error.response.data.message === 'You do not have enough balance') {
        return alert('Você não tem saldo suficiente')
      }

      return alert('Erro interno no Servidor, tente novamente mais tarde')
    }
  }

  const formik = useFormik({ initialValues, onSubmit, validationSchema })

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2 py-1">
            <form className="card card-body" onSubmit={formik.handleSubmit}>
              <h1 className=" card-title text-center  mt-5">Nova Transação</h1>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="title">Titulo</label>
                  <input
                    className="form-control"
                    type="text"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <p className="text-danger">{formik.errors.title}</p>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="value">Valor</label>
                  <input
                    className="form-control"
                    autoComplete="off"
                    type="number"
                    min="1"
                    step="any"
                    name="value"
                    value={formik.values.value}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.value && formik.errors.value ? (
                    <p className="text-danger">{formik.errors.value}</p>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="type">Tipo</label>
                  <select
                    className="form-control"
                    name="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                  >
                    <option></option>
                    <option>Entrada</option>
                    <option>Saida</option>
                  </select>
                  {formik.touched.type && formik.errors.type ? (
                    <p className="text-danger">{formik.errors.type}</p>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="category">Categoria</label>
                  <input
                    className="form-control"
                    type="text"
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.category && formik.errors.category ? (
                    <p className="text-danger">{formik.errors.category}</p>
                  ) : null}
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary btn-block" type="submit">
                    Enviar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewTransaction
