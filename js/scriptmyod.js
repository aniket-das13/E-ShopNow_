window.onload = function() {
    /* Add your logic here */
var currentUid = null; 
var name=null; 
var em=null;
firebase.auth().onAuthStateChanged(function(user) {  
  // onAuthStateChanged listener triggers every time the user ID token changes.  
  // This could happen when a new user signs in or signs out.  
  // It could also happen when the current user ID token expires and is refreshed.  
  if (user && user.uid != currentUid) {  
   // Update the UI when a new user signs in.  
   // Otherwise ignore if this is a token refresh.  
   // Update the current user UID.  
   currentUid = user.uid;  
   name=user.displayName;
   em=user.email;
   var title= document.getElementById("hello");
   title.textContent= "Welcome to E-ShopNow, "+user.displayName+" !";  

 } else {  
   // Sign out operation. Reset the current user UID.  
   currentUid = null;  
   console.log("no user signed in");  
  }  
 
$('#searchbtn').click(function(e) {
    // prevent click action
    e.preventDefault();
    // your code here
    return false;
});

var sbtn=document.getElementById("searchbtn");
var sbox=document.getElementById("searchbox");
sbtn.addEventListener("click",function(){

var str= sbox.value;

firebase.firestore().collection("temp").doc("2").set({
    searchstr: str 
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});



setTimeout(function(){
       window.location.href="search.html";
},1500);



});

 
 
firebase.firestore().collection("orderplaced").where("uid","==",currentUid).get().then(function(querySnapshot){
 querySnapshot.forEach(function(doc){


var items=doc.data().items;
var x=0;
document.getElementById("noitem").style.display="none";
var bodycon=document.getElementById("bodycon");


var jbt=document.createElement("div");
jbt.setAttribute("class","jumbotron");
jbt.setAttribute("style","background: #F3E5AB; border: 2px solid #8b6508; border-radius: 10px;color: #8b6508;padding: 10px 10px;");
jbt.id="jumbo1";
bodycon.appendChild(jbt);

var hdr=document.createElement("header");
jbt.appendChild(hdr);

var order=document.createElement("div");
order.setAttribute("class","mt-2");
order.setAttribute("style","text-shadow: 1px 1px #8b6508; font-size: 1.2em;");
order.textContent="Order ID- ";
hdr.appendChild(order);

var idspan=document.createElement("span");
idspan.id="oid";
idspan.setAttribute("style","font-size:1em; text-shadow: 0px 0px #8b6508;");
if(items>1){
idspan.textContent=doc.id +" ("+items+" items)";}
else{idspan.textContent=doc.id +" ("+items+" item)";
}
order.appendChild(idspan);

var datentime=document.createElement("div");
datentime.setAttribute("class","mt-1");
datentime.setAttribute("style","text-shadow: 1px 1px #8b6508; font-size: 1.2em;");
datentime.textContent="Date and Time- ";
hdr.appendChild(datentime);

var dspan=document.createElement("span");
dspan.id="dt";
dspan.setAttribute("style","font-size:1em; text-shadow: 0px 0px #8b6508;");
dspan.textContent=" "+doc.data({ serverTimestamps: 'estimate' }).time.toDate().toString();;
datentime.appendChild(dspan);

var hrhd=document.createElement("hr");
hrhd.setAttribute("class","mt-2");
hrhd.setAttribute("style","color: #8b6508; border:2px solid #8b6508; border-radius:16px; opacity: 60%;");
hdr.appendChild(hrhd);

  var pccon=document.createElement("div");
  pccon.setAttribute("class","container-fluid mb-2");
  pccon.id="cartcontainer";
  jbt.appendChild(pccon);
            
for(x=1;x<=items;x++){

var p="prod_"+x;


var pid=doc.data()[p].pid;

              var ps=doc.data()[p].prod_size;




                var pcrow=document.createElement("div");
              pcrow.setAttribute("class","row");
              var pci=document.createElement("div")
              pci.setAttribute("class","pl-0 col-sm-2 col-5 col-md-3 col-lg-2 mt-2 mb-4");
              var pcimg=document.createElement("img");
              pcimg.setAttribute("src",doc.data()[p].ur);
              pci.appendChild(pcimg);

              pcimg.id="icartimage";
              pcrow.appendChild(pci);
              pccon.appendChild(pcrow);

              var pcdet= document.createElement("div");
              pcdet.setAttribute("class","col-sm-10 col-7 col-md-9 col-lg-10 pl-0");
              pcrow.appendChild(pcdet);
              var pcbr=document.createElement("div");
              pcbr.textContent=doc.data()[p].desc;
              pcbr.id="cartpname";
              pcdet.appendChild(pcbr);
              var pcd=document.createElement("div");
              pcd.id="cartpd";
              pcd.setAttribute("style","color:#8b6508;");
              pcd.textContent="Size: "+doc.data()[p].size+", "+doc.data()[p].colour;
              pcdet.appendChild(pcd);
              var pcpr=document.createElement("div");
              pcpr.setAttribute("class","mt-4");
              pcpr.id="cartprice";
              var cp=document.createElement("s");
              cp.id="cartp_bd";
              cp.setAttribute("style","opacity= 60%;");
              cp.style.display="none";
              var sp=document.createElement("span");

              pcpr.appendChild(cp);
              pcpr.appendChild(sp);
              pcdet.appendChild(pcpr);
              var pcdisc=document.createElement("div");
              pcdisc.id="cartpdiscpc";
              pcdisc.textContent=doc.data()[p].disc+"% Discount";
              pcdisc.setAttribute("style","color:red;");
              pcdet.appendChild(pcdisc);
              var divi= document.createElement("div");
              divi.setAttribute("class","mt-1");
              pcdet.appendChild(divi);
              var qty= document.createElement("span");
              qty.setAttribute("style","font-size: 1.3em; text-shadow: 1px 1px #8b6508; color:#8b6508;");
              qty.textContent="Qty ";              
              divi.appendChild(qty);
              var op=document.createElement("select");
              op.id="product_qty";
              op.setAttribute("class","custom-select ml-2 pr-0");
              op.disabled="true";
          
          var quantity=doc.data()[p].qty;

                      var opt=document.createElement("option");
                      opt.setAttribute("value",quantity);
                      opt.textContent=""+quantity;
                      op.appendChild(opt);

                      

                    
              divi.appendChild(op);

if(doc.data()[p].disc!=null){
                            sp.setAttribute("class","ml-3");                   
                                                    cp.textContent="₹"+doc.data()[p].opr;


                          sp.textContent="₹"+doc.data()[p].npr;
                          cp.style.display="inline";
                          cp.style.opacity="60%";
                          pcdisc.style.display="block";



                    }
                    else{

                            sp.setAttribute("class","ml-0");
                      
                      sp.textContent="₹"+doc.data()[p].npr;
                      pcdisc.style.display="none";


                    }


}


                     var line=document.createElement("hr");
                    line.setAttribute("style","color: #8b6508; border:2px solid #8b6508; border-radius:16px; opacity: 60%;");
                    pccon.appendChild(line);

                    var total=document.createElement("div");
                    total.setAttribute("style","font-size:1.5em; color:#8b6508; text-shadow:1px 1px #8b6508;");
                    total.setAttribute("class","text-right mt-0");
                    total.textContent="Grand Total- ₹"+doc.data().grandtot;

                    pccon.appendChild(total);





});

});



















 }

);
}