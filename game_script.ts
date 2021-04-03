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
    fade(calc_panel);
    calc_panel.remove();
    button.remove();
    startSession();

    }

var task_1_fiz_address : string;
var task_1_stack_address : string;

function loadNextTask() {   
    var task_panel = document.createElement("div");
    task_panel.id = "task_panel";

    GetId("main").append(task_panel);
    fadeIn(task_panel);

    loadTask1();
}

function startSession() {

    //let random_number = Math.floor(Math.random() * 2);
    loadNextTask();
}

function finishTask() {
    //fade(GetId("task_panel"));
    GetId("task_panel").remove()
    loadNextTask();
}

function loadTask1(){
    // createTextRow(`Вычислите физический адрес следующей исполняемой команды.
    // Вычислите адрес вершины стека.`);

    let cs = Math.floor(Math.random() * 65535);
    let ss = Math.floor(Math.random() * 65535);
    let ip = Math.floor(Math.random() * 65535);
    let sp = Math.floor(Math.random() * 65535);

    task_1_fiz_address = (cs * 16 + ip).toString(16).toUpperCase();
    task_1_stack_address = (ss * 16 + sp).toString(16).toUpperCase();

    createBitRow("CS", cs);
    createBitRow("SS", ss);
    createBitRow("SP", sp);
    createBitRow("IP", ip);

    createTextRow(`Вычислите физический адрес следующей исполняемой команды.`);
    var row = document.createElement("div");
    CreateRow(row);
    var input_element = document.createElement("input");
    row.append(input_element);
    input_element.className = "input_element";
    input_element.type = "text";
    input_element.id = "first_answ";
    input_element.placeholder = "FFFFF";

    input_element.addEventListener('input', checkResult);

    createTextRow(`Вычислите адрес вершины стека.`);

    var row = document.createElement("div");
    CreateRow(row);
    var input_element = document.createElement("input");
    row.append(input_element);
    input_element.className = "input_element";
    input_element.type = "text";
    input_element.id = "second_answ";
    input_element.placeholder = "FFFFF";
    input_element.addEventListener('input', checkResult);
    // input_element.pattern = "[0-1]*"
}

function checkResult(e){
    console.log("Results:", task_1_fiz_address, task_1_stack_address);
    var first_answer : string = (<HTMLInputElement>GetId("first_answ")).value.toUpperCase();
    var second_answer:  string = (<HTMLInputElement>GetId("second_answ")).value.toUpperCase();

    console.log("Current:", first_answer, second_answer);

    e.target.value = e.target.value.toUpperCase();
    if (first_answer == task_1_fiz_address) {
        GetId("first_answ").className = "input_element_correct";
    } else {
        GetId("first_answ").className = "input_element_incorrect";
    }

     if (second_answer == task_1_stack_address) {
        GetId("second_answ").className = "input_element_correct";
    } else {
        GetId("second_answ").className = "input_element_incorrect";
    }


   if ((first_answer == task_1_fiz_address) && (second_answer == task_1_stack_address)) {
       finishTask();
   }




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

function createBitRow(suffix: string, random_number : number) {
  
     let row = document.createElement("div");
     CreateRow(row); 


     let bit_row  = document.createElement("div");
     createBitRowDiv(bit_row);
     row.append(bit_row);
     createBits(bit_row, suffix, random_number);
}

function CreateRow(row) {
    row.className = "row";
    GetId("task_panel").append(row);
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
        bit.className = "bit_button_2";
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
            dot.className = "bit_button_2";
            dot.innerHTML = ".";
            bit_row.append(dot);
        }
    }
}

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        console.log("test");
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 3000);
    return true
}

function fadeIn(element) {
    var op = 0.01;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 20);
}