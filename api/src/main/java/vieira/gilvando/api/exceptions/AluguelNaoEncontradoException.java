package vieira.gilvando.api.exceptions;

public class AluguelNaoEncontradoException extends Exception {

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    @Override
    public String getMessage() {
        return "Nenhum aluguel em aberto.";
    }

}