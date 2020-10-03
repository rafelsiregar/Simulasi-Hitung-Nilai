package com.simulasinilai.simulasihitungnilai;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Button;
import android.view.View.OnClickListener;
import android.widget.Toast;
import android.widget.RadioGroup;

import java.security.cert.Extension;

public class Main5Activity extends AppCompatActivity {
    Button Score_Input, Back;
    RadioGroup Pilih, Method;
    TextView Kata_pilgan, Kata_isian, Kata_uraian, Nilai_total;
    EditText Skor_pilgan, Bobot_pilgan, Pilgan, Skor_isian, Bobot_Isian, Isian, Skor_Uraian, Max;
    float Pilihan_ganda, Bobot_Pilihan, Soalpilgan, Iskat, Bobot_Isian_Singkat, SoalIsian, Essay, TotalEssay, Total_nilai;
    float Skormaks, NA;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main5);

        Method = (RadioGroup)findViewById(R.id.Method);
        Pilih = (RadioGroup)findViewById(R.id.pilih);
        Score_Input = (Button) findViewById(R.id.input_nilai);
        Back = (Button) findViewById(R.id.back);
        Kata_pilgan = (TextView) findViewById(R.id.pilihan_ganda);
        Skor_pilgan = (EditText) findViewById(R.id.skor_pilgan);
        Bobot_pilgan = (EditText) findViewById(R.id.bobot_pilgan);
        Pilgan = (EditText) findViewById(R.id.soal_pilgan);
        Kata_isian = (TextView) findViewById(R.id.isian_singkat);
        Skor_isian = (EditText) findViewById(R.id.skor_isian_singkat);
        Bobot_Isian = (EditText) findViewById(R.id.bobot_isian_singkat);
        Isian = (EditText) findViewById(R.id.soal_isian);
        Kata_uraian = (TextView) findViewById(R.id.essay);
        Skor_Uraian = (EditText) findViewById(R.id.skorEssay);
        Max = (EditText) findViewById(R.id.maxEssay);
        Nilai_total = (TextView) findViewById(R.id.NilaiAkhir);

        Back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent balik = new Intent(getApplicationContext(), MainActivity.class);
                startActivity(balik);
            }
        });

        Score_Input.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Input();
            }
        });
    }


    @SuppressLint("DefaultLocale")
    public void Input() {
        if (Skor_pilgan.getText().toString().isEmpty() || Bobot_pilgan.getText().toString().isEmpty() || Pilgan.getText().toString().isEmpty()) {
            Toast.makeText(this, "Mohon diisi, jika tidak ada masukkan 0", Toast.LENGTH_SHORT).show();
        } else if (Skor_isian.getText().toString().isEmpty() || Bobot_Isian.getText().toString().isEmpty() || Isian.getText().toString().isEmpty()) {
            Toast.makeText(this, "Mohon diisi, jika tidak ada masukkan 0", Toast.LENGTH_SHORT).show();
        } else if (Skor_Uraian.getText().toString().isEmpty() || Max.getText().toString().isEmpty()) {
            Toast.makeText(this, "Mohon diisi, jika tidak ada masukkan 0", Toast.LENGTH_SHORT).show();
        } else {
            Pilihan_ganda = Float.parseFloat(Skor_pilgan.getText().toString());
            Bobot_Pilihan = Float.parseFloat(Bobot_pilgan.getText().toString());
            Soalpilgan = Float.parseFloat(Pilgan.getText().toString());
            Iskat = Float.parseFloat(Skor_isian.getText().toString());
            Bobot_Isian_Singkat = Float.parseFloat(Bobot_Isian.getText().toString());
            SoalIsian = Float.parseFloat(Isian.getText().toString());
            Essay = Float.parseFloat(Skor_Uraian.getText().toString());
            TotalEssay = Float.parseFloat(Max.getText().toString());
        }

                int checked = Pilih.getCheckedRadioButtonId();
                switch (checked) {
                    case R.id.Angka :
                            Total_nilai = (Bobot_Pilihan * Pilihan_ganda) + (Iskat * Bobot_Isian_Singkat) + (Essay);
                            Skormaks = (Soalpilgan * Bobot_Pilihan) + (SoalIsian * Bobot_Isian_Singkat) + TotalEssay;
                            NA = ((Total_nilai) / (Skormaks)) * 100;
                            break;
                    case R.id.Persen :
                            Total_nilai = ((Pilihan_ganda/Soalpilgan)*Bobot_Pilihan) + ((Bobot_Isian_Singkat*(Iskat/SoalIsian)) + Essay);
                            NA = Total_nilai;
                            if ((Bobot_Pilihan+Bobot_Isian_Singkat+TotalEssay)>100)
                                Toast.makeText(this, "Nilai tidak dapat diproses, mohon periksa kembali", Toast.LENGTH_SHORT).show();
                                Nilai_total.setText("");
                            break;
                }
            if (NA > 100)
                Toast.makeText(this, "Nilai tidak dapat diproses, mohon periksa kembali", Toast.LENGTH_SHORT).show();

            else {
                int score_method = Method.getCheckedRadioButtonId();
                switch (score_method) {
                    case R.id.Bulat :
                        Nilai_total.setText(String.valueOf(String.format("%.0f", (NA))));
                        break;
                    case R.id.Satu :
                        Nilai_total.setText(String.valueOf(String.format("%.1f", (NA))));
                        break;
                    case R.id.Dua :
                        Nilai_total.setText(String.valueOf(String.format("%.2f", (NA))));
                        break;
                }
            }
            }
    }