package es.jorgeteixeira.milleiro.model;

import java.io.Serializable;

public class Ingredente  implements Serializable {
    private String nome;
    private float cantidade;
    private String unidade;

    public Ingredente() {
    }

    public Ingredente(String nome, float cantidade, String unidade) {
        this.nome = nome;
        this.cantidade = cantidade;
        this.unidade = unidade;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public float getCantidade() {
        return cantidade;
    }

    public void setCantidade(float cantidade) {
        this.cantidade = cantidade;
    }

    public String getUnidade() {
        return unidade;
    }

    public void setUnidade(String unidade) {
        this.unidade = unidade;
    }
}
