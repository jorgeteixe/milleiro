package com.github.jorgeteixe.milleiro;

import androidx.appcompat.app.AppCompatActivity;
import androidx.preference.PreferenceManager;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
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

public class MainActivity extends AppCompatActivity {

    Button btnConfig, btnEscanear;
    TextView etConfig;
    SharedPreferences sharedPreferences;
    int prod_id, traza_id;
    String token, loc;
    Float lat, lonx;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);

        etConfig = findViewById(R.id.txtConfig);

        loadConfig();

        btnConfig = findViewById(R.id.btnConfig);
        btnEscanear = findViewById(R.id.btnEscanear);

        btnConfig.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, ConfigActivity.class));
            }
        });

        btnEscanear.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (true) {
                    startActivity(new Intent(MainActivity.this, EscanerActivity.class));
                }
            }
        });
    }

    @SuppressLint("SetTextI18n")
    private void loadConfig() {
        prod_id = sharedPreferences.getInt("prod_id", -1);
        traza_id = sharedPreferences.getInt("traza_id", -1);
        token = sharedPreferences.getString("token", "");
        loc = sharedPreferences.getString("localizacion", "");
        lat = sharedPreferences.getFloat("latitude", -1f);
        lonx = sharedPreferences.getFloat("lonxitude", -1f);
        etConfig.setText("produto: " + prod_id + "\n" +
                "traza: " + traza_id + "\n" +
                "token: " + token + "\n" +
                "loc: " + loc + "\n" +
                "lat: " + lat + "\n" +
                "lonx: " + lonx);
    }

    @Override
    protected void onPostResume() {
        loadConfig();
        super.onPostResume();
    }
}
