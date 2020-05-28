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
   title.textContent= "Welcome to E-ShopNow, "+name+" !";  

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



    
var save=0;
var totprice=0;
var count=0;
var items=0;
var db=firebase.firestore();


var refbtn=document.getElementById("refr");


refbtn.addEventListener("click",function(){

db.collection("cart").where("user_id","==",currentUid).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc){


firebase.firestore().collection("shoes").doc(doc.data().prod_id).get().then(function(docx){
db.collection("cart").doc(doc.id).update({
    size_qty: docx.data().size_qty
});

  });


});
});
setTimeout(function(){window.location.href="cart.html"},1500);
});
 



db.collection("cart").where("user_id","==",currentUid).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc){



if(doc.data().req_qty>doc.data().size_qty[doc.data().prod_size]){

    var pccon=document.getElementById("cartcontainer");
    var alt=document.createElement("div");
    alt.setAttribute("class","alert alert-danger");
    alt.setAttribute("role","alert");
var icon=document.createElement("i");
icon.setAttribute("class","fas fa-info-circle mr-2");
alt.appendChild(icon);
var mes=document.createElement("span");
alt.appendChild(mes);
pccon.appendChild(alt);
mes.textContent="Sorry "+name+"! We have removed the following product from your cart, as it is no more in stock- "+doc.data().brand+" (Size: "+doc.data().prod_size+" )";



    db.collection("cart").doc(doc.id).delete().then(function() {

              console.log("document removed successfully");

}).catch(function(error) {
    console.error("Error removing document: ", error);
});




} 



else {

count=count+1;

              var pid=doc.data().prod_id;

              var ps=doc.data().prod_size;

              var pccon=document.getElementById("cartcontainer")
              var pcrow=document.createElement("div");
              pcrow.setAttribute("class","row");
              var pci=document.createElement("div")
              pci.setAttribute("class","pl-0 col-sm-2 col-5 col-md-3 col-lg-2 mt-2");
              var pcimg=document.createElement("img");
              pcimg.setAttribute("src",doc.data().ur);
              pci.appendChild(pcimg);

              pcimg.id="icartimage";
              pcrow.appendChild(pci);
              pccon.appendChild(pcrow);

              var pcdet= document.createElement("div");
              pcdet.setAttribute("class","col-sm-10 col-7 col-md-9 col-lg-10 pl-0");
              pcrow.appendChild(pcdet);
              var pcbr=document.createElement("div");
              pcbr.textContent=doc.data().brand;
              pcbr.id="cartpname";
              pcdet.appendChild(pcbr);
              var pcd=document.createElement("div");
              pcd.id="cartpd";
              pcd.textContent="Size: "+doc.data().prod_size+", "+doc.data().colour;
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
              pcdisc.textContent=doc.data().disc+"% Discount";
              pcdisc.setAttribute("style","color:red;");
              pcdet.appendChild(pcdisc);
              var divi= document.createElement("div");
              divi.setAttribute("class","mt-1");
              pcdet.appendChild(divi);
              var qty= document.createElement("span");
              qty.setAttribute("style","font-size: 1.3em; text-shadow: 1px 1px #8b6508;");
              qty.textContent="Qty ";              
              divi.appendChild(qty);
              var op=document.createElement("select");
              op.id="product_qty";
              op.setAttribute("class","custom-select ml-2 pr-0");
              op.disabled="true";
          
          var quantity=doc.data().req_qty;

          items=items+quantity;
                      var opt=document.createElement("option");
                      opt.setAttribute("value",quantity);
                      opt.textContent=""+quantity;
                      op.appendChild(opt);

                      

                    
              divi.appendChild(op);

              var remove=document.createElement("button");
              remove.setAttribute("class","btn btn-outline-warning ml-2 mr-2");
              remove.setAttribute("style","float: right; border:0;");
              remove.setAttribute("data-toggle","tooltip");
              remove.setAttribute("data-placement","bottom");
              remove.setAttribute("title","Remove from cart");
              divi.appendChild(remove);
              var icon= document.createElement("i");
              icon.setAttribute("class","fas fa-trash-alt");
              icon.setAttribute("style","color:#8b6508; font-size:1.5em;");
              remove.appendChild(icon);

              remove.addEventListener("click",function(){

                  db.collection("cart").doc(doc.id).delete().then(function() {
                    setTimeout(function(){window.location.href="cart.html"},500);
              

}).catch(function(error) {
    console.error("Error removing document: ", error);
});



              });








var finalprice=0;
              var beforedisc=0;
             var savings=0;
              if(doc.data().disc!=null){
                            sp.setAttribute("class","ml-3");
                          finalprice=quantity*(Math.round((doc.data().pr)-(((doc.data().pr)*(doc.data().disc))/100)));

                        

                          document.getElementById("save").style.display="block";
                          
                          beforedisc=quantity*doc.data().pr;
                          savings=beforedisc-finalprice;
                          save=save+savings;
                          cp.textContent="₹"+beforedisc;


                          sp.textContent="₹"+finalprice;
                          totprice=totprice+finalprice;
                          cp.style.display="inline";
                          cp.style.opacity="60%";
                          pcdisc.style.display="block";



                    }
                    else{

                            sp.setAttribute("class","ml-0");
                      finalprice=quantity*doc.data().pr;
                      totprice=totprice+finalprice;
                      sp.textContent="₹"+finalprice;
                      pcdisc.style.display="none";


                    }


            

              





                     var line=document.createElement("hr");
                    line.setAttribute("style","color: #222222; border: 1px solid #222222; width: 100%;");
                    pccon.appendChild(line);


            
}            












});

document.getElementById("qty").textContent="("+count+")";

document.getElementById("totpr").textContent="₹ "+totprice;
document.getElementById("ft").textContent="₹ "+totprice;
document.getElementById("save").textContent="You will save ₹"+save+" on this order.";

document.getElementById("itm").textContent="("+items+" items)";

/*db.collection("orderplaced").doc("A").set({
    time: firebase.firestore.FieldValue.serverTimestamp()
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});

var t=null;



db.collection("orderplaced").doc("A").get().then(function(doc) {
    t=

}).catch(function(error) {
    console.log("Error getting document:", error);
});

*/


var get_desc=null;
var get_size=null;
var get_qty=null;
var get_oldpr=null;
var get_newpr=null;
var get_disc=null;
var get_col=null;
var get_pid=null;
var get_ur=null;
var order_id=null;
var get_items=count;
var c=1;


var pbtn=document.getElementById("placebtn");
var totalprice= totprice;


if (totalprice>0){
pbtn.disabled=false;  
}

pbtn.addEventListener("click",function(){

db.collection("orderplaced").add({
    uid: currentUid,
    time: firebase.firestore.FieldValue.serverTimestamp(),
    items: get_items,
    grandtot: totalprice

})
.then(function(docRef) {
    order_id=docRef.id;
    

db.collection("cart").where("user_id", "==", currentUid).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            
   
get_desc=doc.data().brand;
get_size=doc.data().prod_size;
get_qty=doc.data().req_qty;
get_oldpr=doc.data().pr;
get_disc=doc.data().disc;
get_col=doc.data().colour;
get_pid=doc.data().prod_id;
get_ur=doc.data().ur;




if(get_disc != null){
  get_oldpr=get_qty*get_oldpr;
  get_newpr=(Math.round((get_oldpr)-(((get_oldpr)*(get_disc))/100)));
}
else{
  get_oldpr=get_qty*get_oldpr;
  get_newpr=get_oldpr;
}

 
          



db.collection("orderplaced").doc(order_id).update({
 ["prod_"+c] : {
    desc: get_desc,
    size: get_size,
    qty: get_qty,
    npr: get_newpr,
    opr: get_oldpr,
    disc: get_disc,
    colour: get_col,
    ur: get_ur,
    pid: get_pid

  }
}).then(function() {

}).catch(function(error) {
        console.log("Error writing documents: ", error);
    });



c++;








        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });




db.collection('cart').where('user_id','==',currentUid).get()
  .then(function(querySnapshot) {
        // Once we get the results, begin a batch
        var batch = db.batch();

        querySnapshot.forEach(function(doc) {
            // For each doc, add a delete operation to the batch
            batch.delete(doc.ref);
        });

        // Commit the batch
        return batch.commit();
  }).then(function() {
      // Delete completed!
      // ...
  }); 



db.collection("temp").doc("1").set({
    oid: order_id
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
       setTimeout(function(){
       window.location.href="checkout.html";
},1500);







})
.catch(function(error) {
    console.error("Error adding document: ", error);
});









  


});

});





 
 });  


}