
$("#login_btn").click(function () { 
    user_id= $("#user_id").val(); password=$("#password").val();
    if (user_id=="test" & password=="13") { $('#div_auten').hide(); $('#app').show();
    localStorage.setItem("user_id", user_id); localStorage.setItem("password", password);}
  })
  $("#type_diff").change(function () { 
    if ($("#type_diff").val()=='N') {
        $("#duree_diff").val("0"); $("#periodicite_diff").val("0");
        $("#duree_diff").attr("disabled", true);
        $("#periodicite_diff").attr("disabled", true);
    } else {
        $("#duree_diff").attr("disabled", false);
        $("#periodicite_diff").attr("disabled", false);

    }
    
})

  get_item_local("montant"); 
  get_item_local("duree_amort");
  get_item_local("periodicite");
  get_item_local("taux_interet");
  get_item_local("user_id"); 
 get_item_local("password"); 
$("#btn_decais").click(function (k) {  fn_modal_decaiss(3)})


   $("#date_debut,#date_fin,#ce").change(function () { 
     set_item_local($(this).attr("id")) 
     for(j=0 ;j<3 ;j++)
    {$("#date_util"+j).attr("max",$("#date_fin").val());
    $("#date_util"+j).attr("min",$("#date_debut").val());
  }  fn_parc_tab_cal(3)
      })

      
    
      

$("#btn_ok").click(function () {    fn_change_row (6);})
$("#btn1").click(function () { f_calc ();})
$("#periodicite,#duree_amort").change( function () {  if (((($("#duree_amort").val())%  ($("#periodicite").val())) !=0) & $("#periodicite").val()!=0)  {
alert("La durée doit être le plutiple de la  périodicité !!!!!") ;$("#periodicite").val(0);}})

$("#periodicite_diff,#duree_diff").change( function () {  if ((($("#duree_diff").val())%  ($("#periodicite_diff").val()) !=0 ) & $("#periodicite_diff").val()!=0) {
    alert("La durée doit être le plutiple de la  périodicité !!!!!") ;$("#periodicite_diff").val(0);}})
    

$("#btn_excel").click(function () {  tableToExcel  ("table_liste");})

function fn_modal_decaiss(k)
{ $("#mod_decaiss").modal ("show");
r_i=" <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash' viewBox='0 0 16 16'>        <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/>        <path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/>      </svg>";
get_item_local("ce");  get_item_local("date_debut");   get_item_local("date_fin"); 
var montant=$("#montant").val().replaceAll(" ","");$("#montant_util").val( formatMoney(montant));
   $("#tab_util tbody").remove();   var tbody = $("<tbody></tbody>");

   for (i = 0; i < k; i++) 
   {
    date_fin=$("#date_fin").val();date_debut=$("#date_debut").val();
    var ligne = $(   "    <tr id='tr_util"+i+"'> <td width='16'> <a href=# onclick= fn_removeid('tr_util"+i+"')>  "+r_i+"</a> </td><td><input type='text' class='form-control' name='montant_util'  id='montant_util"+i+"'  min=0 pattern='[0-9]*'  placeholder='Montant en DA' onchange= fn_parc_tab_cal(3) ></td>  <td><input type='date' name='date_util'  min='"+date_debut+"' max='"+date_fin+"' class='form-control' id='date_util"+i+"' onchange= fn_parc_tab_cal(3)></td> <td class='table-primary'><input type='text' class='form-control' style='width: 60px;'   id='jnbre_jour_ce"+i+"' readonly></td> <td class='table-primary'><input type='text' class='form-control'  id='comm_engag"+i+"' readonly><td class='table-primary'><input type='text' class='form-control'  id='tva_ce"+i+"' readonly></td>  <td class='table-info' ><input type='text'  width='20' class='form-control'  style='width: 60px;'  id='nbre_jour_ii"+i+"' readonly></td><td class='table-info' ><input type='text' class='form-control'  id='inter_interc_util"+i+"' readonly> </td> <td class='table-info' ><input type='text' class='form-control'  id='tva_ii"+i+"' readonly></td></tr>   " );
    tbody.append(ligne);
     
   }
   var ligne = $(   "    <tr class=table-secondary><td></td> <td> <input type='text' class='form-control'  id='total_util' placeholder='Total en DA' ></td>  <td></td> <td></td> <td><input type='text' class='form-control'  id='total_comm_engag' readonly> </td>  <td><input type='text' class='form-control'  id='total_tva_ce' readonly> </td><td></td><td><input type='text' class='form-control'  id='total_inter_interc_util' readonly></td> <td><input type='text' class='form-control'  id='total_tva_ii' readonly></td></tr>   " );
   tbody.append(ligne); $("#tab_util").append(tbody);

     
   


   fn_parc_tab_modal(k);
   fn_parc_tab_cal(k)
}
function  fn_parc_tab_modal(k)

{
    var totals=0; 
    for (i = 0; i < k; i++) 
    {             
     get_item_local("montant_util"+i);get_item_local("date_util"+i); 
     var montant_util=$("#montant_util"+i).val().replaceAll(" ",""); $("#montant_util"+i).val( formatMoney(montant_util));
     totals=totals+ montant_util/1;
    // fn_change_row(i);
    }
    
    $("#total_util").val(formatMoney(totals))

}

function  fn_parc_tab_cal(k)

{ 
    
    var totals=0; total_comm_engag=0;total_tva_ii=0;total_tva_ce=0;total_inter_interc_util=0;
    for (i = 0; i < k; i++) 
    {             

     var montant_util=$("#montant_util"+i).val().replaceAll(" ",""); $("#montant_util"+i).val( formatMoney(montant_util));
      fn_change_row(i); 

      total_comm_engag=total_comm_engag+($("#comm_engag"+i).val().replaceAll(" ",""))/1
        totals=totals+ montant_util/1;
      
        total_tva_ii=total_tva_ii+($("#tva_ii"+i).val().replaceAll(" ",""))/1
        total_tva_ce=total_tva_ce+($("#tva_ce"+i).val().replaceAll(" ",""))/1
        total_inter_interc_util=total_inter_interc_util+($("#inter_interc_util"+i).val().replaceAll(" ",""))/1

    }
        
    $("#total_inter_interc_util").val(formatMoney(total_inter_interc_util.toFixed(2)))
    $("#total_tva_ii").val(formatMoney(total_tva_ii.toFixed(2)))
    $("#total_tva_ce").val(formatMoney(total_tva_ce.toFixed(2)))
    $("#total_comm_engag").val(formatMoney(total_comm_engag.toFixed(2)))
    $("#total_util").val(formatMoney(totals.toFixed(2)))

}

function  fn_change_row(i)

{       set_item_local("montant_util"+i)
        set_item_local("date_util"+i) ;
        montant_util=   $("#montant_util"+i).val().replaceAll (" ","");    $("#montant_util"+i).val(formatMoney(montant_util))  
        date_util=  (  $("#date_util"+i).val()) ? $("#date_util"+i).val().replaceAll (" ",""):"";
        fn_calc_nbre_jour(i)
        fn_cal_ce(i);
   }

function fn_calc_nbre_jour(i)
{
  
  
    if ($("#date_debut").val())  {
       if  ($("#date_util"+i).val())
           {
           var date = new Date($("#date_util"+i).val());     var day = date.getDate();     var month = date.getMonth() + 1;   var year = date.getFullYear();     end=new Date(([month,day,  year].join('/'))); 
          if (i==0) { var date = new Date($("#date_debut").val());     var day = date.getDate();     var month = date.getMonth() + 1;   var year = date.getFullYear();     start=new Date(([month,day,  year].join('/'))); }
          else  {var date =  new Date($("#date_util"+(i/1-1)).val());     var day = date.getDate();     var month = date.getMonth() + 1;   var year = date.getFullYear();     start=new Date(([month,day,  year].join('/'))); }

          $("#jnbre_jour_ce"+i).val( Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24))); 
           
           
            }

       else        {           $("#jnbre_jour_ce"+i).val('');       }     
    
    
   }   else    {       $("#jnbre_jour_ce"+i).val('');   }  

       


   
   if ($("#date_fin").val())  {
    if  ($("#date_util"+i).val())
        {
        var date = new Date($("#date_fin").val());     var day = date.getDate();     var month = date.getMonth() + 1;   var year = date.getFullYear();     end=new Date(([month,day,  year].join('/'))); 
        
        var date =  new Date($("#date_util"+(i/1)).val());     var day = date.getDate();     var month = date.getMonth() + 1;   var year = date.getFullYear();     start=new Date(([month,day,  year].join('/'))); 
        //alert(i+"-----"+end +'--*********--'+start)
       $("#nbre_jour_ii"+i).val( Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24))); 
        
        
         }

    else        {           $("#nbre_jour_ii"+i).val('');       }     
 
 
}   else    {       $("#nbre_jour_ii"+i).val('');   }  
  

}


function fn_cal_ce(i)
{

   const nj_ce=$("#jnbre_jour_ce"+i).val();
   const nj_ii=$("#nbre_jour_ii"+i).val();
   const ce=$("#ce").val();
   const taux_interet=$("#taux_interet").val();
    const montant_util=$("#montant_util"+i).val().replaceAll(" ","");
    taux_tva=$("#taux_taxe").val(); 

  
   if (nj_ce/1 && ce/1 &&  montant_util/1){  
        $("#comm_engag"+i).val(formatMoney(((montant_util*nj_ce*ce/3600)).toFixed(2))) ;
        $("#tva_ce"+i).val(formatMoney((taux_tva*(montant_util*nj_ce*ce/3600)/100).toFixed(2))) ;
        
        $("#inter_interc_util"+i).val(formatMoney((montant_util*nj_ii*taux_interet/3600).toFixed(2))) ;
        $("#tva_ii"+i).val(formatMoney((taux_tva*(montant_util*nj_ii*taux_interet/3600)/100).toFixed(2))) ;
            }
   else  $("#inter_interc_util"+i).val("") ;

}


function fn_removeid(id)
{
   $("#"+id).remove();
   localStorage.setItem("ce", $("#ce").val());
  

}
function fn_add_tr()
{ r_i=" <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash' viewBox='0 0 16 16'>        <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/>        <path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/>      </svg>";
   i=($('#tab_util tbody tr').length);
   var ligne = $(   "    <tr id='tr_util"+i+"'> <td width='16'> <a href=# onclick= fn_removeid('tr_util"+i+"')>  "+r_i+"</a> </td><td><input type='text' class='form-control'  id='montant_util"+i+"' placeholder='Montant en DA' onchange=fn_change_row("+i+")></td>  <td><input type='date' class='form-control' id='date_util"+i+"' onchange=fn_change_row("+i+")></td> <td><input type='text' class='form-control'  id='jnbre_jour_ce"+i+"' readonly></td> <td><input type='text' class='form-control'  id='comm_engag"+i+"' readonly><td><input type='text' class='form-control'  id='tva_ce"+i+"' readonly></td> </td> <td><input type='text' class='form-control'  id='inter_interc_util"+i+"' readonly> </td> <td><input type='text' class='form-control'  id='tva_ii"+i+"' readonly></td></tr>   " );
  
$('#tab_util > tbody > tr').eq(i-2).after(ligne);

}


function tableToExcel  (tb) {
    var tableToExcel = (function () {
      var uri = "data:application/vnd.ms-excel;base64,",
        template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function (s) {
          return window.btoa(unescape(encodeURIComponent(s)));
        },
        format = function (s, c) {
          return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
          });
        };
      return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table);
        var ctx = {
          worksheet: name || "Worksheet",
          table: table.innerHTML,
        };
        window.location.href = uri + base64(format(template, ctx));
      };
    })();
    tableToExcel(tb, "W3C Example Table");
  }

function f_calc ()

{
   
    var montant=$("#montant").val().replaceAll(" ","");    $("#montant").val(  formatMoney(montant)); set_item_local("montant");
    var periodicite=$("#periodicite").val(); set_item_local("periodicite");
    var duree_amort=$("#duree_amort").val();  set_item_local("duree_amort");
var periodicite_diff=$("#periodicite_diff").val(); set_item_local("periodicite_diff");
    var duree_diff=$("#duree_diff").val();set_item_local("duree_diff");
    var type_diff=$("#type_diff").val();set_item_local("type_diff");
    var type_echeance=$("#type_echeance").val();set_item_local("type_echeance");
    var taux_interet=$("#taux_interet").val();set_item_local("taux_interet");
    var taux_taxe=$("#taux_taxe").val();set_item_local("taux_taxe");
   // var taux_com_eng=$("#taux_com_eng").val();set_item_local(taux_com_eng)  /* */

    var tbody = $("<tbody></tbody>");
    
    principales=0;interets=0; tvas=0 ;totals=0
    $("#table_liste tbody").remove();
    if (!(montant/1))  return false;if (!(duree_amort/1))  return false;if (!(taux_interet/1))  return false;if (!(taux_taxe/1))  return false;
    principale=0; 

    for (j = 0; j < duree_diff/periodicite_diff ; j++) {

        interet=(montant*taux_interet/100)/(12/periodicite_diff)
        tva=taux_taxe*interet/100
        total=principale+interet+tva
        var ligne = $("<tr class=text-warning ></tr>" )
        ligne.append("<td>"+(j+1)+"</td><td>"+formatMoney((montant/1).toFixed(2))+"</td><td>"+formatMoney(principale.toFixed(2))+"</td><td>"+formatMoney(interet.toFixed(2))+"</td><td>"+formatMoney(tva.toFixed(2))+"</td><td><b>"+formatMoney(total.toFixed(2))+"</b></td>");
        tbody.append(ligne);
        interets=interets+interet;tvas=tvas+tva; totals =totals+total;
       

    }
    var principale=montant/(duree_amort/periodicite);
    for (i = 0; i < duree_amort/periodicite; i++) {
    var ligne = $("<tr ></tr>" )
   

    
   
    interet=(montant*taux_interet/100)/(12/periodicite)
    tva=taux_taxe*interet/100
    total=principale+interet+tva
    ligne.append("<td>"+(j+i+1)+"</td><td>"+formatMoney((montant/1).toFixed(2))+"</td><td>"+formatMoney(principale.toFixed(2))+"</td><td>"+formatMoney(interet.toFixed(2))+"</td><td>"+formatMoney(tva.toFixed(2))+"</td><td><b>"+formatMoney(total.toFixed(2))+"</b></td>");
    tbody.append(ligne);
    principales=principales+principale;interets=interets+interet;tvas=tvas+tva; totals =totals+total;
    montant=montant-principale;  
    }
 if (( duree_amort/periodicite)%2==0)  {var ligne = $("<tr  ></tr>" );  ligne.append("<td> </td><td></td><td></td><td></td><td></td><td><b></b></td>");
    tbody.append(ligne);} 
    var ligne = $("<tr class=table-dark ></tr>" )
    ligne.append("<td> Total</td><td></td><td>"+formatMoney(principales.toFixed(2))+"</td><td>"+formatMoney(interets.toFixed(2))+"</td><td>"+formatMoney(tvas.toFixed(2))+"</td><td><b>"+formatMoney(totals.toFixed(2))+"</b></td>");
    tbody.append(ligne);
    $("#table_liste").append(tbody);
    }


function formatMoney(num , localize,fixedDecimalLength){
    if (!(num/1)) return 0;
    
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


    function get_item_local(el)
    { 
        if ($("#"+el).val()/1) return false;

        if (localStorage.getItem(el)){$("#"+el).val( localStorage.getItem(el)) ;} 
    }
    function set_item_local(el)
    { 
     if ($("#"+el).val()!=''){  localStorage.setItem(el, $("#"+el).val());}
    }
   
