window.onload=function(){

$(document).ready(function(){
        $("#staticBackdrop").modal('show');
    });


$('#signupbtn').click(function(e){
   e.preventDefault();

});

$('#signinbtn').click(function(e){
   e.preventDefault();

});

$('#f').click(function(e){
   e.preventDefault();

});


firebase.auth().signOut().catch(function(error) {
  console.log("no user");
});

$("#show_hide_password a").on('click', function(event) {
        event.preventDefault();
        if($('#show_hide_password input').attr("type") == "text"){
            $('#show_hide_password input').attr('type', 'password');
            $('#show_hide_password i').addClass( "fa-eye-slash" );
            $('#show_hide_password i').removeClass( "fa-eye" );
        }else if($('#show_hide_password input').attr("type") == "password"){
            $('#show_hide_password input').attr('type', 'text');
            $('#show_hide_password i').removeClass( "fa-eye-slash" );
            $('#show_hide_password i').addClass( "fa-eye" );
        }
    });

$("#show_hide_password1 a").on('click', function(event) {
        event.preventDefault();
        if($('#show_hide_password1 input').attr("type") == "text"){
            $('#show_hide_password1 input').attr('type', 'password');
            $('#show_hide_password1 i').addClass( "fa-eye-slash" );
            $('#show_hide_password1 i').removeClass( "fa-eye" );
        }else if($('#show_hide_password1 input').attr("type") == "password"){
            $('#show_hide_password1 input').attr('type', 'text');
            $('#show_hide_password1 i').removeClass( "fa-eye-slash" );
            $('#show_hide_password1 i').addClass( "fa-eye" );
        }
    });




const suname= document.getElementById("signupname");
const suemail= document.getElementById("signupemail");
const supwd= document.getElementById("signuppwd");
const signupbtn= document.getElementById("signupbtn");

const simail= document.getElementById("signinemail");
const sipwd= document.getElementById("signinpwd");
const signinbtn= document.getElementById("signinbtn");


signupbtn.addEventListener("click", function(){


const email= suemail.value;
const pwd= supwd.value;
const name= suname.value;




const promise= firebase.auth().createUserWithEmailAndPassword(email, pwd);

promise.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  var mes=document.getElementById("details");
          mes.textContent=errorMessage+" You will be redirected. Try Again!";
    



setTimeout(function(){window.location.href="index.html";},2000);



           
       });


firebase.auth().onAuthStateChanged(firebaseUser=>{   
  if (firebaseUser) {

      firebase.auth().currentUser.updateProfile({
  displayName: name,
  emailVerified: "true"
}).catch(function(error) {

  console.log(error.message);
});

      console.log(firebaseUser);


 }

  else {  
   console.log("no user signed in");  
  }  
 


 });


setTimeout(function(){firebase.auth().onAuthStateChanged(fu=>{if(fu){window.location.href="signedin.html";}});},3000);






});




signinbtn.addEventListener("click",function(){


const email= simail.value;
const pwd= sipwd.value;


firebase.auth().signInWithEmailAndPassword(email, pwd).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

var mes=document.getElementById("details");
          mes.textContent=errorMessage+" You will be redirected. Try Again!";

    
setTimeout(function(){window.location.href="index.html";},2000);
  });


setTimeout(function(){firebase.auth().onAuthStateChanged(fu=>{if(fu){window.location.href="signedin.html";}});},3000);


}



  );




var forgot=document.getElementById("f");

forgot.addEventListener("click",function(){

var mes=document.getElementById("details");
var email=simail.value;

if(email==""){
mes.textContent="Enter your registered email address";
}

else { 

 firebase.auth().sendPasswordResetEmail(email).then(function() {

  mes.textContent="Password reset link sent successfully. Please check !";
}).catch(function(error) {

  mes.textContent=error.message;
  

setTimeout(function(){window.location.href="index.html";},2000);





  
});        
 

 }




});






        






};



