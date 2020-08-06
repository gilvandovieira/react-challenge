package vieira.gilvando.api.models;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    @JsonIgnore
    List<Aluguel> alugueis = new LinkedList<>();

    @OneToMany(mappedBy = "livros", cascade = CascadeType.REMOVE)
    @JsonIgnore
    List<Reserva> reservados = new LinkedList<>();

}