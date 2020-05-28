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

$('#ue-btn').click(function(e){
   e.preventDefault();

});

$('#ue-btn-xs').click(function(e){
   e.preventDefault();

});

$('#rpwd').click(function(e){
   e.preventDefault();

});


//ue

var uebtn=document.getElementById("ue-btn");
var uecb=document.getElementById("confirmmail");

var mes=document.getElementById("emessage");

var ee=document.getElementById("existemail");
var ne=document.getElementById("newemail");

uebtn.addEventListener("click",function(){
var user=firebase.auth().currentUser;
if(uecb.checked==true){


if(ee.value===user.email){

if(ne.value==""){mes.textContent="You have not entered a new email address. Please try again!";
setTimeout(function(){window.location.href="myacc.html"},2000);

}
else {



user.updateEmail(ne.value).then(function() {
 mes.textContent=" Update successful! Please sign-in again.";
setTimeout(function(){window.location.href="index.html"},2000);

}).catch(function(error) {
  mes.textContent=error.message +" Please try again!";
setTimeout(function(){window.location.href="myacc.html"},2000);
});




}

}
  else{mes.textContent="You have entered the incorrect email address. Please try again!";
setTimeout(function(){window.location.href="myacc.html"},2000);}





}
else {

mes.textContent="Changes not confimred. Please try again!";
setTimeout(function(){window.location.href="myacc.html"},2000);

}

});


//xs screen ue 

var uebtnx=document.getElementById("ue-btn-xs");
var uecbx=document.getElementById("confirmmail-xs");

var mesx=document.getElementById("emessage-xs");

var eex=document.getElementById("existemail-xs");
var nex=document.getElementById("newemail-xs");

uebtnx.addEventListener("click",function(){
var user=firebase.auth().currentUser;
if(uecbx.checked==true){


if(eex.value===user.email){

if(nex.value==""){mesx.textContent="You have not entered a new email address. Please try again!";
setTimeout(function(){window.location.href="myacc.html"},2000);

}
else {



user.updateEmail(nex.value).then(function() {
 mesx.textContent=" Update successful! Please sign-in again.";
setTimeout(function(){window.location.href="index.html"},2000);

}).catch(function(error) {
  mesx.textContent=error.message +" Please try again!";
setTimeout(function(){window.location.href="myacc.html"},2000);
});




}

}
  else{mesx.textContent="You have entered the incorrect email address. Please try again!";
setTimeout(function(){window.location.href="myacc.html"},2000);}





}
else {

mesx.textContent="Changes not confimred. Please try again!";
setTimeout(function(){window.location.href="myacc.html"},2000);

}

});

//reset pwd
var resetpwd=document.getElementById("rpwd");


resetpwd.addEventListener("click", function(){

var auth = firebase.auth();
var mail=auth.currentUser.email;

console.log(mail);
auth.sendPasswordResetEmail(mail).then(function() {
  var mes=document.getElementById("alert");
  mes.textContent="Email sent. Please check your email address. Re-signin once password is changed.";

}).catch(function(error) {
  var mes=document.getElementById("alert");
  mes.textContent=error.message;
});



});

//reset pwd-xs

var resetpwdx=document.getElementById("rpwd-xs");


resetpwdx.addEventListener("click", function(){

var auth = firebase.auth();
var mail=auth.currentUser.email;

console.log(mail);
auth.sendPasswordResetEmail(mail).then(function() {
  var mesx=document.getElementById("alert-xs");
  mesx.textContent="Email sent. Please check your email address. Re-signin once password is changed.";

}).catch(function(error) {
  var mesx=document.getElementById("alert-xs");
  mesx.textContent=error.message;
});



});



//del acc
var delac=document.getElementById("delacc");


delac.addEventListener("click", function(){

var auth = firebase.auth().currentUser;

auth.delete().then(function() {
  var mes=document.getElementById("alertacc");
  mes.textContent="Account deleted successfully.";
  setTimeout(function(){window.location.href="index.html"},2000);


}).catch(function(error) {
  var mes=document.getElementById("alertacc");
  mes.textContent=error.message;
  setTimeout(function(){window.location.href="myacc.html"},2000);

});



});


//del acc-xs

var delacx=document.getElementById("delacc-xs");


delacx.addEventListener("click", function(){

var auth = firebase.auth().currentUser;

auth.delete().then(function() {
  var mesx=document.getElementById("alertacc-xs");
  mesx.textContent="Account deleted successfully.";
  setTimeout(function(){window.location.href="index.html"},2000);


}).catch(function(error) {
  var mes=document.getElementById("alertacc-xs");
  mesx.textContent=error.message;
  setTimeout(function(){window.location.href="myacc.html"},2000);

});



});


//verify mail


var ver=document.getElementById("acc-ve-tab");

ver.addEventListener("click",function(){
var mes1=document.getElementById("check");
var mes2=document.getElementById("check2");
var mes=document.getElementById("alertv");
var btn=document.getElementById("vemail");
if(firebase.auth().currentUser.emailVerified == false){

mes1.textContent="Your email address is not verified!"
mes2.textContent="Clicking on the button below will send a verification link to your email address."
btn.style.visibility="visible";



  btn.addEventListener("click",function(){

        var eid=firebase.auth().currentUser.email;

        firebase.auth().currentUser.sendEmailVerification().then(function() {
          
          mes.textContent="Email sent. Please check your email address.";

}).catch(function(error) {
  mes.textContent=error.message;
  setTimeout(function(){window.location.href="myacc.html"},2000);
});

  });






}

else{
mes1.textContent="Your email address is already verified."
mes2.textContent="Continue shopping!"
}



 
});


//verify mail-xs

var verx=document.getElementById("acc-ve-btn");

verx.addEventListener("click",function(){
var mes1=document.getElementById("check-xs");
var mes2=document.getElementById("check2-xs");
var mes=document.getElementById("alertv-xs");
var btn=document.getElementById("vemail-xs");
if(firebase.auth().currentUser.emailVerified == false){

mes1.textContent="Your email address is not verified!"
mes2.textContent="Clicking on the button below will send a verification link to your email address."
btn.style.visibility="visible";



  btn.addEventListener("click",function(){

        var eid=firebase.auth().currentUser.email;

        firebase.auth().currentUser.sendEmailVerification().then(function() {
          
          mes.textContent="Email sent. Please check your email address.";

}).catch(function(error) {
  mes.textContent=error.message;
  setTimeout(function(){window.location.href="myacc.html"},2000);
});

  });






}

else{
mes1.textContent="Your email address is already verified."
mes2.textContent="Continue shopping!"
}



 
});







}