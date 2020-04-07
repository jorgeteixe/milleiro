package com.github.jorgeteixe.milleiro;

import androidx.appcompat.app.AppCompatActivity;
import androidx.preference.PreferenceManager;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
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

public class TrazaActivity extends AppCompatActivity {

    private String[] trazas;
    private int[] ids_trazas;

    SharedPreferences sharedPreferences;
    ListView list;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_traza);

        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        loadFromAPI();
        list = findViewById(R.id.listtraza);
        list.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent resultIntent = new Intent();
                resultIntent.putExtra("traza_id", ids_trazas[position]);
                setResult(Activity.RESULT_OK, resultIntent);
                finish();
            }
        });

    }

    private void loadFromAPI() {
        RequestQueue queue = Volley.newRequestQueue(this);
        String urlProd ="https://api-android1.jorgeteixeira.es/produto/"+ sharedPreferences.getInt("prod_id", -1) +"/trazas";
        // Request a string response from the provided URL.
        StringRequest stringRequest = new StringRequest(Request.Method.GET, urlProd,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONArray res = new JSONArray(response);
                            trazas = new String[res.length()];
                            ids_trazas = new int[res.length()];
                            for (int i = 0; i < res.length(); i++) {
                                JSONObject p =(JSONObject) res.get(i);
                                trazas[i] = p.getInt("numero") + "- " + p.getString("nome");
                                ids_trazas[i] = p.getInt("id");
                            }
                            list.setAdapter(new ArrayAdapter<String>(TrazaActivity.this, android.R.layout.simple_list_item_1, trazas));
                        } catch (JSONException e) {
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                System.out.println("Error");
            }
        });
        queue.add(stringRequest);
        queue.start();

    }
}
