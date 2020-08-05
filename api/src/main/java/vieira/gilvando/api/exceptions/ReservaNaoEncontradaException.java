package vieira.gilvando.api.exceptions;

public class ReservaNaoEncontradaException extends Exception {

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    @Override
    public String getMessage() {
        return "Reserva não encontrada";
    }
}