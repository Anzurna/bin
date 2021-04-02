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
    (<HTMLInputElement>GetId("result")).value = dec_number.toString();
    (<HTMLInputElement>GetId("hl_0")).value = dec_number.toString(16);//.toUpperCase();
    (<HTMLInputElement>GetId("ol_0")).value = dec_number.toString(8);
    // CalcHex(dec_number, "hl", 16, 4);
    // CalcHex(dec_number, "ol", 8, 6);
}

var elements = document.getElementsByClassName("bit_button");

for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', function() {
    FlipBit(this); //Here you will need to use the param.
    });
}

var calc_panel = document.getElementById("calc_panel");
var button = GetId("exercises_button");

 button.onclick = function() { 
     calc_panel.remove();
    createTextRow(`Вычислите физический адрес следующей исполняемой команды.
    Вычислите адрес вершины стека.`);
   
     createBitRow("CS");
     createBitRow("DS");
     createBitRow("SS");
     createBitRow("SP");
     createBitRow("IP");



    var row = document.createElement("div");
    CreateRow(row);
    var input_element = document.createElement("input");
    row.append(input_element);
    input_element.className = "input_element";
    input_element.type = "number";
    input_element.id = "first_answ";
    input_element.placeholder = "0000000000000000";

    var row = document.createElement("div");
    CreateRow(row);
    var input_element = document.createElement("input");
    row.append(input_element);
    input_element.className = "input_element";
    input_element.type = "number";
    input_element.id = "second_answ";
    input_element.placeholder = "0000000000000000";


    button.remove();
    //  let row = document.createElement("div");
    //  CreateRow(row); 
    //  let bit_row  = document.createElement("div");
    //  createBitRowDiv(bit_row);
    //  row.append(bit_row);
    //  createBits(bit_row, "cs");
     }

function createTextRow(text : string) {
    let row = document.createElement("div");
    CreateRow(row); 
    let task_string  = document.createElement("div");
    task_string.className = "task_string";
    row.append(task_string);
    task_string.innerHTML = text;
}

function CalcHex(dec_number : number, id_base : string, dig_capasity : number, amount : number) {
    var hex_string : string = dec_number.toString(dig_capasity);
    hex_string = hex_string.split("").reverse().join("");
    for (i = 0; i < amount; i++) {
        if (hex_string.length > i) {
            GetId(id_base + "_" + (i)).innerHTML = hex_string.charAt(i).toUpperCase();
        } else {
            GetId(id_base + "_" + (i)).innerHTML = "0";
        }
    }
}

// function onExerciseButtonClick() {
//     calc_panel.remove();
//     CreateBitRow(); 
// }

function createBitRow(suffix: string) {
  
    let random_number = Math.floor(Math.random() * 65535);

     let row = document.createElement("div");
     CreateRow(row); 


     let bit_row  = document.createElement("div");
     createBitRowDiv(bit_row);
     row.append(bit_row);
     createBits(bit_row, suffix, random_number);
}

function CreateRow(row) {
    row.className = "row";
    GetId("main").append(row);
}

function createBitRowDiv(bit_row) {
    bit_row.className = "hex_numbers";
}

function createBits(bit_row, suffix : string, random_number : number) {
    let label = document.createElement("p");
            label.className = "hint";
            label.innerHTML = suffix;
            bit_row.append(label);

    let bit_string = random_number.toString(2);
     //console.log(bit_string);
    let reversed_string = bit_string.split("").reverse().join("")
    console.log(bit_string);


    for (let bit_number = 15; bit_number >= 0; bit_number--) {      
        let bit = document.createElement("button");
        bit.className = "bit_button";
        bit.type = "button";
        bit.dataset.value = bit_number + suffix;
        if (reversed_string[bit_number] == undefined) {
            bit.innerHTML = "0";
        } else {
            bit.innerHTML = reversed_string[bit_number];
        }

        bit_row.append(bit);
        if ((bit_number) % 4 == 0 && bit_number != 0) {
            let dot = document.createElement("p");
            dot.className = "label_1";
            dot.innerHTML = ".";
            bit_row.append(dot);
        }
    }
}