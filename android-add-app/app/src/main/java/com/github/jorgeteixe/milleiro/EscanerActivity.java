package com.github.jorgeteixe.milleiro;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.preference.PreferenceManager;

import android.Manifest;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Vibrator;
import android.util.Log;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.zxing.Result;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import me.dm7.barcodescanner.zxing.ZXingScannerView;

public class EscanerActivity extends AppCompatActivity implements ZXingScannerView.ResultHandler {

    ArrayList<String> lastResults;

    private static final int CAMERA_PERMISSION = 1;
    private static String ref = "";
    private ZXingScannerView scannerView;
    SharedPreferences sharedPreferences;
    String token, localizacion;
    Float latitud, longitud;
    int traza_id;
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_escaner);
        lastResults = new ArrayList<>();
        scannerView = findViewById(R.id.scannerView);
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        token = sharedPreferences.getString("token", null);
        localizacion = sharedPreferences.getString("localizacion", null);
        traza_id = sharedPreferences.getInt("traza_id", -1);
        latitud = sharedPreferences.getFloat("latitude", -1f);
        longitud = sharedPreferences.getFloat("lonxitude", -1f);

        // this parameter will make your HUAWEI phone works great!
        scannerView.setAspectTolerance(0.5f);

        // Request permission
        if (Build.VERSION.SDK_INT >= 23) {
            if (checkSelfPermission(Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {
                scannerView.setResultHandler(this);
                scannerView.startCamera();
            } else {
                requestPermissions(new String[]{Manifest.permission.CAMERA}, CAMERA_PERMISSION);
            }
        } else {
            scannerView.setResultHandler(this);
            scannerView.startCamera();
        }

    }

    @Override
    protected void onDestroy() {
        scannerView.stopCamera();
        super.onDestroy();
    }

    @Override
    protected void onPause() {
        scannerView.stopCamera();
        super.onPause();
    }

    @Override
    public void onResume() {
        super.onResume();
        scannerView.setResultHandler(this);
        scannerView.startCamera();
    }

    @Override
    public void handleResult(Result rawResult) {
        ref = rawResult.getText();

        boolean escaneado = false;

        for (String s : lastResults) {
            if (s.equals(ref)) escaneado = true;
        }

        if (!escaneado) {
            lastResults.add(ref);
            // Here we receive rawResult (reference of product) and vibrate effect
            Vibrator vibrator = (Vibrator) getApplicationContext().getSystemService(Context.VIBRATOR_SERVICE);
            vibrator.vibrate(100);
            // ADD TO DB
            enviarDatos();
            Toast.makeText(this, ref, Toast.LENGTH_SHORT).show();
        }
        scannerView.resumeCameraPreview(this);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == CAMERA_PERMISSION) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                scannerView.setResultHandler(EscanerActivity.this);
                scannerView.startCamera();
            } else {
                Toast.makeText(this, "Permiso denegado", Toast.LENGTH_SHORT).show();
            }
        }

    }

    public void enviarDatos() {
        RequestQueue queue = Volley.newRequestQueue(this);
        String url = "https://api-android1.jorgeteixeira.es/traza/engadir";
        JSONObject postRequest = null;
        try {
            postRequest = new JSONObject("{\"token\":\"" +token+ "\",\"referencia\":\""+ref+"\",\"traza_id\":"+traza_id+",\"fecha\":\""+sdf.format(new Date(System.currentTimeMillis() - 3600 * 1000))+"\",\"localizacion\":\""+localizacion+"\",\"latitud\":"+latitud+",\"longitud\":"+longitud+"}");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        final String mRequestBody = postRequest.toString();
        StringRequest stringRequest = new StringRequest(Request.Method.POST, url, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                Log.v("LOG_VOLLEY", response);
                System.out.println(response);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.e("LOG_VOLLEY", error.toString());
            }
        }) {
            @Override
            public String getBodyContentType() {
                return "application/json; charset=utf-8";
            }

            @Override
            public byte[] getBody() {
                try {
                    return mRequestBody == null ? null : mRequestBody.getBytes("utf-8");
                } catch (UnsupportedEncodingException uee) {
                    VolleyLog.wtf("Unsupported Encoding while trying to get the bytes of %s using %s", mRequestBody, "utf-8");
                    return null;
                }
            }

        };
        queue.add(stringRequest);
    }

}
