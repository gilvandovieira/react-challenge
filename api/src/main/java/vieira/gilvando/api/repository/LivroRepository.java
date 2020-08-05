package vieira.gilvando.api.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import vieira.gilvando.api.models.Livro;

public interface LivroRepository extends CrudRepository<Livro, Long> {
    Set<Livro> findAll();

    Set<Livro> findAllById(Iterable<Long> ids);

    @Query(nativeQuery = true, value = "select * from livro l where l.id in (:ids)")
    Set<Livro> findAllById(@Param("ids") Set<Long> ids);
}