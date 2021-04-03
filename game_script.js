function GetId(id) {
    return document.getElementById(id);
}
var byte_str = "0000000000000000";
function GetNumValue(id) {
    return Number(document.getElementById(id).innerHTML);
}
function FlipBit(button) {
    var byte_arr = [];
    byte_arr = byte_str.split("");
    if (button.innerHTML == "0") {
        button.innerHTML = "1";
        byte_arr[15 - button.dataset.val] = "1";
    }
    else {
        button.innerHTML = "0";
        byte_arr[15 - button.dataset.val] = "0";
    }
    byte_str = byte_arr.join("");
    var dec_number = parseInt(byte_str, 2);
    GetId("result").value = dec_number.toString();
    GetId("hl_0").value = dec_number.toString(16); //.toUpperCase();
    GetId("ol_0").value = dec_number.toString(8);
    // CalcHex(dec_number, "hl", 16, 4);
    // CalcHex(dec_number, "ol", 8, 6);
}
var elements = document.getElementsByClassName("bit_button");
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', function () {
        FlipBit(this); //Here you will need to use the param.
    });
}
var calc_panel = document.getElementById("calc_panel");
var button = GetId("exercises_button");
button.onclick = function () {
    //
    fade(calc_panel, removeElement("calc_panel"));
    button.remove();
    startSession();
};
var task_1_fiz_address;
var task_1_stack_address;
function loadNextTask() {
    var task_panel = document.createElement("div");
    task_panel.id = "task_panel";
    GetId("main").append(task_panel);
    fadeIn(task_panel);
    loadTask1();
}
var task_number = 1;
function startSession() {
    //let random_number = Math.floor(Math.random() * 2);
    loadNextTask();
}
function finishTask() {
    task_number++;
    fade1(GetId("task_panel"));
    removeElement("task_panel");
    loadNextTask();
}
function removeElement(el) {
    console.log("Function!");
    GetId(el).remove();
}
function loadTask1() {
    // createTextRow(`Вычислите физический адрес следующей исполняемой команды.
    // Вычислите адрес вершины стека.`);
    var cs = Math.floor(Math.random() * 65535);
    var ss = Math.floor(Math.random() * 65535);
    var ip = Math.floor(Math.random() * 65535);
    var sp = Math.floor(Math.random() * 65535);
    task_1_fiz_address = (cs * 16 + ip).toString(16).toUpperCase();
    task_1_stack_address = (ss * 16 + sp).toString(16).toUpperCase();
    var row = document.createElement("div");
    CreateRow(row);
    row.className = "row";
    var task_num = document.createElement("p");
    task_num.className = "task_number";
    task_num.innerHTML = task_number.toString();
    row.append(task_num);
    createBitRow("CS", cs);
    createBitRow("SS", ss);
    createBitRow("SP", sp);
    createBitRow("IP", ip);
    createTextRow("\u0412\u044B\u0447\u0438\u0441\u043B\u0438\u0442\u0435 \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0430\u0434\u0440\u0435\u0441 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0439 \u0438\u0441\u043F\u043E\u043B\u043D\u044F\u0435\u043C\u043E\u0439 \u043A\u043E\u043C\u0430\u043D\u0434\u044B.");
    var row = document.createElement("div");
    CreateRow(row);
    var input_element = document.createElement("input");
    row.append(input_element);
    input_element.className = "input_element";
    input_element.type = "text";
    input_element.id = "first_answ";
    input_element.placeholder = "FFFFF";
    input_element.addEventListener('input', checkResult);
    createTextRow("\u0412\u044B\u0447\u0438\u0441\u043B\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u0432\u0435\u0440\u0448\u0438\u043D\u044B \u0441\u0442\u0435\u043A\u0430.");
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
function checkResult(e) {
    console.log("Results:", task_1_fiz_address, task_1_stack_address);
    var first_answer = GetId("first_answ").value.toUpperCase();
    var second_answer = GetId("second_answ").value.toUpperCase();
    console.log("Current:", first_answer, second_answer);
    e.target.value = e.target.value.toUpperCase();
    if (first_answer == task_1_fiz_address) {
        GetId("first_answ").className = "input_element_correct";
    }
    else {
        GetId("first_answ").className = "input_element_incorrect";
    }
    if (second_answer == task_1_stack_address) {
        GetId("second_answ").className = "input_element_correct";
    }
    else {
        GetId("second_answ").className = "input_element_incorrect";
    }
    if ((first_answer == task_1_fiz_address) && (second_answer == task_1_stack_address)) {
        finishTask();
    }
}
function createTextRow(text) {
    var row = document.createElement("div");
    CreateRow(row);
    var task_string = document.createElement("div");
    task_string.className = "task_string";
    row.append(task_string);
    task_string.innerHTML = text;
}
function CalcHex(dec_number, id_base, dig_capasity, amount) {
    var hex_string = dec_number.toString(dig_capasity);
    hex_string = hex_string.split("").reverse().join("");
    for (i = 0; i < amount; i++) {
        if (hex_string.length > i) {
            GetId(id_base + "_" + (i)).innerHTML = hex_string.charAt(i).toUpperCase();
        }
        else {
            GetId(id_base + "_" + (i)).innerHTML = "0";
        }
    }
}
// function onExerciseButtonClick() {
//     calc_panel.remove();
//     CreateBitRow(); 
// }
function createBitRow(suffix, random_number) {
    var row = document.createElement("div");
    CreateRow(row);
    var bit_row = document.createElement("div");
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
function createBits(bit_row, suffix, random_number) {
    var label = document.createElement("p");
    label.className = "hint";
    label.innerHTML = suffix;
    bit_row.append(label);
    var bit_string = random_number.toString(2);
    //console.log(bit_string);
    var reversed_string = bit_string.split("").reverse().join("");
    console.log(bit_string);
    for (var bit_number = 15; bit_number >= 0; bit_number--) {
        var bit = document.createElement("button");
        bit.className = "bit_button_2";
        bit.type = "button";
        bit.dataset.value = bit_number + suffix;
        if (reversed_string[bit_number] == undefined) {
            bit.innerHTML = "0";
        }
        else {
            bit.innerHTML = reversed_string[bit_number];
        }
        bit_row.append(bit);
        if ((bit_number) % 4 == 0 && bit_number != 0) {
            var dot = document.createElement("p");
            dot.className = "bit_button_2";
            dot.innerHTML = ".";
            bit_row.append(dot);
        }
    }
}
function fade(element, callback) {
    var op = 1; // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1) {
            console.log(op);
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 20);
    callback && callback();
}
function fade1(element) {
    var op = 1; // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 20);
}
function fadeIn(element) {
    var op = 0.01; // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 20);
}
