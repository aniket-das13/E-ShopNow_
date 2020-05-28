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
 
 });



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
var str=null;
firebase.firestore().collection("temp").doc("2").get().then(function(doc){

str= doc.data().searchstr;

document.getElementById("searchtop").textContent=" Your search results for '"+str+"'";


var start_char=str.charAt(0).toUpperCase();
var sliced=str.slice(1);
str=start_char+sliced;
console.log(str);

for(var i=0;i<str.length;i++){
  if(str[i]==" "){

        var sc=str.charAt(i+1).toUpperCase();
        var slcd=str.slice(i+2);
        str=str.substr(0,i+1)+sc+slcd;


      }

      }




var strSearch = str;
var strlength = strSearch.length;
var strFrontCode = strSearch.slice(0, strlength-1);
var strEndCode = strSearch.slice(strlength-1, strSearch.length);

var startcode = strSearch;




var endcode= strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);




firebase.firestore().collection("shoes").where('brand_desc', '>=', startcode)
.where('brand_desc', '<', endcode).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            

 document.getElementById("noitem").style.display="none";


        var row=document.getElementById("r");
var pro=document.createElement("DIV");
pro.setAttribute("class","card");
pro.setAttribute("class","col-md-3");

pro.id="product";

var body=document.createElement("div");
body.setAttribute("class","card-body"); 
body.setAttribute("style","border-radius:10px; height:100%;");
 var pic=document.createElement("img");
 pic.id="pic";
 pic.setAttribute("class","card-img-top");
  pic.setAttribute("class","mb-2");
  pic.setAttribute("style","border-radius:10px;");
 pic.setAttribute("src",doc.data().ur);

var title=document.createElement("h6");
title.setAttribute("class","card-body");
title.setAttribute("class","text-center");
title.textContent= doc.data().brand+" "+doc.data().desc;

var st=document.createElement("s");
st.setAttribute("class","text-center");
st.setAttribute("style"," opacity:60%; display:none; font-size: 16px;");

var price=document.createElement("h6");
price.setAttribute("class","text-center");

if(doc.data().disc!=null){
var gn=document.createElement("small");
gn.id="gn";

gn.textContent=doc.data().disc+"% Discount"
body.appendChild(gn);


st.textContent="₹ "+doc.data().pr;
st.style.display="block";

var finalp=Math.round((doc.data().pr)-(((doc.data().pr)*(doc.data().disc))/100));
price.textContent="₹ "+finalp;

}
else{price.textContent="₹ "+doc.data().pr;

}

price.appendChild(document.createElement("br"));
price.appendChild(document.createElement("br"));
var link=document.createElement("button");
link.setAttribute("href","product.html");

link.setAttribute("class","btn btn-outline-warning");

link.setAttribute("style","font-size: 0.8em;");
link.id=doc.id;
link.textContent="See Details";

body.appendChild(pic);
body.appendChild(title);
body.appendChild(st);
body.appendChild(price);
price.appendChild(link)
pro.appendChild(body);
row.appendChild(pro);

var btn=document.getElementById(link.id);

btn.addEventListener("click",function(){
       var db=firebase.firestore();
// Add a new document in collection "cities"
db.collection("plist").doc("1").set({
    search: link.id
})
.then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
       setTimeout(function(){
       window.location.href="product.html";
},1500);

     
});



       



        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });





});
  setTimeout(function(){
      firebase.firestore().collection("temp").doc("2").delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
},4000);













}