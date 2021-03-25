// function greeter(person : string) {
//   return "Hello, " + person;
// }

// let user = "Jane User";

// document.body.textContent = greeter(user);


// document.getElementById("2").onclick = function(){
//   alert("Button Clicked");
// }

function FlipBit(button) {
    if (button.innerHTML == "0") button.innerHTML = "1";
    else button.innerHTML = "0";
}

var elements = document.getElementsByClassName("bit_button");

for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', function() {
    FlipBit(this); //Here you will need to use the param.
    });
}