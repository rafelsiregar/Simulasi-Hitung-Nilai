package com.simulasinilai.simulasihitungnilai;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Button;
import android.view.View.OnClickListener;
import android.widget.Toast;

import org.w3c.dom.Text;


public class Main4Activity extends AppCompatActivity {
    EditText[] Skor = new EditText[15];
    EditText[] Maks = new EditText[15];
    TextView Nilai;
    RadioGroup Metode;
    Button Input, Home;
    float score[] = new float[15];
    float max[] = new float[15];
    float skor_uraian, maks_uraian, nilai_uraian;
    EditText jumlah_soal;
    int Soal;
    boolean error = false;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main4);

        Metode = (RadioGroup) findViewById(R.id.Method);
        jumlah_soal = (EditText) findViewById(R.id.soal);
        Skor[0] = (EditText) findViewById(R.id.skor1);
        Skor[1] = (EditText) findViewById(R.id.skor2);
        Skor[2] = (EditText) findViewById(R.id.skor3);
        Skor[3] = (EditText) findViewById(R.id.skor4);
        Skor[4] = (EditText) findViewById(R.id.skor5);
        Skor[5] = (EditText) findViewById(R.id.skor6);
        Skor[6] = (EditText) findViewById(R.id.skor7);
        Skor[7] = (EditText) findViewById(R.id.skor8);
        Skor[8] = (EditText) findViewById(R.id.skor9);
        Skor[9] = (EditText) findViewById(R.id.skor10);
        Skor[10] = (EditText) findViewById(R.id.skor11);
        Skor[11] = (EditText) findViewById(R.id.skor12);
        Skor[12] = (EditText) findViewById(R.id.skor13);
        Skor[13] = (EditText) findViewById(R.id.skor14);
        Skor[14] = (EditText) findViewById(R.id.skor15);
        Maks[0] = (EditText) findViewById(R.id.maks1);
        Maks[1] = (EditText) findViewById(R.id.maks2);
        Maks[2] = (EditText) findViewById(R.id.maks3);
        Maks[3] = (EditText) findViewById(R.id.maks4);
        Maks[4] = (EditText) findViewById(R.id.maks5);
        Maks[5] = (EditText) findViewById(R.id.maks6);
        Maks[6] = (EditText) findViewById(R.id.maks7);
        Maks[7] = (EditText) findViewById(R.id.maks8);
        Maks[8] = (EditText) findViewById(R.id.maks9);
        Maks[9] = (EditText) findViewById(R.id.maks10);
        Maks[10] = (EditText) findViewById(R.id.maks11);
        Maks[11] = (EditText) findViewById(R.id.maks12);
        Maks[12] = (EditText) findViewById(R.id.maks13);
        Maks[13] = (EditText) findViewById(R.id.maks14);
        Maks[14] = (EditText) findViewById(R.id.maks15);
        Input = (Button) findViewById(R.id.button5);
        Home = (Button) findViewById(R.id.button6);
        Nilai = (TextView) findViewById(R.id.textNilai);


        Home.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent balik = new Intent(getApplicationContext(), MainActivity.class);
                startActivity(balik);
            }
        });

        Input.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Input();
            }
        });
    }

    @SuppressLint("DefaultLocale")
    public void Input() {
        if (jumlah_soal.getText().toString().isEmpty()) {
            Toast.makeText(this, "Mohon diisi", Toast.LENGTH_SHORT).show();
            error = true;
        } else {
            Soal = Integer.parseInt(jumlah_soal.getText().toString());
            if (Soal > 15) {
                Toast.makeText(this, "Jumlah soal yang dimasukkan melebihi batas", Toast.LENGTH_SHORT).show();
                Nilai.setText("");
                error = true;
            } else {
                for (int i = 0; i < Soal; i++) {
                    if (Skor[i].getText().toString().isEmpty() || Maks[i].getText().toString().isEmpty()) {
                        Toast.makeText(this, "Mohon diisi", Toast.LENGTH_SHORT).show();
                        error = true;
                    } else {
                        score[i] = Float.parseFloat(Skor[i].getText().toString());
                        max[i] = Float.parseFloat(Maks[i].getText().toString());
                    }
                }
                skor_uraian = 0;
                maks_uraian = 0;
                for (int i = 0; i < Soal; i++) {
                    skor_uraian = skor_uraian + score[i];
                    maks_uraian = maks_uraian + max[i];
                }
                if (maks_uraian == 0) {
                    Toast.makeText(this, "Nilai tidak dapat diproses, mohon periksa kembali", Toast.LENGTH_SHORT).show();
                    error = true;
                } else nilai_uraian = (skor_uraian / maks_uraian) * 100;

                if (nilai_uraian > 100) {
                    Toast.makeText(this, "Nilai tidak dapat diproses, mohon periksa kembali", Toast.LENGTH_SHORT).show();
                    error = true;
                } else {
                    for (int i = 0; i < Soal; i++) {
                        if (Skor[i].getText().toString().isEmpty() || Maks[i].getText().toString().isEmpty()) {
                            Toast.makeText(this, "Mohon diisi", Toast.LENGTH_SHORT).show();
                            Nilai.setText("");
                            error = true;
                        } else if (score[i] > max[i]) {
                            Toast.makeText(this, "Nilai tidak dapat diproses, mohon periksa kembali", Toast.LENGTH_SHORT).show();
                            Nilai.setText("");
                            error = true;
                        }
                    }
                }
            }
        }
            if(!error){
                    int bentuk_nilai = Metode.getCheckedRadioButtonId();
                    switch (bentuk_nilai) {
                        case R.id.Bulat:
                            Nilai.setText(String.valueOf(String.format("%.0f", (nilai_uraian))));
                            break;
                        case R.id.Satu:
                            Nilai.setText(String.valueOf(String.format("%.1f", (nilai_uraian))));
                            break;
                        case R.id.Dua:
                            Nilai.setText(String.valueOf(String.format("%.2f", (nilai_uraian))));
                            break;
                    }
                }
            }
        }
