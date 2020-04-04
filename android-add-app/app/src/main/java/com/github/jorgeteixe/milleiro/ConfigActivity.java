package com.github.jorgeteixe.milleiro;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.preference.PreferenceManager;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class ConfigActivity extends AppCompatActivity {

    final int PEDIR_PRODUTO = 4123;
    final int PEDIR_TRAZA = 5342;

    SharedPreferences sharedPreferences;

    int prod_id = -1;
    int traza_id = -1;

    Button btnGuardar, btnProduto, btnTraza;
    EditText etToken, etLocalizacion, etLat, etLonx;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_config);

        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);

        btnGuardar = findViewById(R.id.btnGardar);
        btnProduto = findViewById(R.id.btnEscogerProd);
        btnTraza = findViewById(R.id.btnEscogerTraza);

        etToken = findViewById(R.id.etToken);
        etLocalizacion = findViewById(R.id.etLocalizacion);
        etLat = findViewById(R.id.etLatitude);
        etLonx = findViewById(R.id.etLonxitude);

        btnGuardar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(prod_id > -1 && traza_id > -1
                        && !etToken.getText().toString().isEmpty()
                        && !etLocalizacion.getText().toString().isEmpty()
                        && !etLat.getText().toString().isEmpty()
                        && !etLonx.getText().toString().isEmpty()) {
                    SharedPreferences.Editor editor = sharedPreferences.edit();
                    editor.putString("token", etToken.getText().toString());
                    editor.putString("localizacion", etLocalizacion.getText().toString());
                    editor.putFloat("latitude", Float.parseFloat(etLat.getText().toString()));
                    editor.putFloat("lonxitude", Float.parseFloat(etLonx.getText().toString()));
                    editor.commit();
                    finish();
                } else {
                    Toast.makeText(ConfigActivity.this, "Campos vacíos", Toast.LENGTH_SHORT).show();
                }
            }
        });

        btnProduto.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivityForResult(new Intent(ConfigActivity.this, ProdutoActivity.class), PEDIR_PRODUTO);
            }
        });

        btnTraza.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int getted = sharedPreferences.getInt("prod_id", -1);
                if(getted > -1) {
                    startActivityForResult(new Intent(ConfigActivity.this, TrazaActivity.class), PEDIR_TRAZA);
                } else {
                    Toast.makeText(ConfigActivity.this, "Escolle primeiro produto", Toast.LENGTH_SHORT).show();
                }
            }
        });

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        if (requestCode == PEDIR_PRODUTO) {
            if (resultCode == RESULT_OK) {
                prod_id = data.getExtras().getInt("prod_id");
                SharedPreferences.Editor editor = sharedPreferences.edit();
                editor.putInt("prod_id", prod_id);
                editor.commit();
            }
        }
        if (requestCode == PEDIR_TRAZA) {
            if (resultCode == RESULT_OK) {
                traza_id = data.getExtras().getInt("traza_id");
                SharedPreferences.Editor editor = sharedPreferences.edit();
                editor.putInt("traza_id", traza_id);
                editor.commit();
            }
        }
        super.onActivityResult(requestCode, resultCode, data);
    }
}
