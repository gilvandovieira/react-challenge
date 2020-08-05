package vieira.gilvando.api.exceptions;

public class NovoAluguelSemLivrosException extends Exception {

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    @Override
    public String getMessage() {
        return "Impossível criar aluguel de livros sem livros para alugar.";
    }

}