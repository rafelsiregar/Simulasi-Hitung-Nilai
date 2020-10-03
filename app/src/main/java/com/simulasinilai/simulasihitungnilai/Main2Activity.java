package com.simulasinilai.simulasihitungnilai;

import android.annotation.SuppressLint;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioGroup;
import android.widget.Switch;
import android.widget.TextView;
import android.content.Intent;
import android.view.View.OnClickListener;
import android.widget.Toast;



public class Main2Activity extends AppCompatActivity {
    EditText pilgan, soal, makspil, uraian, essay;
    TextView hasil;
    Button Input, Home;
    RadioGroup MetodeNilai;
    float betulpilgan, jmlsoal, maksuraian, makspilgan;
    float skorpil, skoruraian, skorhasil;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);

        MetodeNilai = (RadioGroup) findViewById(R.id.Method);
        pilgan = (EditText) findViewById(R.id.btlPilgan);
        soal = (EditText) findViewById(R.id.btlMaks);
        makspil = (EditText) findViewById(R.id.MaksPilgan);
        uraian = (EditText) findViewById(R.id.txtUraian);
        essay = (EditText) findViewById(R.id.MaksUraian);
        hasil = (TextView) findViewById(R.id.txtHasil);
        Input = (Button) findViewById(R.id.input);
        Home = (Button) findViewById(R.id.home);

        Input.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Input();
            }
        });

        Home.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent balik = new Intent(getApplicationContext(), MainActivity.class);
                startActivity(balik);
            }
        });
    }


    @SuppressLint("DefaultLocale")
    public void Input() {
        if (pilgan.getText().toString().matches("")) {
            Toast.makeText(this, "Mohon diisi, jika tidak ada masukkan 0", Toast.LENGTH_SHORT).show();
        } else if (soal.getText().toString().matches("")) {
            Toast.makeText(this, "Mohon diisi, jika tidak ada masukkan 0", Toast.LENGTH_SHORT).show();
        } else if (makspil.getText().toString().matches("")) {
            Toast.makeText(this, "Mohon diisi, jika tidak ada masukkan 0", Toast.LENGTH_SHORT).show();
        } else if (uraian.getText().toString().matches("")) {
            Toast.makeText(this, "Mohon diisi, jika tidak ada masukkan 0", Toast.LENGTH_SHORT).show();
        } else if (essay.getText().toString().matches("")) {
            Toast.makeText(this, "Mohon diisi, jika tidak ada masukkan 0", Toast.LENGTH_SHORT).show();
        }
        else {
            betulpilgan = Integer.parseInt(pilgan.getText().toString());
            jmlsoal = Integer.parseInt(soal.getText().toString());
            makspilgan = Integer.parseInt(makspil.getText().toString());
            skoruraian = Float.parseFloat(uraian.getText().toString());
            maksuraian = Integer.parseInt(essay.getText().toString());
            skorpil = ((makspilgan / jmlsoal) * betulpilgan);
            skorhasil = (((skorpil + skoruraian) / (makspilgan + maksuraian)) * 100);

            if (skorhasil > 100) {
                Toast.makeText(this, "Nilai tidak dapat diproses, mohon periksa kembali", Toast.LENGTH_SHORT).show();
            } else if (betulpilgan > jmlsoal) {
                Toast.makeText(this, "Nilai tidak dapat diproses, mohon periksa kembali", Toast.LENGTH_SHORT).show();
            } else if (skoruraian > maksuraian) {
                Toast.makeText(this, "Nilai tidak dapat diproses, mohon periksa kembali", Toast.LENGTH_SHORT).show();
            } else if (jmlsoal == 0) {
                skorpil = 0;
                int pembulatan = MetodeNilai.getCheckedRadioButtonId();
                switch (pembulatan) {
                    case R.id.Bulat :
                        hasil.setText(String.valueOf(String.format("%.0f", (skoruraian / maksuraian) * 100)));
                        break;
                    case R.id.Satu :
                        hasil.setText(String.valueOf(String.format("%.1f", (skoruraian / maksuraian) * 100)));
                        break;
                    case R.id.Dua :
                        hasil.setText(String.valueOf(String.format("%.2f", (skoruraian / maksuraian) * 100)));
                    break;
                }
            } else {
                int pembulatan = MetodeNilai.getCheckedRadioButtonId();
                switch (pembulatan) {
                    case R.id.Bulat :
                        hasil.setText(String.valueOf(String.format("%.0f", (skorhasil))));
                        break;
                    case R.id.Satu :
                        hasil.setText(String.valueOf(String.format("%.1f", (skorhasil))));
                        break;
                    case R.id.Dua :
                        hasil.setText(String.valueOf(String.format("%.2f", (skorhasil))));
                        break;
                }
            }
        }
    }
}