package com.github.jorgeteixe.milleiro;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class ProdutoActivity extends AppCompatActivity {

    String[] produtos;
    int[] ids_produtos;

    ListView list;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_produto);
        list = findViewById(R.id.listprod);
        loadFromAPI();
        list.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent resultIntent = new Intent();
                resultIntent.putExtra("prod_id", ids_produtos[position]);
                setResult(Activity.RESULT_OK, resultIntent);
                finish();
            }
        });
    }

    private void loadFromAPI() {
        RequestQueue queue = Volley.newRequestQueue(this);
        String urlProd ="https://api-android1.jorgeteixeira.es/produtos";
        // Request a string response from the provided URL.
        StringRequest stringRequest = new StringRequest(Request.Method.GET, urlProd,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            JSONArray res = new JSONArray(response);
                            produtos = new String[res.length()];
                            ids_produtos = new int[res.length()];
                            for (int i = 0; i < res.length(); i++) {
                                JSONObject p =(JSONObject) res.get(i);
                                produtos[i] = p.getString("nome");
                                ids_produtos[i] = p.getInt("id");
                            }
                            list.setAdapter(new ArrayAdapter<String>(ProdutoActivity.this, android.R.layout.simple_list_item_1, produtos));
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
