var scale_of_notation_types = [2, 8, 16, 10];

var bin_information_from = {
    2: "двоичной",
    8: "восьмеричной",
    10: "десятичной",
    16: "шестнадцатеричной"
};

var bin_information_to = {
    2: "двоичную",
    8: "восьмеричную",
    10: "десятичную",
    16: "шестнадцатеричную"
};

var task_1_fiz_address : string;
var task_1_stack_address : string;
var typeOfSession : string;

function GetId(id : string) {
    return document.getElementById(id);
}

var byte_str = "0000000000000000";

function GetNumValue(id : string) : Number {
    return Number(document.getElementById(id).innerHTML);
}



window.onload = function() {
    addCalculatorListeners()
    addMenuListeners()
    var elements = document.getElementsByClassName("bit_button");

    for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', function() {
    FlipBit(this); //Here you will need to use the param.
    });
}
}

function toggleBetweenClasses(items, firstClass : string, secondClass : string) {
    for (var i = 0; i < items.length; i++) {
            items.item(i).classList.toggle(firstClass, true);           
            items.item(i).classList.toggle(secondClass, false);
        }
}


function addCalculatorListeners() {
    var input8 = GetId("ol_0")
    input8.addEventListener("mouseenter", function( event ) {
        GetId("oct_addit_1").classList.remove("hidden");
        GetId("oct_addit_2").classList.remove("hidden");
        var hidden_octal_separators = document.querySelectorAll(".oct_label_hidden")
        toggleBetweenClasses(hidden_octal_separators, "label_1", "oct_label_hidden");
    }, false);

    input8.addEventListener("mouseleave", function( event ) {
        GetId("oct_addit_1").classList.add("hidden");
        GetId("oct_addit_2").classList.add("hidden");
        var octal_separators = document.querySelectorAll(".label_1")
        toggleBetweenClasses(octal_separators, "oct_label_hidden", "label_1");
    }, false);

    var input16 = GetId("hl_0")

    input16.addEventListener("mouseenter", function( event ) {
        var hidden_hex_separators = document.querySelectorAll(".hex_label_hidden")
        toggleBetweenClasses(hidden_hex_separators, "label_1", "hex_label_hidden");
    }, false);

    input16.addEventListener("mouseleave", function( event ) {
        var hex_separators = document.querySelectorAll(".label_1")
        toggleBetweenClasses(hex_separators, "hex_label_hidden", "label_1");
    }, false);
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



function addMenuListeners() {
    var calc_panel = document.getElementById("calc_panel");
    var x86_button = GetId("exercises_button");

    x86_button.onclick = function() { 
        fade(calc_panel, removeElement("calc_panel"));
        x86_button.remove();
        startSession("x86");
    }

    var binary_excercises_button = GetId("binary_tasks_start");
    binary_excercises_button.onclick = function() {
        fade(calc_panel, removeElement("calc_panel"));
        startSession("binary");
    }
}

function startSession(_typeOfSession: string) {
    //let random_number = Math.floor(Math.random() * 2);
    typeOfSession = _typeOfSession;
    loadNextTask();    
}

function loadNextTask() {   
    var task_panel = document.createElement("div");
    task_panel.id = "task_panel";

    GetId("main").append(task_panel);
    fadeIn(task_panel);
    if (typeOfSession == "x86") {
        loadTask1();
    }
    if (typeOfSession == "binary") {
        loadBinaryTask_1();
    }
    
}

//var task_number : number = 1;


function finishTask() {

    //task_number++;
    var task_panel = GetId("task_panel");
    setTimeout(() => fade1(task_panel), 500);

    setTimeout(() => removeElement("task_panel"), 1000);
    setTimeout(loadNextTask, 1000);
    // loadNextTask();
}

function removeElement(el : string) {
    console.log("Function!")
    GetId(el).remove();
}



function loadBinaryTask_1() {
    var scale_from : number = 0;
    var scale_to : number = 0;
    while (scale_from == scale_to) {
        scale_from = Math.floor(Math.random() * 4);
        scale_to = Math.floor(Math.random() * 4);
    }
    scale_from = scale_of_notation_types[scale_from];
    scale_to = scale_of_notation_types[scale_to];

    let scale_from_name  = bin_information_from[scale_from];
    let scale_to_name = bin_information_to[scale_to];

    createTextRow(`Переведите число из ${scale_from_name} системы счисления в ${scale_to_name}.`);

    var conditions = genTranslateTaskConditions(scale_from, scale_to)

    addHintedRow(scale_from.toString(), conditions["question"]);
    console.log(conditions["answer"])
    addHintedRowWithInputAndButton(scale_to, "bin_task_button", "bin_task_input")

    GetId("bin_task_button").onclick = function() {
        if (GetId("bin_task_input").value == conditions["answer"]) {
            GetId("bin_task_input").className = "input_element_correct";
           
            finishTask()
        } else {
            GetId("bin_task_input").className = "input_element_incorrect";
        }
    }

    // var element = `<div class="row"><div class="hex_numbers">${random}</div></div>`;
    // GetId("task_panel").insertAdjacentHTML("beforeend",element);
}

function addHintedRow(hint:string, value: string) {
    var element = `<div class="row">
                        <div class="hex_numbers">
                            <p class="hint">${hint}</p>
                            <div class="hex_label">${value} </div>
                        </div>
                    </div>`;

    GetId("task_panel").insertAdjacentHTML("beforeend",element);
}
function addHintedRowWithInputAndButton(hint:string, button_id: string, input_id:string) {
    var element = `<div class="row">
                        <div class="hex_numbers">
                            <p class="hint">${hint}</p>
                            <input class="input_element" id="${input_id}" type="text" placeholder="0">
                            <button class="menu_button" id="${button_id}" type="button">Проверить</button>
                        </div>
                    </div>`;

    GetId("task_panel").insertAdjacentHTML("beforeend",element);
}

function genTranslateTaskConditions(scale_from : number, scale_to : number) {
    var random = Math.floor(Math.random() * 65536);
    var question : string = transform(random, scale_from);
    var answer = transform(random, scale_to);

    return {"question": question, "answer": answer}
}

function transform(num : number, scale_target : number) : string{
    switch(scale_target) {
        case 2:
            return num.toString(2);
        case 8:
            return num.toString(8);
        case 16: 
            return num.toString(16).toUpperCase();
        default:
            return num.toString();
    }
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

    // var row = document.createElement("div");
    // CreateRow(row);
    // row.className = "row"
    // var task_num = document.createElement("p");
    // task_num.className = "task_number";
    // task_num.innerHTML = task_number.toString();
    // row.append(task_num);

    createFirstBitRow("CS", cs);
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

    var task_num = document.createElement("p");
    task_num.className = "task_number";
    //task_num.innerHTML = task_number.toString();
    GetId("first_row").append(task_num);
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
    for (let i = 0; i < amount; i++) {
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

function createFirstBitRow(suffix: string, random_number : number) {
  
     let row = document.createElement("div");
     CreateRow(row); 
     row.id = "first_row";

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

function fade(element, callback) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            console.log(op)
            clearInterval(timer);
            element.style.display = 'none';
            callback && callback();
            
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 20);
    
}

function fade1(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';            
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 20);
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