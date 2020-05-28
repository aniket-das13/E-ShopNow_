window.onload = function() {
    /* Add your logic here */
var currentUid = null;  
firebase.auth().onAuthStateChanged(function(user) {  
  // onAuthStateChanged listener triggers every time the user ID token changes.  
  // This could happen when a new user signs in or signs out.  
  // It could also happen when the current user ID token expires and is refreshed.  
  if (user && user.uid != currentUid) {  
   // Update the UI when a new user signs in.  
   // Otherwise ignore if this is a token refresh.  
   // Update the current user UID.  
   currentUid = user.uid;  
   var title= document.getElementById("hello");
   title.textContent= "Welcome to E-ShopNow, "+user.displayName+" !";  



 } else {  
   // Sign out operation. Reset the current user UID.  
   currentUid = null;  
   console.log("no user signed in");  
  }  
 


 }



);

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



var iden="";
var db=firebase.firestore();
var docRef = db.collection("plist").doc("1");

docRef.get().then(function(doc) {
    if (doc.exists) {

      var pid=doc.data().search;


firebase.firestore().collection("shoes").doc(pid).get().then(function(doc){
    if (doc.exists){

          var sq=doc.data().size_qty;
          var br=doc.data().brand+" "+doc.data().desc;
          var p=doc.data().pr;
          var d=doc.data().disc;
          var c=doc.data().colour;
          var u=doc.data().ur;

        
for(var x=0;x<doc.data().size.length;x++){

                  var s=document.getElementById("product_size");
                  var as=document.createElement("option");
                  as.setAttribute("value",doc.data().size[x]);
                  as.textContent="UK "+doc.data().size[x];
                  s.appendChild(as);
          }






        document.getElementById("footwearpic").setAttribute("src",doc.data().ur);
        document.getElementById("product_name").textContent=doc.data().brand+" "+doc.data().desc;
        
        document.getElementById("product_brand").textContent=doc.data().brand;
        document.getElementById("product_desc").textContent=doc.data().desc;
        document.getElementById("product_rating").textContent=doc.data().rating+" ";
        document.getElementById("product_desc").textContent=doc.data().desc;
        
        if(doc.data().disc!= null){

          var finalp=Math.round((doc.data().pr)-(((doc.data().pr)*(doc.data().disc))/100));
                document.getElementById("oldrate").style.display= "block";
              document.getElementById("oldrate").textContent="₹ "+doc.data().pr;
            document.getElementById("product_price").textContent="₹ "+finalp;

            document.getElementById("offervisible").style.display="block";
                   
        }
        else{document.getElementById("product_price").textContent="₹ "+doc.data().pr;
            }

          document.getElementById("product_disc").textContent=doc.data().disc+"% Discount";
          document.getElementById("product_logo").setAttribute("src",doc.data().logo);
          document.getElementById("product_warranty").textContent=doc.data().war;
          document.getElementById("product_d_id").textContent=doc.id;
          document.getElementById("product_d_brand").textContent=doc.data().brand;
          document.getElementById("product_d_desc").textContent=doc.data().desc;
          document.getElementById("product_d_cat").textContent=doc.data().cat;
          document.getElementById("product_d_gen").textContent=doc.data().gender;
          document.getElementById("product_d_colour").textContent=doc.data().colour;
          document.getElementById("product_d_weight").textContent=doc.data().weight+" kg";
          document.getElementById("product_d_war").textContent=doc.data().war;
          



          var dropdown= document.getElementById("product_size");
          
          var qdropdown= document.getElementById("product_qty");     
          

               dropdown.addEventListener("change",function(){

                          $('#product_qty').val("NA");


                              document.getElementById("instock").style.display="none";
                              document.getElementById("sellingout").style.display="none";
                              document.getElementById("outofstock").style.display="none";

                              document.getElementById("buynow").disabled=true;
                              document.getElementById("buynow").style.opacity="60%";
                              
                              document.getElementById("addtocart").disabled=true;
                              document.getElementById("addtocart").style.opacity="60%";


               });



               qdropdown.addEventListener("change",function(){


                
var s= dropdown.value;
var q= qdropdown.value;
                   
                


                    if(s == "NA" || q=="NA"){

                              document.getElementById("instock").style.display="none";
                              document.getElementById("sellingout").style.display="none";
                              document.getElementById("outofstock").style.display="none";

                              document.getElementById("buynow").disabled=true;
                              document.getElementById("buynow").style.opacity="60%";
                              
                              document.getElementById("addtocart").disabled=true;
                              document.getElementById("addtocart").style.opacity="60%";
                              
                              
                                                           

                    }

                    else 

                      {
                          var se=doc.data().size_qty[s];



                            if(q<=se){
                           
                        if(se>=1 && se<=5){

                      document.getElementById("sellingout").style.display="block";
                      document.getElementById("instock").style.display="none";
                              
                              document.getElementById("outofstock").style.display="none";

                               document.getElementById("buynow").disabled=false;
                              document.getElementById("buynow").style.opacity="100%";

                              document.getElementById("addtocart").disabled=false;
                              document.getElementById("addtocart").style.opacity="100%";

                        

                              
                             
                    }

                     else if(se>5){

                      document.getElementById("instock").style.display="block";

                              document.getElementById("sellingout").style.display="none";
                              document.getElementById("outofstock").style.display="none";
                              
                              document.getElementById("buynow").disabled=false;
                              document.getElementById("buynow").style.opacity="100%";

                              document.getElementById("addtocart").disabled=false;
                              document.getElementById("addtocart").style.opacity="100%";

                              document.getElementById("product_qty").disabled=false;


                           
                             
                    }

                    else if(se==0){

                      document.getElementById("outofstock").style.display="block";
                      document.getElementById("instock").style.display="none";
                              document.getElementById("sellingout").style.display="none";

                              document.getElementById("buynow").disabled=true;
                              document.getElementById("buynow").style.opacity="60%";
                              
                              document.getElementById("addtocart").disabled=true;
                              document.getElementById("addtocart").style.opacity="60%";

  

                    }}


                    else{

 document.getElementById("outofstock").style.display="block";
                      document.getElementById("instock").style.display="none";
                              document.getElementById("sellingout").style.display="none";

                              document.getElementById("buynow").disabled=true;
                              document.getElementById("buynow").style.opacity="60%";
                              
                              document.getElementById("addtocart").disabled=true;
                              document.getElementById("addtocart").style.opacity="60%";






                    }



}



                });        








                 var add=document.getElementById("addtocart");

                  add.addEventListener("click",function(){


                    var sz= parseInt(dropdown.value);
                    var pq= parseInt(qdropdown.value);





                                 var db=firebase.firestore();
// Add a new document in collection "cities"
db.collection("cart").add({
    user_id: currentUid ,
    prod_id: pid ,
    prod_size:sz,
    size_qty: sq,
    brand: br,
    disc:d,
    pr:p,
    colour:c, 
    ur: u,
    req_qty: pq


})
.then(function() {
    $("#alertmodal").modal('show');
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});





                  });


var buy=document.getElementById("buynow");

                  buy.addEventListener("click",function(){


                    var sz= parseInt(dropdown.value);
                     var pq= parseInt(qdropdown.value);





                                 var db=firebase.firestore();
// Add a new document in collection "cities"
db.collection("cart").add({
    user_id: currentUid ,
    prod_id: pid ,
    prod_size:sz,
    size_qty: sq,
    brand: br,
    disc:d,
    pr:p,
    colour:c, 
    ur: u,
    req_qty: pq

})
.then(function() {
                         
   setTimeout(function(){window.location.href="cart.html"},1000);
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});





                  });        
        
          




    }

    else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


    }
     else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});



setTimeout(function(){

var db=firebase.firestore();
db.collection("plist").doc("1").delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
},2000);



}