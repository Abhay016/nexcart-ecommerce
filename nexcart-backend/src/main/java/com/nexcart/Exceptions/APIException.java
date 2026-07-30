package com.nexcart.Exceptions;

public class APIException extends RuntimeException {
    private int status;

    public APIException(String message, int status) {
        super(message);
        this.status = status;
    }

    public int getStatus() {
        return status;
    }
}
