package es.jorgeteixeira.milleiro.model;

import java.io.Serializable;
import java.util.List;

public class Produto  implements Serializable {
    private String nome;
    private String descricion;
    private List<Preparacion> preparacion;
    private List<Ingredente> ingredentes;
    private List<Traza> trazas;

    public Produto() {
    }

    public Produto(String nome, String descricion, List<Preparacion> preparacion, List<Ingredente> ingredentes, List<Traza> trazas) {
        this.nome = nome;
        this.descricion = descricion;
        this.preparacion = preparacion;
        this.ingredentes = ingredentes;
        this.trazas = trazas;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricion() {
        return descricion;
    }

    public void setDescricion(String descricion) {
        this.descricion = descricion;
    }

    public List<Preparacion> getPreparacion() {
        return preparacion;
    }

    public void setPreparacion(List<Preparacion> preparacion) {
        this.preparacion = preparacion;
    }

    public List<Ingredente> getIngredentes() {
        return ingredentes;
    }

    public void setIngredentes(List<Ingredente> ingredentes) {
        this.ingredentes = ingredentes;
    }

    public List<Traza> getTrazas() {
        return trazas;
    }

    public void setTrazas(List<Traza> trazas) {
        this.trazas = trazas;
    }
}
