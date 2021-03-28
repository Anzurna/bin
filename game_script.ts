function GetId(id : string) {
    return document.getElementById(id);
}

var byte_str = "0000000000000000";

function GetNumValue(id : string) : Number {
    return Number(document.getElementById(id).innerHTML);
}

function FlipBit(button) {
    var byte_arr = []
    byte_arr = byte_str.split("");
    if (button.innerHTML == "0") {
        button.innerHTML = "1";
        byte_arr[15 - button.dataset.val] = "1"
    } else {
        button.innerHTML = "0";
        byte_arr[15 - button.dataset.val] = "0"
    }   
    byte_str = byte_arr.join("");

    var dec_number = parseInt(byte_str, 2);
    GetId("result").innerHTML = dec_number.toString();
    CalcHex(dec_number);
}

var elements = document.getElementsByClassName("bit_button");

for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', function() {
    FlipBit(this); //Here you will need to use the param.
    });
}

function CalcHex(dec_number : number) {
    var hex_string : string = dec_number.toString(16);
    hex_string = hex_string.split("").reverse().join("");
    for (i = 0; i < 4; i++) {
        if (hex_string.length > i) {
            GetId("hl_" + (i)).innerHTML = hex_string.charAt(i).toUpperCase();
        } else {
            GetId("hl_" + (i)).innerHTML = "0";
        }
    }
}