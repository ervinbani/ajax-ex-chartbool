$(document).ready(function(){

  var somma=[0,0,0,0,0,0,0,0,0,0,0,0];
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
              console.log('mese', somma);
              MyChart();



          },
          error:function(){
              alert('errore');
          }

  });
  function MyChart(){
  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: ["January", "February", "March", "April", "May", "June", "July", "Ago", "Set", "Ott", "Nov", "dic"],
          datasets: [{
              label: "My First dataset",
              //backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: somma,
          }]
      },





    });
    }

});
