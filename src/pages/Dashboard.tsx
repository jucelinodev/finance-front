import React, { useState, useEffect } from 'react'

import api from '../services/api'
import formatValue from '../helpers/formatValues'

interface Transaction {
  id: string
  title: string
  value: number
  formattedValue: string
  formattedDate: string
  type: 'income' | 'outcome'
  category: { title: string }
  created_at: Date
}

interface Balance {
  income: string
  outcome: string
  total: string
}

const Dashboard: React.FC = () => {
  const [transaction, setTransaction] = useState<Transaction[]>([])
  const [balance, setBalance] = useState<Balance>({} as Balance)

  useEffect(() => {
    async function loadTransaction() {
      await getTransaction()
    }
    loadTransaction()
  }, [])

  const getTransaction = async () => {
    const response = await api.get('/transaction')
    const transactiosFormatted = response.data.transactions.map((transaction: Transaction) => ({
      ...transaction,
      formattedValue: formatValue(transaction.value),
      formattedDate: new Date(transaction.created_at).toLocaleDateString('pt-br')
    }))

    setTransaction(transactiosFormatted)

    const balanceFormatted = {
      income: formatValue(response.data.balance.income),
      outcome: formatValue(response.data.balance.outcome),
      total: formatValue(response.data.balance.total)
    }

    setBalance(balanceFormatted)
  }

  const onDelete = async (transaction: Transaction) => {
    try {
      if (window.confirm('Tem certeza que deseja apagar?')) {
        await api.delete(`/transaction/${transaction.id}`)
        await getTransaction()
      }
    } catch (error) {
      if (
        error.response.data.message ===
        'It is not possible to delete an entry greater than the total value'
      ) {
        return alert('Não é possivel apagar uma entrada mais que o saldo total!')
      }
      return alert('erro interno no servidor, tente novamente mais tarde')
    }
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-4 mb-2">
            <div className="card text-white border-success">
              <div className="card-body">
                <h5 className="card-title mt-1 text-success text-center">Entradas</h5>
                <h2 className="card-text text-success text-center mt-5 mb-5">{balance.income}</h2>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-2">
            <div className="card  border-danger">
              <div className="card-body">
                <h5 className="card-title mt-1 text-danger text-center">Saídas</h5>
                <h2 className="card-text text-danger text-center mt-5 mb-5">{balance.outcome}</h2>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-2">
            <div className="card text-white border-info">
              <div className="card-body">
                <h5 className="card-title mt-1 text-info text-center">Total</h5>
                <h2 className="card-text  text-info text-center mt-5 mb-5">{balance.total}</h2>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-hover table-responsive-md text-nowrap my-5">
          <thead className="thead-dark">
            <tr>
              <th></th>
              <th scope="col">Titulo</th>
              <th scope="col">Preço</th>
              <th scope="col">Categoria</th>
              <th scope="col">Data</th>
              <th scope="col">Opções</th>
            </tr>
          </thead>
          <tbody>
            {transaction.map(transaction => (
              <tr key={transaction.id}>
                <th></th>
                <td className="title">{transaction.title}</td>
                <td className={transaction.type}>
                  {transaction.type === 'outcome' && '- '}
                  {transaction.formattedValue}
                </td>
                <td>{transaction.category.title}</td>
                <td>{transaction.formattedDate}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => onDelete(transaction)}>
                    Apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Dashboard
