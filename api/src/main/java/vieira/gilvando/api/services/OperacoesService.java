package vieira.gilvando.api.services;

import java.time.LocalDateTime;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vieira.gilvando.api.exceptions.AluguelNaoEncontradoException;
import vieira.gilvando.api.exceptions.ClienteNaoEncontradoException;
import vieira.gilvando.api.exceptions.LivrosNaoEncontradosException;
import vieira.gilvando.api.exceptions.NovoAluguelSemLivrosException;
import vieira.gilvando.api.exceptions.ReservaNaoEncontradaException;
import vieira.gilvando.api.models.Aluguel;
import vieira.gilvando.api.models.Cliente;
import vieira.gilvando.api.models.Livro;
import vieira.gilvando.api.models.Reserva;
import vieira.gilvando.api.repository.AluguelRepository;
import vieira.gilvando.api.repository.ClienteRepository;
import vieira.gilvando.api.repository.LivroRepository;
import vieira.gilvando.api.repository.ReservaRepository;

@Service
public class OperacoesService {

    @Autowired
    AluguelRepository aluguelRepository;

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    LivroRepository livroRepository;

    @Autowired
    ReservaRepository reservaRepository;

    @Transactional
    public void reservarLivros(Long livro_id, Long cliente_id)
            throws ClienteNaoEncontradoException, LivrosNaoEncontradosException {

        Optional<Cliente> optcliente = clienteRepository.findById(cliente_id);
        if (optcliente.isPresent()) {
            Cliente cliente = optcliente.get();

            Optional<Livro> livro = livroRepository.findById(livro_id);
            if (livro == null || livro.isEmpty()) {
                throw new LivrosNaoEncontradosException();
            }

            Reserva reserva = new Reserva();
            reserva.setCliente(cliente);
            reserva.setLivro(livro.get());
            reserva.setDataInicio(LocalDateTime.now());
            reserva.setDataFim(LocalDateTime.now().plusDays(3));
            reservaRepository.save(reserva);
        } else {
            throw new ClienteNaoEncontradoException();
        }
    }

    @Transactional
    public void cancelarReserva(Long reserva_id) throws ReservaNaoEncontradaException {

        Optional<Reserva> optreserva = reservaRepository.findById(reserva_id);
        if (optreserva.isPresent()) {
            reservaRepository.delete(optreserva.get());
        } else {
            throw new ReservaNaoEncontradaException();
        }
    }

    @Transactional
    public void alugarLivros(Long livro_id, Long cliente_id)
            throws ClienteNaoEncontradoException, NovoAluguelSemLivrosException {

        if (livro_id == null || livro_id == 0) {
            throw new NovoAluguelSemLivrosException();
        }

        Optional<Cliente> optcliente = clienteRepository.findById(cliente_id);

        if (optcliente.isPresent()) {
            Cliente cliente = optcliente.get();
            Optional<Livro> livroAAlugar = livroRepository.findById(livro_id);
            Aluguel aluguel = new Aluguel();
            aluguel.setCliente(cliente);
            aluguel.setLivro(livroAAlugar.get());
            aluguel.setDataInicio(LocalDateTime.now());
            aluguel.setDataFim(LocalDateTime.now().plusDays(5));
            aluguel.setPrice(2.0);
            aluguelRepository.save(aluguel);
        } else {
            throw new ClienteNaoEncontradoException();
        }
    }

    @Transactional
    public void devolverLivros(Long devolucao) throws ClienteNaoEncontradoException, AluguelNaoEncontradoException {

        Optional<Aluguel> aluguel = aluguelRepository.findById(devolucao);
        if (aluguel.isPresent()) {
            aluguelRepository.delete(aluguel.get());
        }
    }
}