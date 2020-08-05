package vieira.gilvando.api.exceptions;

public class ClienteNaoEncontradoException extends Exception {

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    @Override
    public String getMessage() {
        return "Cliente não encontrado";
    }
}