package es.jorgeteixeira.milleiro.model;

import java.io.Serializable;

public class Preparacion implements Serializable {
    private int numero;
    private String texto;

    public Preparacion() {
    }

    public Preparacion(int numero, String texto) {
        this.numero = numero;
        this.texto = texto;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }
}
