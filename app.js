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


$("#btn_util").click(function () {  fn_modal_util (6);})
$("#btn_ok").click(function () {    fn_modal_util_ok (6);})


$("#documet").on('keyup', function (e) { if (e.key === 'Enter' || e.keyCode === 13) {    f ();  }});

$("#btn1").click(function () { f ();})

function f ()
{
localStorage.setItem("montant", $("#montant").val());
localStorage.setItem("duree", $("#duree").val());
localStorage.setItem("taux_interet", $("#taux_interet").val());

localStorage.setItem("taux_tva", $("#taux_tva").val());


var montant=$("#montant").val().replaceAll(" ","");$("#montant").val(  formatMoney(montant));
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
 function fn_modal_util(k)
 {
    $("#tab_util tbody").remove();
    var tbody = $("<tbody></tbody>");
    for (i = 0; i < k; i++) {
        var ligne = $(   "    <tr id='tr_util"+i+"'> <td width='16'> <a href=# onclick= fn_removeid('tr_util"+i+"')> <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash' viewBox='0 0 16 16'>        <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/>        <path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/>      </svg> </a> </td><td><input type='text' class='form-control'  id='montant_util"+i+"' placeholder='Montant en DA' onchange=fn_modal_util_ok("+i+")></td>  <td><input type='date' class='form-control' id='date_util"+i+"' onchange=fn_modal_util_ok("+i+")></td> <td><input type='text' class='form-control'  id='jour_util"+i+"' readonly></td> <td><input type='text' class='form-control'  id='inter_util"+i+"' readonly> </td> <td><input type='text' class='form-control'  id='inter_interc_util"+i+"' readonly> </td> <td><input type='text' class='form-control'  id='tva_util"+i+"' readonly></td></tr>   " );
        tbody.append(ligne);
    }
    var ligne = $(   "    <tr class=btn-success><td></td> <td> <input type='text' class='form-control'  id='total_util' placeholder='Total en DA' ></td>  <td></td> <td></td> <td><input type='text' class='form-control'  id='total_inter_util' readonly> </td>  <td><input type='text' class='form-control'  id='total_inter_util' readonly> </td><td><input type='text' class='form-control'  id='total_inter_interc_util' readonly></td></tr>   " );
    tbody.append(ligne);
    $("#tab_util").append(tbody);

    var montant=$("#montant").val().replaceAll(" ","");$("#montant_util").val(  formatMoney(montant));
    if (localStorage.getItem("ce")){$("#ce").val( localStorage.getItem("ce")) ;}
    if (localStorage.getItem("date_debut")){$("#date_debut").val( localStorage.getItem("date_debut")) ;}
    for (i = 0; i < k; i++) {
        if (localStorage.getItem("montant_util"+i)){$("#montant_util"+i).val( localStorage.getItem("montant_util"+i)) ;}

        if (localStorage.getItem('date_util'+i)){$('#date_util'+i).val( localStorage.getItem('date_util'+i)) ;}

    }



    fn_modal_nbre_jour();
 }

function  fn_modal_util_ok(k)

{   total=0;
     localStorage.setItem("ce", $("#ce").val());
     localStorage.setItem("date_debut", $("#date_debut").val());
    for (i = 0; i < k; i++) {
        montant_util=  (  $("#montant_util"+i).val()/1) ? $("#montant_util"+i).val().replaceAll (" ",""):"";
        date_util=  (  $("#date_util"+i).val()/1) ? $("#date_util"+i).val().replaceAll (" ",""):"";
        localStorage.setItem("montant_util"+i, montant_util);
        localStorage.setItem("date_util"+i, date_util);
       if  ( $("#montant_util"+i).val()/1) total=total+ $("#montant_util"+i).val()/1
        
    }
       $("#total_util").val(formatMoney(total))
    fn_modal_nbre_jour();
 
    

}

function fn_modal_nbre_jour()
{
   
    for (i = 0; i < $('#tab_util tr').length; i++) {
   
     if ($("#date_debut").val())  {
        if  ($("#date_util"+i).val())
            {
            var date = new Date($("#date_util"+i).val());     var day = date.getDate();     var month = date.getMonth() + 1;   var year = date.getFullYear();     end=new Date(([month,day,  year].join('/'))); 
            var date = new Date($("#date_debut").val());     var day = date.getDate();     var month = date.getMonth() + 1;   var year = date.getFullYear();     start=new Date(([month,day,  year].join('/'))); ;
            $("#jour_util"+i).val( Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24))); 
            fn_cal_ce(i);
            
             }

        else 
        {
            $("#jour_util"+i).val('');

        }     
     
     
    }
    else 
    {
        $("#jour_util"+i).val('');

    }  

        
    }

}


 function fn_cal_ce(i)
 {

    const nj=$("#jour_util"+i).val();
    const ce=$("#ce").val();
     const montant_util=$("#montant_util"+i).val();
    if (nj/1 && ce/1 &&  montant_util/1){   taux_tva=$("#taux_tva").val();
         $("#tva_util"+i).val(formatMoney((taux_tva*(montant_util*nj*ce/365)/100).toFixed(2))) ;
         $("#inter_util"+i).val(formatMoney((montant_util*nj*ce /365).toFixed(2))) ;
      


        }
    else  $("#inter_util"+i).val("") ;

 }


 function fn_removeid(id)
 {
    $("#"+id).remove();
    localStorage.setItem("ce", $("#ce").val());
   

 }
 function fn_add_tr()
 {
    i=($('#tab_util tbody tr').length);
    var ligne = $(   "    <tr id='tr_util"+i+"'> <td width='16'> <a href=# onclick= fn_removeid('tr_util"+i+"')> <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash' viewBox='0 0 16 16'>        <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/>        <path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/>      </svg> </a> </td><td><input type='text' class='form-control'  id='montant_util"+i+"' placeholder='Montant en DA' onchange=fn_modal_util_ok("+i+")></td>  <td><input type='date' class='form-control' id='date_util"+i+"' onchange=fn_modal_util_ok("+i+")></td> <td><input type='text' class='form-control'  id='jour_util"+i+"' readonly></td> <td><input type='text' class='form-control'  id='inter_util"+i+"' readonly> </td> <td><input type='text' class='form-control'  id='tva_util"+i+"' readonly></td></tr>   " );
   
$('#tab_util > tbody > tr').eq(i-2).after(ligne);

 }
 
