$(document).ready(function(){

  var statisticaMensile = {
    "January" : 0,
    "February": 0,
    "March": 0,
    "April": 0,
    "May": 0,
    "June": 0,
    "July": 0,
    "August":0,
    "September": 0,
    "October": 0,
    "November": 0,
    "December": 0,
  }

  var totVenditore = {
    "Marco": 0,
    "Giuseppe":0,
    "Riccardo":0,
    "Roberto":0,
  }

  // creo un oggetto per i valori di ogni trimestre
  var totTrimestre = {
    "primoTrimestre" : 0,
    "secondoTrimestre" : 0,
    "terzoTrimestre" : 0,
    "quartoTrimestre" : 0,
  }
  var singolaVendita;
  var totVendite = 0;
  var venditore;


  var percentualeMarco;
  var percentualeGiuseppe;
  var percentualeRiccardo;
  var percentualeRoberto;

  var idDaCanc;
  // Con questa chiamata AJAX, col metodo get prendo gli elementi della lista salvati nel
  // server
  $.ajax({
      url:"http://138.68.64.12:3012/sales",
      method:"GET",
      success:function(data) {
        console.log(data);
        for (var i = 0; i < data.length; i ++) {
          var dateVendita = moment(data[i].date,'DD, MM, YYYY').month();
          console.log('mese di vedita', dateVendita);
          singolaVendita = parseInt(data[i].amount);
          // Invoco la funzione sumMonthSales che fa la somma degli amount dei
          venditaMensile(dateVendita);
          totVendite+= singolaVendita;
          console.log('totali delle vendite', totVendite);
          venditore = data[i].salesman;
          console.log(venditore);
          // Invoco la funzione statisticheVenditore
          statisticheVenditore(venditore);
          // invoco la funziona
          venditeTrimestrali(dateVendita);
        }
        // creazione chartLine con chart.js plugin
        MychartLine();

        MychartPie();

        MychartBar();

      },
  });

  // M 2

  $("#btn").click(function(){
    $("#venditore").val();
    console.log($("#venditore", ).val());
    var dateVendita = moment($("#date").val()).format('DD-MM-YYYY');
    console.log(dateVendita);

    var amountSales = parseInt($("#vendita").val());
    $.ajax({
      url:"http://138.68.64.12:3012/sales",
      method:"POST",
      data:
      {
        "venditore" : $("#venditore").val(),
        "amount" : amountSales,
        "date" : dateVendita,
      },
      success:function(data) {
        console.log(data);
      },
    });
  });
  $(document).on('click', '#del', function(){
      idDaCanc=$('#cancel').val();

      cancellaElemento(idDaCanc);
});
  function cancellaElemento(idDaCanc){

   $.ajax({
      url: 'http://138.68.64.12:3012/sales/+idDaCanc',
      method: 'DELETE',
      success: function(data){
         console.log(data);
      },
      error: function(){
         alert('Error!');
      }
   });
 }

    // funzione che somma i guadagni complessivi dei venditori per ogni mensilità
    function venditaMensile(dateVendita) {
        /*for(var chiaveMese in statisticaMensile){
            if(chiaveMese==dateVendita){

            }

        }*/
        if (dateVendita == 0) {
          statisticaMensile.January += singolaVendita;
        }
        console.log(statisticaMensile.January + " January-amount")
        if (dateVendita == 1) {
          statisticaMensile.February += singolaVendita;
        }
        if (dateVendita == 2) {
          statisticaMensile.March += singolaVendita;
        }
        if (dateVendita == 3) {
          statisticaMensile.April += singolaVendita;
        }
        if (dateVendita == 4) {
          statisticaMensile.May += singolaVendita;
        }
        if (dateVendita == 5) {
          statisticaMensile.June += singolaVendita;
        }
        if (dateVendita == 6) {
          statisticaMensile.July += singolaVendita;
        }
        if (dateVendita == 7) {
          statisticaMensile.August += singolaVendita;
        }
        if (dateVendita == 8) {
          statisticaMensile.September += singolaVendita;
        }
        if (dateVendita == 9) {
          statisticaMensile.October += singolaVendita;
        }
        if (dateVendita == 10) {
          statisticaMensile.November += singolaVendita;
        }
        if (dateVendita == 11) {
          statisticaMensile.December += singolaVendita;
        }
    }
    // funzione che somma i guadagni di ogni singolo venditore
    function statisticheVenditore(venditore) {
      if (venditore == "Marco") {
        totVenditore.Marco += singolaVendita;
        percentualeMarco = (totVenditore.Marco * 100) /totVendite;
      }
      console.log(percentualeMarco + "marco");

      if (venditore == "Giuseppe") {
        totVenditore.Giuseppe += singolaVendita;
        percentualetGiuseppe= (totVenditore.Giuseppe * 100) /totVendite;
      }

      if (venditore == "Riccardo") {
        totVenditore.Riccardo += singolaVendita;
        percentualeRiccardo= (totVenditore.Riccardo * 100) /totVendite;
      }

      if (venditore == "Roberto") {
        totVenditore.Roberto += singolaVendita;
        percentualeRoberto = (totVenditore.Roberto * 100) /totVendite;
      }

    }
    // funzione che somma i guadagni trimestrali dell'azienda(quarter)
    function venditeTrimestrali(dateVendita) {
        if (dateVendita == 0 || dateVendita == 1 || dateVendita == 2) {
          totTrimestre.primoTrimestre++;
        }
        console.log(totTrimestre.primoTrimestre + "primo trimestre")
        if (dateVendita == 3 || dateVendita == 4 || dateVendita == 5) {
          totTrimestre.secondoTrimestre++;
        }
        console.log(totTrimestre.secondoTrimestre + "secondo trimestre")

        if (dateVendita == 6 || dateVendita == 7 || dateVendita == 8) {
          totTrimestre.terzoTrimestre++;
        }
        console.log(venditeTrimestrali.terzoTrimestre + "terzo trimestre")
        if (dateVendita == 9 || dateVendita == 10 || dateVendita == 11) {
          totTrimestre.quartoTrimestre++;
        }
        console.log(totTrimestre.quartoTrimestre + "quarto trimestre")
    }
    // creazione chartLine con chart.js
    function MychartLine() {
        var ctxLine = document.getElementById('myChartLine').getContext('2d');
          var chart = new Chart(ctxLine, {
            // The type of chart we want to create
            type: 'line',
            // The data for our dataset
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"],
                datasets: [{
                    label: "Statistiche mensili",
                    borderColor: 'rgb(255, 99, 132)',
                    pointBorderWidth: 3,
                    pointHoverBorderWidth: 3,
                    data: [statisticaMensile.January,statisticaMensile.February,statisticaMensile.March,statisticaMensile.April,statisticaMensile.May,
                          statisticaMensile.June,statisticaMensile.July,statisticaMensile.August,statisticaMensile.September,
                          statisticaMensile.October,statisticaMensile.November,statisticaMensile.December],
                }]
            },

          });
    }
    // creazione chartPie con chart.js
    function MychartPie() {
      var ctxPie = document.getElementById('myChartPie').getContext('2d');
        var chartPie = new Chart(ctxPie, {
          // The type of chart we want to create
          type: 'pie',
          // The data for our dataset
          data: {
              labels: ["Marco","Giuseppe","Riccardo","Roberto"],
              datasets: [{
                  label: "Mensile",
                  // backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: '#2E2E2E',
                   backgroundColor: ['red','yellow','green','blue'],
                  data: [percentualeMarco.toFixed(2),percentualetGiuseppe.toFixed(2),percentualeRiccardo.toFixed(2),percentualeRoberto.toFixed(2)],
              }]
            },
          // Configuration options go here
          options: {}
          });
     }
    // creazione chartBar
    function MychartBar() {
      var ctxBar = document.getElementById('myChartBar').getContext('2d');
        var chartBar = new Chart(ctxBar, {
          // The type of chart we want to create
          type: 'bar',
          // The data for our dataset
          data: {
              labels: ["Jan/Feb/Mar","Apr/May/Jun","Jul/Aug/Sep","Oct/Nov/Dec"],
              datasets: [{
                  label: "Statistiche trimestrali",
                  borderColor: ['red','yellow','green','blue'],
                  borderWidth: 2,
                  backgroundColor: ['#dbf2f2', '#ffecd9', '#ffe0e6', '#ebe0ff'],
                  data: [totTrimestre.primoTrimestre,totTrimestre.secondoTrimestre,
                        totTrimestre.terzoTrimestre,totTrimestre.quartoTrimestre],
              }]
            },
          // Configuration options go here
          options: {
              scales: {
                  xAxes: [{
                      stacked: true
                  }],
                  yAxes: [{
                      stacked: true
                  }]
              }
          }
      });
    }
});
