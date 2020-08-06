import Livro from './Livro'
import Cliente from './Cliente'

export default interface Reserva {
    id: number | Number
    livro?: Livro
    reservante?: Cliente
    dataInicio: Date
    dataFim: Date
}