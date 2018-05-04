$(document).ready(function(){

  var somma=[0,0,0,0,0,0,0,0,0,0,0,0];
  var venditori=[];
  var statistiche=[];
  $.ajax({
          url:'http://138.68.64.12:3012/sales',
          method:'GET',
          success:function(data){
              for(var i=0;i<data.length;i++){
                  var mese=data[i]['date'];
                  var meseCorrente=mese.split('/')
                  var valMeseCorrente=meseCorrente[1];
                  for(var j=1;j<=12;j++){
                      if(valMeseCorrente==j){
                          somma[j-1]+=data[i]['amount'];
                      }
                  }
              }
              for(var i=0;i<data.length;i++){
                  var venditore=data[i]['salesman'];
                  if(!venditori.includes(venditore)){
                      venditori.push(venditore);
                  }

              }
              //inizializzo a zero l'array statistiche
              for (var i = 0; i < venditori.length; i++) {
                statistiche.push(0);
              }
              //ciclo for che somma le singole per venditore e inserisce la somma in un array statisriche
              
              for(var i=0;i<venditori.length;i++){
                  for(var j=0;j<data.length;j++){
                      var venditore=data[j]['salesman'];
                      var venditaSingola=data[j]['amount'];
                      if(venditori[i]==venditore){
                          statistiche[i]+=venditaSingola;
                      }
                  }
              }
              //ciclo for che somma il totale venduto da tutti i venditori
              var totVendite=0;
              for(var i=0;i<statistiche.length;i++){
                  totVendite+=statistiche[i];
              }
              //ciclo che trasforma le singole vendite in percentuali rispetto al totale
              var percentuali_Vendite=[];
              for(var i=0;i<statistiche.length;i++){
                  percentuali_Vendite.push(statistiche[i]/totVendite*100);
              }
              var obj={
           Marco:'Red',
           Giuseppe:'Yellow',
           Riccardo:'Blue',
           Roberto:'green'
           }


              console.log('venditori', venditori);
              console.log('statistiche', statistiche);
              console.log('totvendite', totVendite);
              console.log('percentuali_Vendite', percentuali_Vendite);

              console.log('mese', somma);
              //funzione che stampa il grafico a linea
              MyChartLine();
              //funzione che stampa un grafico a torta
              MyChartPie();

          },
          error:function(){
              alert('errore');
          }

  });
  function MyChartLine(){
  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Ago", "Set", "Ott", "Nov", "dic"],
          datasets: [{
              label: "My First dataset",
              //backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: somma,
          }]
      },
    });
  }
  function MyChartPie(){
  var ctx = document.getElementById('myChart2').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'doughnut',

      // The data for our dataset
      data:{

          datasets: [{
              label: "My First dataset",
              backgroundColor:['red','Yellow' ,'Blue' , 'green'] ,
              borderColor: 'rgb(255, 99, 132)',
              data: [25,25,25,25]
          }],
          labels: [
        'Marco',
        'Giuseppe',
        "Riccardo",
        "Roberto",


    ]

      }
    });
  }

});
