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





var db=firebase.firestore();
var order_id=null;

db.collection("temp").doc("1").get().then(function(doc){

if(doc.exists){
    order_id=doc.data().oid;
db.collection("orderplaced").doc(order_id).get().then(function(doc){



var items=doc.data().items;

console.log(items);
var product=null;
var brand=null;
var size=null;
var qty=null;
var i=1;

for(i=1;i<=items;i++){
  var p="prod_"+i;

   product= doc.data()[p].pid;
   desc= doc.data()[p].desc;
 size=doc.data()[p].size;
 qty=doc.data()[p].qty;
  


db.collection("shoes").doc(product).update({
    ["size_qty."+size.toString()]: firebase.firestore.FieldValue.increment(-qty)
}).then(function(){
});



}




 var template_params = {
   "to_email": em,
   "to_name": name,
   "order_id": order_id,
   "order_ts": doc.data({ serverTimestamps: 'estimate' }).time.toDate().toString()

}

var service_id = "default_service";
var template_id = "template_imvU8RL8";
emailjs.send(service_id, template_id, template_params).then(function() {
    console.log("Mail sent!");
}).catch(function(err){console.log("Error: "+err)});




});

var ty=document.getElementById("thankyou");

ty.textContent="Thank you for shopping on E-ShopNow, "+name+"!" ;

var od=document.getElementById("orderd");
od.textContent="Please check your email address ("+em+") for more details.";



}

});


setTimeout(function(){
      
firebase.firestore().collection("temp").doc("1").delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});

},1500);


setTimeout(function(){

 window.location.href="signedin.html";

},5000);









 }








);










}
