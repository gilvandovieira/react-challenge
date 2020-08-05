package vieira.gilvando.api.repository;

import org.springframework.data.repository.CrudRepository;

import vieira.gilvando.api.models.Aluguel;

public interface AluguelRepository extends CrudRepository<Aluguel, Long> {

    Aluguel findByClienteId(Long cliente);

}