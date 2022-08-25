if (localStorage.getItem("montant")){ montant= localStorage.getItem("montant");}
else {montant=1000000;}
if (localStorage.getItem("duree")){ duree= localStorage.getItem("duree");}
else {duree=10;}
if (localStorage.getItem("taux_interet")){ taux_interet= localStorage.getItem("taux_interet");}
else {taux_interet=5;}
if (localStorage.getItem("taux_tva")){ taux_tva= localStorage.getItem("taux_tva");}
else {taux_tva=19;}
$("#montant").val(montant);
$("#duree").val(duree)
$("#taux_interet").val(taux_interet
);
$("#taux_tva").val(taux_tva);
$("#loader").hide();
$("#all").dblclick(function () {
var content = document.getElementById('all');
content.select();
})






$("#documet").on('keyup', function (e) { if (e.key === 'Enter' || e.keyCode === 13) {    f ();  }});

$("#btn1").click(function () { f ();})

function f ()
{
localStorage.setItem("montant", $("#montant").val());
localStorage.setItem("duree", $("#duree").val());
localStorage.setItem("taux_interet", $("#taux_interet").val());

localStorage.setItem("taux_tva", $("#taux_tva").val());


var montant=$("#montant").val().replaceAll(" ","");$("#montant").val(  formatMoney(montant)
);
var periodicite=$("#periodicite").val();
var duree=$("#duree").val();
var amortissement=$("#amortissement").val();
var taux_interet=$("#taux_interet").val();
var taux_tva=$("#taux_tva").val();

//$("#table_liste").empty() 
var tbody = $("<tbody></tbody>");

pricipales=0;interets=0; tvas=0 ;totals=0
$("#table_liste tbody").remove();
if (!(montant/1))  return false;if (!(duree/1))  return false;if (!(taux_interet/1))  return false;if (!(taux_tva/1))  return false;
var pricipale=montant/duree;
for (i = 0; i < duree; i++) {
var ligne = $("<tr ></tr>" )

interet=montant*taux_interet/100
tva=taux_tva*interet/100
total=pricipale+interet+tva
ligne.append("<td>"+(i+1)+"</td><td>"+formatMoney((montant/1).toFixed(2))+"</td><td>"+formatMoney(pricipale.toFixed(2))+"</td><td>"+formatMoney(interet.toFixed(2))+"</td><td>"+formatMoney(tva.toFixed(2))+"</td><td><b>"+formatMoney(total.toFixed(2))+"</b></td>");
tbody.append(ligne);
pricipales=pricipales+pricipale;interets=interets+interet;tvas=tvas+tva; totals =totals+total;
montant=montant-pricipale;  
}
if (i>8)
{var ligne = $("<tr class=btn-success ></tr>" )
ligne.append("<td> Total</td><td></td><td></td><td></td><td></td><td><b></b></td>");
tbody.append(ligne);}
var ligne = $("<tr class=btn-success ></tr>" )
ligne.append("<td> Total</td><td></td><td>"+formatMoney(pricipales.toFixed(2))+"</td><td>"+formatMoney(interets.toFixed(2))+"</td><td>"+formatMoney(tvas.toFixed(2))+"</td><td><b>"+formatMoney(totals.toFixed(2))+"</b></td>");
tbody.append(ligne);
$("#table_liste").append(tbody);
}


function formatMoney(num , localize,fixedDecimalLength){
num=num+"";
var str=num;
var reg=new RegExp(/(\D*)(\d*(?:[\.|,]\d*)*)(\D*)/g)
if(reg.test(num)){ 
var pref=RegExp.$1;
var suf=RegExp.$3;
var part=RegExp.$2;
 if(fixedDecimalLength/1)part=(part/1).toFixed(fixedDecimalLength/1);
if(localize)part=(part/1).toLocaleString();{
str= pref +part.match(/(\d{1,3}(?:[\.|,]\d*)?)(?=(\d{3}(?:[\.|,]\d*)?)*$)/g ).join(' ')+suf ; }
};
return str;
}
