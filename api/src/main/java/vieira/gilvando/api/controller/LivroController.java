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

import vieira.gilvando.api.models.Livro;
import vieira.gilvando.api.repository.LivroRepository;

@RestController
@RequestMapping("/api/livros")
public class LivroController {

    @Autowired
    LivroRepository livroRepository;

    @GetMapping
    public ResponseEntity<Set<Livro>> pegaTodosLivros() {
        return ResponseEntity.ok(livroRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Livro> criaLivro(@RequestBody @Valid Livro livro) {

        livroRepository.save(livro);

        return new ResponseEntity<>(livro, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livro> pegaLivro(@PathVariable("id") Long id) {

        Optional<Livro> optlivro = livroRepository.findById(id);

        if (optlivro.isPresent()) {
            return ResponseEntity.ok(optlivro.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Livro> alteraLivro(@PathVariable("id") Long id, @RequestBody @Valid Livro livrobody) {
        Optional<Livro> optlivro = livroRepository.findById(id);

        if (optlivro.isPresent()) {
            Livro livro = optlivro.get();

            livro.setAutor(livrobody.getAutor());
            livro.setNome(livrobody.getNome());

            livroRepository.save(livro);

            return ResponseEntity.ok(livro);

        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletaLivro(@PathVariable("id") Long id) {
        Optional<Livro> opt = livroRepository.findById(id);
        if (opt.isPresent()) {
            livroRepository.delete(opt.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }

    }

}