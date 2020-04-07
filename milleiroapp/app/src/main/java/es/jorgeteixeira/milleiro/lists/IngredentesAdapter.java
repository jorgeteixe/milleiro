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
import es.jorgeteixeira.milleiro.model.Ingredente;

public class IngredentesAdapter extends ArrayAdapter {

    private Context context;
    private List<Ingredente> ingredentes;
    private float maxCant = 0f;

    public IngredentesAdapter(@NonNull Context context, @NonNull List<Ingredente> objects) {
        super(context, 0, objects);
        this.context = context;
        this.ingredentes = objects;
        for (Ingredente i : this.ingredentes) {
            if (i.getCantidade() > this.maxCant) this.maxCant = i.getCantidade();
        }
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        View listItem = convertView;
        if(listItem == null)
            listItem = LayoutInflater.from(context).inflate(R.layout.ingredentes_list,parent,false);

        Ingredente ingredente = ingredentes.get(position);
        ((TextView)listItem.findViewById(R.id.tvTraza)).setText(ingredente.getNome());
        ((TextView)listItem.findViewById(R.id.tvCantUnid)).setText(ingredente.getCantidade() + " " + ingredente.getUnidade());
        listItem.findViewById(R.id.cantView).getLayoutParams().width = Math.round(ingredente.getCantidade() / maxCant * context.getResources().getDimension(R.dimen.ingredentes_max_width));

        return listItem;
    }
}
