import Cliente from './Cliente'
import Livro from './Livro'

export default interface Aluguel {
    id: number | Number
    cliente: Cliente
    livro: Livro
    dataInicio: Date
    dataFim: Date
    price: number | Number
}