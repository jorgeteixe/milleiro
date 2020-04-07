package es.jorgeteixeira.milleiro.lists;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;

import es.jorgeteixeira.milleiro.R;
import es.jorgeteixeira.milleiro.model.Traza;

public class TrazaAdapter extends ArrayAdapter {

    private Context context;
    private List<Traza> trazas;
    SimpleDateFormat sdf;

    public TrazaAdapter(@NonNull Context context, @NonNull List<Traza> objects) {
        super(context, 0, objects);
        this.context = context;
        this.trazas = objects;
        this.sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm");
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        View listItem = convertView;
        if(listItem == null)
            listItem = LayoutInflater.from(context).inflate(R.layout.traza_list,parent,false);
        if(position == 0) {
            ((ImageView)listItem.findViewById(R.id.imgLeft)).setImageDrawable(context.getResources().getDrawable(R.drawable.first_image));
        } else if (position == trazas.size() - 1) {
            ((ImageView)listItem.findViewById(R.id.imgLeft)).setImageDrawable(context.getResources().getDrawable(R.drawable.last_image));
        }

        Traza traza = trazas.get(position);

        ((TextView)listItem.findViewById(R.id.tvTraza)).setText(traza.getNome());
        ((TextView)listItem.findViewById(R.id.tvLocalizacion)).setText(traza.getLocalizacion());
        ((TextView)listItem.findViewById(R.id.tvData)).setText(sdf.format(traza.getData()));

        return listItem;
    }

}
