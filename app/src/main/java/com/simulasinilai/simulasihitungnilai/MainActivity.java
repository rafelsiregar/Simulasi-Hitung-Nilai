package com.simulasinilai.simulasihitungnilai;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.view.View.OnClickListener;

public class MainActivity extends AppCompatActivity {
    Button ulangan, uraian, isian, rapot, bandingUN, keluar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ulangan = (Button) findViewById(R.id.button);
        uraian = (Button) findViewById(R.id.button2);
        isian = (Button) findViewById(R.id.button3);
        rapot = (Button) findViewById(R.id.button4);
        bandingUN = (Button)findViewById(R.id.button5);
        keluar = (Button)findViewById(R.id.exit);
        ulangan.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent iUlangan = new Intent(getApplicationContext(), Main2Activity.class);
                startActivity(iUlangan);
            }
        });

        uraian.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick (View v){
                Intent iUraian = new Intent(getApplicationContext(), Main4Activity.class);
                startActivity(iUraian);
            }
        });

        isian.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick (View v){
                Intent iIsian = new Intent(getApplicationContext(), Main5Activity.class);
                startActivity(iIsian);
            }
        });

        rapot.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent iRapot = new Intent(getApplicationContext(), Main3Activity.class);
                startActivity(iRapot);
            }
        });

        bandingUN.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick (View v) {
                Intent iBanding = new Intent(getApplicationContext(), Main6Activity.class);
                startActivity(iBanding);
        }
    });

        keluar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                 moveTaskToBack(true);
                 finish();
                 System.exit(0);
            }
        });

        };
    }