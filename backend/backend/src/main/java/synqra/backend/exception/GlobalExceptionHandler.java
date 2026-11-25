
package synqra.backend.exception;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import java.util.stream.Collectors;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private ResponseEntity<ErrorResponse> buildResponse(
            HttpStatus status,
            String message,
            HttpServletRequest request) {

        ErrorResponse error = new ErrorResponse(
                LocalDateTime.now(),
                status.value(),
                message,
                request.getRequestURI()
        );

        return ResponseEntity.status(status).body(error);
    }

    // 404 - Resource not found
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
            ResourceNotFoundException ex,
            HttpServletRequest request) {

        return buildResponse(
                HttpStatus.NOT_FOUND,
                ex.getMessage(),
                request
        );
    }

    // 400 - Validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(
            MethodArgumentNotValidException ex,
            HttpServletRequest request) {

        String message = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error ->
                        error.getField() + ": " +
                        error.getDefaultMessage())
                .collect(Collectors.joining(", "));

        return buildResponse(
                HttpStatus.BAD_REQUEST,
                message,
                request
        );
    }

    // 400 - Database constraint violations
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDatabaseError(
            DataIntegrityViolationException ex,
            HttpServletRequest request) {

        return buildResponse(
                HttpStatus.BAD_REQUEST,
                "Invalid data. Check required fields or duplicate values.",
                request
        );
    }

    // Preserve explicitly assigned HTTP statuses
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorResponse> handleResponseStatus(
            ResponseStatusException ex,
            HttpServletRequest request) {

        HttpStatus status = HttpStatus.valueOf(
                ex.getStatusCode().value()
        );

        return buildResponse(
                status,
                ex.getReason() != null
                        ? ex.getReason()
                        : status.getReasonPhrase(),
                request
        );
    }

    // 500 - Unexpected errors
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralError(
            Exception ex,
            HttpServletRequest request) {

        ex.printStackTrace();

        return buildResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "An unexpected error occurred. Please try again later.",
                request
        );
    }

}
