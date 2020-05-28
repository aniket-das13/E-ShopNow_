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



var slider = document.getElementById('slider');

noUiSlider.create(slider, {
    step: 100 ,
    start: [0, 9999],
  tooltips: [true, true],
    behaviour: "tap",
    connect: true,
    
    range: {
        'min': 0,
        '60%': 1500,
        'max': 9999}
});




var db=firebase.firestore();
db.collection("shoes").where("disc","==",null).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {

document.getElementById("noitem").style.display="none";

        var row=document.getElementById("r");
var pro=document.createElement("DIV");
pro.setAttribute("class","card");
pro.setAttribute("class","col-md-4");

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
});




var pl=document.getElementById("filter");

pl.addEventListener("click",function(){
document.getElementById("r").innerHTML="";

document.getElementById("noitem").style.display="block";


var sizeselected=0;

var values=slider.noUiSlider.get();
var low=parseInt(values[0]);
var high=parseInt(values[1]);
console.log(low);
console.log(high);

var filterflag=[null,null,null,null];
var filterflagind=[];
var sizer=[];
var filterq=null;
if(document.getElementById("size5").checked){
sizer.push(5);
sizeselected=1;
}
if(document.getElementById("size6").checked){
sizer.push(6);sizeselected=1;
}if(document.getElementById("size7").checked){
sizer.push(7);sizeselected=1;
}
if(document.getElementById("size8").checked){
sizer.push(8);sizeselected=1;
}
if(document.getElementById("size9").checked){
sizer.push(9);sizeselected=1;
}
if(document.getElementById("size10").checked){
sizer.push(10);sizeselected=1;
}
if(document.getElementById("size11").checked){
sizer.push(11);sizeselected=1;
}
console.log(sizer);

if(sizeselected==1){
filterq=firebase.firestore().collection('shoes').where("disc","==",null).where("size","array-contains-any",sizer).where("newpr",">=",low).where("newpr","<=",high);

}
else{
filterq=firebase.firestore().collection('shoes').where("disc","==",null).where("newpr",">=",low).where("newpr","<=",high);
}


if(document.getElementById("genderwomen").checked){
filterflag[0]=0;
}

if(document.getElementById("gendermen").checked){
filterflag[0]=0;
}
if(document.getElementById("brandESN").checked){

filterflag[1]=0;
}
if(document.getElementById("brandHype").checked){

filterflag[1]=0;
}
if(document.getElementById("brandNike").checked){

filterflag[1]=0;
}
if(document.getElementById("brandSkechers").checked){

filterflag[1]=0;
}
if(document.getElementById("brandUCB").checked){

filterflag[1]=0;
}if(document.getElementById("brandPuma").checked){

filterflag[1]=0;
}
if(document.getElementById("brandHP").checked){

filterflag[1]=0;
}
if(document.getElementById("colourdb").checked){

filterflag[2]=0;
}

if(document.getElementById("colournb").checked){

filterflag[2]=0;
}

if(document.getElementById("colourburg").checked){

filterflag[2]=0;
}

if(document.getElementById("colourblack").checked){

filterflag[2]=0;
}

if(document.getElementById("colourcol").checked){

filterflag[2]=0;
}

if(document.getElementById("colourbp").checked){

filterflag[2]=0;
}

if(document.getElementById("colourgray").checked){

filterflag[2]=0;
}
if(document.getElementById("colourbeige").checked){

filterflag[2]=0;
}

if(document.getElementById("colourbrown").checked){

filterflag[2]=0;
}

if(document.getElementById("disc10").checked){

filterflag[3]=0;
}
if(document.getElementById("disc20").checked){

filterflag[3]=0;
}
if(document.getElementById("disc30").checked){

filterflag[3]=0;
}
if(document.getElementById("disc40").checked){

filterflag[3]=0;
}

var ccount=0;
for(var i=0;i<filterflag.length;i++){

if(filterflag[i]==0){

  filterflagind[ccount]=i;
  ccount++;
}

}



filterq.get().then(function(querySnapshot){

    querySnapshot.forEach(function(doc){

for(var f=0; f<filterflagind.length;f++){ 
var inx=filterflagind[f];

filterflag[inx]=0;
}




if(document.getElementById("genderwomen").checked){

            if(doc.data().gender=="Women"){filterflag[0]=1;}
}

if(document.getElementById("gendermen").checked){

            if(doc.data().gender=="Men"){filterflag[0]=1;}
}
if(document.getElementById("brandESN").checked){

            if(doc.data().brand=="ESN"){filterflag[1]=1;}
}
if(document.getElementById("brandHype").checked){

if(doc.data().brand=="Hype By ESN"){filterflag[1]=1;}
}
if(document.getElementById("brandNike").checked){

if(doc.data().brand=="Nike"){filterflag[1]=1;}
}
if(document.getElementById("brandSkechers").checked){

if(doc.data().brand=="Skechers"){filterflag[1]=1;}
}
if(document.getElementById("brandUCB").checked){

if(doc.data().brand=="UCB"){filterflag[1]=1;}

}
if(document.getElementById("brandPuma").checked){


if(doc.data().brand=="Puma"){filterflag[1]=1;}
}
if(document.getElementById("brandHP").checked){


if(doc.data().brand=="Hush Pupppies"){filterflag[1]=1;}
}
if(document.getElementById("colourdb").checked){


if(doc.data().colour=="Dark Blue"){filterflag[2]=1;}
}

if(document.getElementById("colournb").checked){

if(doc.data().colour=="Navy Blue"){filterflag[2]=1;}
}

if(document.getElementById("colourburg").checked){
if(doc.data().colour=="Burgandy"){filterflag[2]=1;}
}

if(document.getElementById("colourblack").checked){

if(doc.data().colour=="Black"){filterflag[2]=1;}
}

if(document.getElementById("colourcol").checked){

if(doc.data().colour=="Colourful"){filterflag[2]=1;}
}

if(document.getElementById("colourbp").checked){

if(doc.data().colour=="Baby Pink"){filterflag[2]=1;}
}

if(document.getElementById("colourgray").checked){

if(doc.data().colour=="Gray"){filterflag[2]=1;}
}
if(document.getElementById("colourbeige").checked){

if(doc.data().colour=="Beige"){filterflag[2]=1;}
}

if(document.getElementById("colourbrown").checked){

if(doc.data().colour=="Brown"){filterflag[2]=1;}
}

if(document.getElementById("disc10").checked){

if(doc.data().disc==10){filterflag[3]=1;}
}
if(document.getElementById("disc20").checked){


if(doc.data().disc==20){filterflag[3]=1;}
}
if(document.getElementById("disc30").checked){


if(doc.data().disc==30){filterflag[3]=1;}
}
if(document.getElementById("disc40").checked){


if(doc.data().disc==40){filterflag[3]=1;}
}

var check=0;

for(var a=0;a<filterflagind.length;a++){
var ind=filterflagind[a];
if(filterflag[ind]==1){
++check;
}

}




if(check==filterflagind.length){


document.getElementById("noitem").style.display="none";





        var row=document.getElementById("r");
var pro=document.createElement("DIV");
pro.setAttribute("class","card");
pro.setAttribute("class","col-md-4");

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

}


    
    });



});












});










}