package es.jorgeteixeira.milleiro;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Vibrator;
import android.view.Gravity;
import android.view.View;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.google.zxing.Result;

import es.jorgeteixeira.milleiro.model.Produto;
import me.dm7.barcodescanner.zxing.ZXingScannerView;

public class MainActivity extends AppCompatActivity implements ZXingScannerView.ResultHandler {

    private static final int CAMERA_PERMISSION = 1;
    private static String ref = "";
    private ZXingScannerView scannerView;
    public Produto produto = null;
    private TextView tvNome, tvDescricion;
    private ImageButton btnIngredentes, btnPreparacion, btnTraza, btnCompartir;
    private LinearLayout linearLayoutHelper, linearLayoutProduto;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        scannerView = findViewById(R.id.scannerView);
        linearLayoutHelper = findViewById(R.id.linearLayoutHelper);
        linearLayoutProduto = findViewById(R.id.linearLayoutProduto);
        tvNome = findViewById(R.id.tvTraza);
        tvDescricion = findViewById(R.id.tvDescricion);
        btnIngredentes = findViewById(R.id.btnIngredentes);
        btnTraza = findViewById(R.id.btnTraza);
        btnPreparacion = findViewById(R.id.btnPreparacion);
        btnCompartir = findViewById(R.id.btnCompartir);

        btnIngredentes.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(MainActivity.this, IngredentesActivity.class);
                Bundle data = new Bundle();
                data.putSerializable("produto", produto);
                i.putExtras(data);
                startActivity(i);
            }
        });
        btnTraza.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(MainActivity.this, TrazaActivity.class);
                Bundle data = new Bundle();
                data.putSerializable("produto", produto);
                i.putExtras(data);
                startActivity(i);
            }
        });
        btnPreparacion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(MainActivity.this, PreparacionActivity.class);
                Bundle data = new Bundle();
                data.putSerializable("produto", produto);
                i.putExtras(data);
                startActivity(i);
            }
        });
        btnCompartir.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent sendIntent = new Intent();
                sendIntent.setAction(Intent.ACTION_SEND);
                sendIntent.putExtra(Intent.EXTRA_TEXT, getResources().getString(R.string.share_message));
                sendIntent.setType("text/plain");
                Intent shareIntent = Intent.createChooser(sendIntent, null);
                startActivity(shareIntent);
            }
        });

        scannerView.setAspectTolerance(0.5f);

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

        scannerView.resumeCameraPreview(null);
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                scannerView.resumeCameraPreview(MainActivity.this);
            }
        }, 500);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        scannerView.setResultHandler(null);
        scannerView.stopCameraPreview();
        scannerView.stopCamera();
    }

    @Override
    protected void onPause() {
        super.onPause();
        scannerView.setResultHandler(null);
        scannerView.stopCameraPreview();
        scannerView.stopCamera();
    }

    @Override
    public void onResume() {
        super.onResume();
        scannerView.startCamera();
        scannerView.resumeCameraPreview(null);
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                scannerView.resumeCameraPreview(MainActivity.this);
            }
        }, 500);
    }

    @Override
    public void handleResult(Result rawResult) {
        String newRef = rawResult.getText();
        if (!ref.equals(newRef)) {
            ref = newRef;
            Vibrator vibrator = (Vibrator) getApplicationContext().getSystemService(Context.VIBRATOR_SERVICE);
            vibrator.vibrate(getResources().getInteger(R.integer.vibration));
            Toast toast = Toast.makeText(this, ref, Toast.LENGTH_SHORT);
            toast.setGravity(Gravity.TOP, 0, 0);
            toast.show();
            fetchProduct(ref);
        }
        scannerView.resumeCameraPreview(null);
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                scannerView.resumeCameraPreview(MainActivity.this);
            }
        }, 1000);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == CAMERA_PERMISSION) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                scannerView.setResultHandler(this);
                scannerView.startCamera();
            } else {
                Toast.makeText(this, R.string.permission_denied, Toast.LENGTH_SHORT).show();
            }
        }
    }

    private void fetchProduct(final String ref) {
        RequestQueue queue = Volley.newRequestQueue(this);
        String urlProd ="https://api-android2.jorgeteixeira.es/ref/" + ref;
        // Request a string response from the provided URL.
        StringRequest stringRequest = new StringRequest(Request.Method.GET, urlProd,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        produto = new Gson().fromJson(response, Produto.class);
                        if (produto.getDescricion().length() > 25) {
                            produto.setDescricion(produto.getDescricion().substring(0, 25).concat("..."));
                        }
                        tvNome.setText(produto.getNome());
                        tvDescricion.setText(produto.getDescricion() + "\nRef: " + ref);
                        linearLayoutHelper.setVisibility(View.GONE);
                        linearLayoutProduto.setVisibility(View.VISIBLE);
                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        if(error.networkResponse != null)
                            if (error.networkResponse.statusCode == 404) {
                                Toast toast = Toast.makeText(MainActivity.this, R.string.not_found_404, Toast.LENGTH_SHORT);
                                toast.setGravity(Gravity.TOP, 0, 0);
                                toast.show();
                            } else {
                                Toast toast = Toast.makeText(MainActivity.this, R.string.other_status_error, Toast.LENGTH_SHORT);
                                toast.setGravity(Gravity.TOP, 0, 0);
                                toast.show();
                            }
                        else {
                            Toast toast = Toast.makeText(MainActivity.this, R.string.other_network_error, Toast.LENGTH_SHORT);
                            toast.setGravity(Gravity.TOP, 0, 0);
                            toast.show();
                        }

                    }
                });
        queue.add(stringRequest);
        queue.start();
    }

}
