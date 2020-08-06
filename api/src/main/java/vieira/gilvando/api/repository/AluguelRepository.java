package vieira.gilvando.api.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import vieira.gilvando.api.models.Aluguel;

public interface AluguelRepository extends CrudRepository<Aluguel, Long> {

    List<Aluguel> findByClienteId(Long cliente);

}