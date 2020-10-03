package com.simulasinilai.simulasihitungnilai;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import static android.widget.Toast.*;


public class Main3Activity extends AppCompatActivity {
    EditText Harian, Bobot, UTS, UAS;
    TextView Nilai100, Nilai4, Huruf;
    Button Input100, Input4, Home3;
    float rata2, bobot, uts, uas, nilai100, nilai4;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main3);

        Harian = (EditText)findViewById(R.id.txtHarian);
        Bobot = (EditText)findViewById(R.id.txtBobot);
        UTS = (EditText)findViewById(R.id.txtUTS);
        UAS = (EditText)findViewById(R.id.txtUAS);
        Nilai100 = (TextView)findViewById(R.id.txtNilai100);
        Nilai4 = (TextView)findViewById(R.id.txtNilai4);
        Input100 = (Button)findViewById(R.id.input100);
        Input4 = (Button)findViewById(R.id.input4);
        Huruf = (TextView)findViewById(R.id.NilaiHuruf);
        Home3 = (Button) findViewById(R.id.home3) ;

        Home3.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v){
                Intent balik = new Intent (getApplicationContext(), MainActivity.class);
                startActivity(balik);
            }
        });

        Input100.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (Harian.getText().toString().matches("")) {
                    makeText(getApplicationContext(), "Masukkan nilai harian", LENGTH_SHORT).show();
                } else if ((Bobot.getText().toString().matches("")) && (!Harian.getText().toString().matches(""))) {
                    makeText(getApplicationContext(), "Masukkan bobot", LENGTH_SHORT).show();
                } else if ((UTS.getText().toString().matches("")) && (UAS.getText().toString().matches(""))) {
                    rata2 = Float.parseFloat(Harian.getText().toString());
                    Nilai100.setText(String.format("%.0f", rata2));
                } else if ((UAS.getText().toString().matches("")) && (!UTS.getText().toString().matches(""))) {
                    makeText(getApplicationContext(), "Masukkan nilai UAS", LENGTH_SHORT).show();
                } else if ((!UAS.getText().toString().matches("")) ^ (UTS.getText().toString().matches(""))){
                    rata2 = Float.parseFloat(Harian.getText().toString());
                    bobot = Integer.parseInt(Bobot.getText().toString());
                    rata2 = Float.parseFloat(Harian.getText().toString());
                    bobot = Integer.parseInt(Bobot.getText().toString());
                    uas = Float.parseFloat(UAS.getText().toString());
                    nilai100 = (((bobot * rata2) + uas) / (bobot + 1));
                    Nilai100.setText(String.format("%.0f", nilai100));
                } else {
                    rata2 = Float.parseFloat(Harian.getText().toString());
                    bobot = Integer.parseInt(Bobot.getText().toString());
                    uts = Float.parseFloat(UTS.getText().toString());
                    uas = Float.parseFloat(UAS.getText().toString());
                    nilai100 = (((bobot * rata2) + uts + uas) / (bobot + 2));
                    nilai4 = (nilai100 / 25);
                    if ((rata2 > 100) || (uts > 100) || (uas > 100)) {
                        Nilai100.setText("Nilai tidak dapat diproses, mohon periksa kembali");
                    } else if (bobot == 0) {
                        Nilai100.setText("Coba dicek lagi, masa ga ada bobotnya?");
                    } else {
                        Nilai100.setText(String.valueOf((String.format("%.0f", nilai100))));
                    }
                }
                Nilai4.setText("");
                Huruf.setText("");
            }
        });


        Input4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (Harian.getText().toString().matches("")) {
                    makeText(getApplicationContext(), "Masukkan nilai harian", LENGTH_SHORT).show();
                } else if ((Bobot.getText().toString().matches("")) && (!Harian.getText().toString().matches(""))) {
                    makeText(getApplicationContext(), "Masukkan bobot", LENGTH_SHORT).show();
                } else if ((UTS.getText().toString().matches("")) && (UAS.getText().toString().matches(""))) {
                    rata2 = Float.parseFloat(Harian.getText().toString());
                    nilai4 = rata2 / 25;
                    Nilai4.setText(String.format("%.2f", nilai4));
                    if (nilai4 == 0) {
                        Huruf.setText("Predikat : E");
                    } else if ((nilai4 >= 0) && (nilai4 <= 1)) {
                        Huruf.setText("Predikat : D");
                    } else if ((nilai4 > 1) && (nilai4 < 1.33)) {
                        Huruf.setText("Predikat : D+");
                    } else if ((nilai4 > 1.33) && (nilai4 <= 1.66)) {
                        Huruf.setText("Predikat : C-");
                    } else if ((nilai4 > 1.66) && (nilai4 <= 2)) {
                        Huruf.setText("Predikat : C");
                    } else if ((nilai4 > 2) && (nilai4 <= 2.33)) {
                        Huruf.setText("Predikat : C+");
                    } else if ((nilai4 > 2.33) && (nilai4 <= 2.66)) {
                        Huruf.setText("Predikat : B-");
                    } else if ((nilai4 > 2.66) && (nilai4 <= 3)) {
                        Huruf.setText("Predikat : B");
                    } else if ((nilai4 > 3) && (nilai4 <= 3.33)) {
                        Huruf.setText("Predikat : B+");
                    } else if ((nilai4 > 3.33) && (nilai4 <= 3.66)) {
                        Huruf.setText("Predikat : A-");
                    } else if ((nilai4 > 3.66) && (nilai4 <= 4)) {
                        Huruf.setText("Predikat : A");
                    } else {
                        Huruf.setText("Nilai tidak dapat diproses, mohon periksa kembali");
                    }
                } else if ((UAS.getText().toString().matches("")) && (!UTS.getText().toString().matches(""))) {
                    Toast.makeText(getApplicationContext(), "Masukkan nilai UTS/UAS", LENGTH_SHORT).show();
                } else if ((!UAS.getText().toString().matches("")) ^ (UTS.getText().toString().matches(""))) {
                    rata2 = Float.parseFloat(Harian.getText().toString());
                    bobot = Integer.parseInt(Bobot.getText().toString());
                    nilai100 = (((bobot * rata2) + uas) / (bobot + 1));
                    nilai4 = (nilai100 / 25);
                    Nilai4.setText(String.format("%.2f", nilai4));
                    if (nilai4 == 0) {
                        Huruf.setText("Predikat : E");
                    } else if ((nilai4 >= 0) && (nilai4 <= 1)) {
                        Huruf.setText("Predikat : D");
                    } else if ((nilai4 > 1) && (nilai4 < 1.33)) {
                        Huruf.setText("Predikat : D+");
                    } else if ((nilai4 > 1.33) && (nilai4 <= 1.66)) {
                        Huruf.setText("Predikat : C-");
                    } else if ((nilai4 > 1.66) && (nilai4 <= 2)) {
                        Huruf.setText("Predikat : C");
                    } else if ((nilai4 > 2) && (nilai4 <= 2.33)) {
                        Huruf.setText("Predikat : C+");
                    } else if ((nilai4 > 2.33) && (nilai4 <= 2.66)) {
                        Huruf.setText("Predikat : B-");
                    } else if ((nilai4 > 2.66) && (nilai4 <= 3)) {
                        Huruf.setText("Predikat : B");
                    } else if ((nilai4 > 3) && (nilai4 <= 3.33)) {
                        Huruf.setText("Predikat : B+");
                    } else if ((nilai4 > 3.33) && (nilai4 <= 3.66)) {
                        Huruf.setText("Predikat : A-");
                    } else if ((nilai4 > 3.66) && (nilai4 <= 4)) {
                        Huruf.setText("Predikat : A");
                    } else {
                        Toast.makeText(getApplicationContext(), "Nilai tidak dapat diproses, mohon periksa kembali", LENGTH_SHORT).show();
                    }
                } else {
                    rata2 = Float.parseFloat(Harian.getText().toString());
                    bobot = Integer.parseInt(Bobot.getText().toString());
                    uts = Float.parseFloat(UTS.getText().toString());
                    uas = Float.parseFloat(UAS.getText().toString());
                    nilai100 = (((bobot * rata2) + uts + uas) / (bobot + 2));
                    nilai100 = (((bobot * rata2) + uts + uas) / (bobot + 2));
                    nilai4 = (nilai100 / 25);
                    Nilai4.setText(String.valueOf(String.format("%.2f", nilai4)));
                    if (nilai4 == 0) {
                        Huruf.setText("E");
                    } else if ((nilai4 >= 0) && (nilai4 <= 1)) {
                        Huruf.setText("Predikat : D");
                    } else if ((nilai4 > 1) && (nilai4 < 1.33)) {
                        Huruf.setText("Predikat : D+");
                    } else if ((nilai4 > 1.33) && (nilai4 <= 1.66)) {
                        Huruf.setText("Predikat : C-");
                    } else if ((nilai4 > 1.66) && (nilai4 <= 2)) {
                        Huruf.setText("Predikat : C");
                    } else if ((nilai4 > 2) && (nilai4 <= 2.33)) {
                        Huruf.setText("Predikat : C+");
                    } else if ((nilai4 > 2.33) && (nilai4 <= 2.66)) {
                        Huruf.setText("Predikat : B-");
                    } else if ((nilai4 > 2.66) && (nilai4 <= 3)) {
                        Huruf.setText("Predikat : B");
                    } else if ((nilai4 > 3) && (nilai4 <= 3.33)) {
                        Huruf.setText("Predikat : B+");
                    } else if ((nilai4 > 3.33) && (nilai4 <= 3.66)) {
                        Huruf.setText("Predikat : A-");
                    } else if ((nilai4 > 3.66) && (nilai4 <= 4)) {
                        Huruf.setText("Predikat : A");
                    } else {
                        Toast.makeText(getApplicationContext(), "Nilai tidak dapat diproses, mohon periksa kembali", LENGTH_SHORT).show();
                    }
                }
                Nilai100.setText("");
            }
        });
}
}