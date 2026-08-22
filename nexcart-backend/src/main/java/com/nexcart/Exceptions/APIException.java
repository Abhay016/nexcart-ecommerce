package com.nexcart.exceptions;

public class APIException extends RuntimeException {
    private int status;

    public APIException(String message, int status) {
        super(message);
        this.status = status;
    }

    public APIException(String message) {
        super(message);
    }

    public int getStatus() {
        return status;
    }
}
