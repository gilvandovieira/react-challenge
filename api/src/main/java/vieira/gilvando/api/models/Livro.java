package vieira.gilvando.api.models;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Data;

@Entity
@Data
public class Livro implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome, autor;

    @OneToMany(mappedBy = "livros")
    Set<Aluguel> alugueis = new HashSet<>();

    @OneToMany(mappedBy = "livros")
    Set<Reserva> reservados = new HashSet<>();

}