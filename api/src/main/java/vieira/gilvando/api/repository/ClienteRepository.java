package vieira.gilvando.api.repository;

import java.util.Set;

import org.springframework.data.repository.CrudRepository;

import vieira.gilvando.api.models.Cliente;

public interface ClienteRepository extends CrudRepository<Cliente, Long> {

    Set<Cliente> findAll();

}