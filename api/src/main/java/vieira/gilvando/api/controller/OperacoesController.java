package vieira.gilvando.api.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vieira.gilvando.api.exceptions.AluguelNaoEncontradoException;
import vieira.gilvando.api.exceptions.ClienteNaoEncontradoException;
import vieira.gilvando.api.exceptions.LivrosNaoEncontradosException;
import vieira.gilvando.api.exceptions.NovoAluguelSemLivrosException;
import vieira.gilvando.api.exceptions.ReservaNaoEncontradaException;
import vieira.gilvando.api.repository.AluguelRepository;
import vieira.gilvando.api.repository.ReservaRepository;
import vieira.gilvando.api.services.OperacoesService;

@RestController
@RequestMapping("/api/operacoes")
public class OperacoesController {

    @Autowired
    OperacoesService operacoesService;

    @Autowired
    ReservaRepository reservaRepository;

    @Autowired
    AluguelRepository aluguelRepository;

    @GetMapping("/reservas")
    public ResponseEntity<?> reservas() {
        return ResponseEntity.ok(reservaRepository.findAll());
    }

    @PostMapping("/reservar")
    public ResponseEntity<?> reservar(@RequestBody @Valid ReservaDto dto) {

        try {
            operacoesService.reservarLivros(dto.getLivro(), dto.getCliente());
        } catch (ClienteNaoEncontradoException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (LivrosNaoEncontradosException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/cancelar")
    public ResponseEntity<?> cancelar(@RequestBody @Valid CancelamentoDto cancelamento) {

        try {
            operacoesService.cancelarReserva(cancelamento.getReserva());
        } catch (ReservaNaoEncontradaException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().build();

    }

    @GetMapping("/alugueis")
    public ResponseEntity<?> alugueis() {

        return ResponseEntity.ok(aluguelRepository.findAll());
    }

    @PostMapping("/alugar")
    public ResponseEntity<?> alugar(@RequestBody @Valid AluguelDto dto) {
        try {
            operacoesService.alugarLivros(dto.getLivro(), dto.getCliente());
        } catch (ClienteNaoEncontradoException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (NovoAluguelSemLivrosException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok().build();
    }

    @PostMapping("/devolver")
    public ResponseEntity<?> devolver(@RequestBody @Valid DevolucaoDto dto) {

        try {
            operacoesService.devolverLivros(dto.getDevolucao());
        } catch (ClienteNaoEncontradoException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (AluguelNaoEncontradoException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().build();
    }

}