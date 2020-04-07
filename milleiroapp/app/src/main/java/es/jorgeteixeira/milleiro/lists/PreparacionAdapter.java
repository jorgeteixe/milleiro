package es.jorgeteixeira.milleiro.lists;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.List;

import es.jorgeteixeira.milleiro.R;
import es.jorgeteixeira.milleiro.model.Preparacion;

public class PreparacionAdapter extends ArrayAdapter {
    private Context context;
    private List<Preparacion> preparaciones;

    public PreparacionAdapter(@NonNull Context context, @NonNull List<Preparacion> objects) {
        super(context, 0, objects);
        this.context = context;
        this.preparaciones = objects;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        View listItem;
        Preparacion prep = preparaciones.get(position);
        if (position % 2 == 0) {
            listItem = LayoutInflater.from(context).inflate(R.layout.preparacion_list_0,parent,false);
            ((TextView) listItem.findViewById(R.id.tvNumero0)).setText(Integer.toString(prep.getNumero()));
            ((TextView) listItem.findViewById(R.id.tvTexto0)).setText(prep.getTexto());
        } else {
            listItem = LayoutInflater.from(context).inflate(R.layout.preparacion_list_1,parent,false);
            ((TextView) listItem.findViewById(R.id.tvNumero1)).setText(Integer.toString(prep.getNumero()));
            ((TextView) listItem.findViewById(R.id.tvTexto1)).setText(prep.getTexto());
        }
        return listItem;
    }
}
