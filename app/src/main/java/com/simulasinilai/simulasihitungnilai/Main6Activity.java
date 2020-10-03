package com.simulasinilai.simulasihitungnilai;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class Main6Activity extends AppCompatActivity {
    TextView Hasil;
    EditText sekolahA, sekolahB;
    EditText[] unasA = new EditText[6];
    EditText[] unasB = new EditText[6];
    float[] nA = new float[6];
    float[] nB = new float[6];
    Button Compare, Home;
    boolean error = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main6);

        //= (TextView) findViewById(R.id.textView3);
        sekolahA = (EditText) findViewById(R.id.school_name_a);
        sekolahB = (EditText) findViewById(R.id.school_name_b);
        Hasil = (TextView) findViewById(R.id.hasilbanding);
        unasA[0] = (EditText) findViewById(R.id.nilai_bindo);
        unasA[1] = (EditText) findViewById(R.id.nilai_bing);
        unasA[2] = (EditText) findViewById(R.id.nilai_matematika);
        unasA[3] = (EditText) findViewById(R.id.nilai_peminatan1);
        unasA[4] = (EditText) findViewById(R.id.nilai_peminatan2);
        unasA[5] = (EditText) findViewById(R.id.nilai_peminatan3);
        unasB[0] = (EditText) findViewById(R.id.nilai_bindo_b);
        unasB[1] = (EditText) findViewById(R.id.nilai_bing_b);
        unasB[2] = (EditText) findViewById(R.id.nilai_matematika_b);
        unasB[3] = (EditText) findViewById(R.id.nilai_peminatan1_b);
        unasB[4] = (EditText) findViewById(R.id.nilai_peminatan2_b);
        unasB[5] = (EditText) findViewById(R.id.nilai_peminatan3_b);
        Compare = (Button) findViewById(R.id.compare);
        Home = (Button) findViewById(R.id.home);

        Home.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent balik = new Intent(getApplicationContext(), MainActivity.class);
                startActivity(balik);
            }
        });

        Compare.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Input();
            }
        });
    }

    @SuppressLint("DefaultLocale")
    public void Input() {
        if (sekolahA.getText().toString().isEmpty() || sekolahB.getText().toString().isEmpty()) {
            Toast.makeText(this, "Mohon diisi", Toast.LENGTH_SHORT).show();
            error = true;
        } else {
            for (int i = 0; i < 6; i++) {
                if (unasA[i].getText().toString().isEmpty() || unasB[i].getText().toString().isEmpty()) {
                    Toast.makeText(this, "Mohon diisi", Toast.LENGTH_SHORT).show();
                    error = true;
                } else {
                    nA[i] = Float.parseFloat(unasA[i].getText().toString());
                    nB[i] = Float.parseFloat(unasB[i].getText().toString());
                }
            }
        }
        for (int i = 0; i < 6; i++) {
            if (unasA[i].getText().toString().isEmpty() || unasB[i].getText().toString().isEmpty()) {
                Toast.makeText(this, "Mohon diisi", Toast.LENGTH_SHORT).show();
                Hasil.setText("");
                error = true;
            } else if (nA[i] > 100 || nB[i] > 100) {
                Toast.makeText(this, "Nilai tidak dapat diproses, mohon periksa kembali", Toast.LENGTH_SHORT).show();
                Hasil.setText("");
                error = true;
            }
        }

        float nilaiA = 0;
        float nilaiB = 0;

        for (int i = 0; i < 6; i++) {
            nilaiA = nilaiA + nA[i];
            nilaiB = nilaiB + nB[i];
        }
        for (int i = 0; i < 6; i++) {
            if (unasA[i].getText().toString().isEmpty() || unasB[i].getText().toString().isEmpty()) {
                Toast.makeText(this, "Mohon diisi", Toast.LENGTH_SHORT).show();
                Hasil.setText("");
                error = true;
            } else if (nA[i] > 100 || nB[i] > 100) {
                Toast.makeText(this, "Nilai tidak dapat diproses, mohon periksa kembali", Toast.LENGTH_SHORT).show();
                Hasil.setText("");
                error = true;
            }
        }
            if(!error){
                if (nilaiA > nilaiB) {
                    Hasil.setText(sekolahA.getText().toString() + " memiliki rata-rata nilai UN yang lebih tinggi daripada " + sekolahB.getText().toString());
                } else if (nilaiA < nilaiB) {
                    Hasil.setText(sekolahB.getText().toString() + " memiliki rata-rata nilai UN yang lebih tinggi daripada " + sekolahA.getText().toString());
                } else Hasil.setText("Kedua sekolah memiliki rata-rata nilai UN yang sama");
            }
        }
    }