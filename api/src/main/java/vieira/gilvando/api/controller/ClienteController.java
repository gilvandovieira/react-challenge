package vieira.gilvando.api.controller;

import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vieira.gilvando.api.models.Cliente;
import vieira.gilvando.api.repository.ClienteRepository;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    ClienteRepository clienteRepository;

    @GetMapping
    ResponseEntity<Set<Cliente>> retornaTodosClientes() {

        return ResponseEntity.ok(clienteRepository.findAll());
    }

    @PostMapping
    ResponseEntity<Cliente> criaCliente(@RequestBody @Valid Cliente cliente) {

        clienteRepository.save(cliente);

        return new ResponseEntity<Cliente>(cliente, HttpStatus.CREATED);

    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Cliente> retornaCliente(@PathVariable("id") Long id) {

        Optional<Cliente> optcliente = clienteRepository.findById(id);
        if (optcliente.isPresent()) {
            return ResponseEntity.ok(optcliente.get());
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Cliente> atualizaCliente(@PathVariable("id") Long id, @RequestBody @Valid Cliente cliente) {

        Optional<Cliente> optcliente = clienteRepository.findById(id);
        if (optcliente.isPresent()) {
            Cliente c = optcliente.get();
            c.setNome(cliente.getNome());
            clienteRepository.save(c);
            return ResponseEntity.ok(c);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deletaCliente(@PathVariable("id") Long id) {
        Optional<Cliente> optcliente = clienteRepository.findById(id);
        if (optcliente.isPresent()) {
            try {
                clienteRepository.delete(optcliente.get());
            } catch (Exception e) {
                return ResponseEntity.badRequest().body("Cliente possui aluguéis pendentes.");
            }
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}