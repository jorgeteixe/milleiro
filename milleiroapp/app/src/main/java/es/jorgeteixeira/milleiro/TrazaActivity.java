package es.jorgeteixeira.milleiro;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ListView;
import android.widget.TextView;

import es.jorgeteixeira.milleiro.lists.TrazaAdapter;
import es.jorgeteixeira.milleiro.model.Produto;

public class TrazaActivity extends AppCompatActivity {

    private Produto produto = null;
    private TextView tvNome, tvDesc;
    private ListView listView;
    private ImageButton btnBack;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_traza);
        Bundle data = getIntent().getExtras();
        if (!data.isEmpty()) {
            produto = (Produto) data.getSerializable("produto");
        } else {
            finish();
        }
        if (produto == null) {
            finish();
        }
        tvNome = findViewById(R.id.tvTraza);
        tvDesc = findViewById(R.id.tvDescricion);
        listView = findViewById(R.id.listView);
        btnBack = findViewById(R.id.btnBack);

        btnBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

        tvNome.setText(produto.getNome());
        tvDesc.setText(produto.getDescricion());
        listView.setDivider(null);
        listView.setDividerHeight(0);
        listView.setAdapter(new TrazaAdapter(this, produto.getTrazas()));}
}
