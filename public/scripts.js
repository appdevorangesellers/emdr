
var obj = document.getElementById("movingDiv");
var body = document.getElementById("canvas");


function getNumbers(){
  var data = document.getElementById("number").value;
  var dataa = document.getElementById("numbers").value;
  console.log(`data = ${data}`);
    console.log(`dataa = ${dataa}`);
  if(data == dataa){
    location.href('http://localhost:3000/videosession/videolayer');
  }
  else{
    alert("You typed: " + "Wrong code");
  }
}
