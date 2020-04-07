package es.jorgeteixeira.milleiro.model;

import java.io.Serializable;
import java.util.Date;

public class Traza  implements Serializable {
    private int numero;
    private String nome;
    private Date data;
    private String localizacion;
    private float latitude;
    private float lonxitude;

    public Traza() {
    }

    public Traza(int numero, String nome, Date data, String localizacion, float latitude, float lonxitude) {
        this.numero = numero;
        this.nome = nome;
        this.data = data;
        this.localizacion = localizacion;
        this.latitude = latitude;
        this.lonxitude = lonxitude;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public String getLocalizacion() {
        return localizacion;
    }

    public void setLocalizacion(String localizacion) {
        this.localizacion = localizacion;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public float getLonxitude() {
        return lonxitude;
    }

    public void setLonxitude(float lonxitude) {
        this.lonxitude = lonxitude;
    }

}
