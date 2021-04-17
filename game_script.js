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
var task_1_fiz_address;
var task_1_stack_address;
var typeOfSession;
function GetId(id) {
    return document.getElementById(id);
}
var byte_str = "0000000000000000";
function GetNumValue(id) {
    return Number(document.getElementById(id).innerHTML);
}
window.onload = function () {
    addCalculatorListeners();
    addMenuListeners();
    var elements = document.getElementsByClassName("bit_button");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', function () {
            FlipBit(this); //Here you will need to use the param.
        });
    }
};
function toggleBetweenClasses(items, firstClass, secondClass) {
    for (var i = 0; i < items.length; i++) {
        items.item(i).classList.toggle(firstClass, true);
        items.item(i).classList.toggle(secondClass, false);
    }
}
function addCalculatorListeners() {
    var input8 = GetId("ol_0");
    input8.addEventListener("mouseenter", function (event) {
        GetId("oct_addit_1").classList.remove("hidden");
        GetId("oct_addit_2").classList.remove("hidden");
        var hidden_octal_separators = document.querySelectorAll(".oct_label_hidden");
        toggleBetweenClasses(hidden_octal_separators, "label_1", "oct_label_hidden");
    }, false);
    input8.addEventListener("mouseleave", function (event) {
        GetId("oct_addit_1").classList.add("hidden");
        GetId("oct_addit_2").classList.add("hidden");
        var octal_separators = document.querySelectorAll(".label_1");
        toggleBetweenClasses(octal_separators, "oct_label_hidden", "label_1");
    }, false);
    var input16 = GetId("hl_0");
    input16.addEventListener("mouseenter", function (event) {
        var hidden_hex_separators = document.querySelectorAll(".hex_label_hidden");
        toggleBetweenClasses(hidden_hex_separators, "label_1", "hex_label_hidden");
    }, false);
    input16.addEventListener("mouseleave", function (event) {
        var hex_separators = document.querySelectorAll(".label_1");
        toggleBetweenClasses(hex_separators, "hex_label_hidden", "label_1");
    }, false);
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
function addMenuListeners() {
    var calc_panel = document.getElementById("calc_panel");
    var x86_button = GetId("exercises_button");
    x86_button.onclick = function () {
        fade(calc_panel, removeElement("calc_panel"));
        x86_button.remove();
        startSession("x86");
    };
    var binary_excercises_button = GetId("binary_tasks_start");
    binary_excercises_button.onclick = function () {
        fade(calc_panel, removeElement("calc_panel"));
        startSession("binary");
    };
}
function startSession(_typeOfSession) {
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
        var task_selector = Math.floor(Math.random() * 3);
        console.log(task_selector);
        switch (task_selector) {
            case 0:
                loadBinaryTask_1();
                break;
            case 1:
                loadBinaryTask_2();
                break;
            case 2:
                loadNetTask_1();
                break;
        }
    }
}
//var task_number : number = 1;
function finishTask() {
    var task_panel = GetId("task_panel");
    setTimeout(function () { return fade1(task_panel); }, 500);
    setTimeout(function () { return removeElement("task_panel"); }, 1000);
    setTimeout(loadNextTask, 1000);
    // loadNextTask();
}
function removeElement(el) {
    console.log("Function!");
    GetId(el).remove();
}
function loadBinaryTask_1() {
    var scale_from = 0;
    var scale_to = 0;
    while (scale_from == scale_to) {
        scale_from = Math.floor(Math.random() * 4);
        scale_to = Math.floor(Math.random() * 4);
    }
    scale_from = scale_of_notation_types[scale_from];
    scale_to = scale_of_notation_types[scale_to];
    var scale_from_name = bin_information_from[scale_from];
    var scale_to_name = bin_information_to[scale_to];
    createTextRow("\u041F\u0435\u0440\u0435\u0432\u0435\u0434\u0438\u0442\u0435 \u0447\u0438\u0441\u043B\u043E \u0438\u0437 " + scale_from_name + " \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0441\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F \u0432 " + scale_to_name + ".");
    var conditions = genTranslateTaskConditions(scale_from, scale_to);
    addHintedRow(scale_from.toString(), conditions["question"]);
    console.log(conditions["answer"]);
    addHintedRowWithInputAndButton(scale_to, "bin_task_button", "bin_task_input");
    GetId("bin_task_button").onclick = function () {
        if (GetId("bin_task_input").value == conditions["answer"]) {
            GetId("bin_task_input").className = "input_element_correct";
            finishTask();
        }
        else {
            GetId("bin_task_input").className = "input_element_incorrect";
        }
    };
}
function loadBinaryTask_2() {
    var task_2_type = Math.floor(Math.random() * 2);
    var operand_1_scale = 10;
    var operand_2_scale = 10;
    while (operand_1_scale == 10 && operand_1_scale == 10) {
        operand_1_scale = scale_of_notation_types[Math.floor(Math.random() * 4)];
        operand_2_scale = scale_of_notation_types[Math.floor(Math.random() * 4)];
    }
    var result_scale = scale_of_notation_types[Math.floor(Math.random() * 4)];
    var operand_1 = Math.floor(Math.random() * 4096);
    var operand_2 = Math.floor(Math.random() * 4096);
    var operand_1_str = transform(operand_1, operand_1_scale);
    var operand_2_str = transform(operand_2, operand_2_scale);
    var result;
    if (task_2_type == 0) {
        createTextRow("\u0421\u043B\u043E\u0436\u0438\u0442\u0435 \u0447\u0438\u0441\u043B\u0430.");
        result = operand_1 + operand_2;
    }
    else if (task_2_type == 1) {
        createTextRow("\u0412\u044B\u0447\u0442\u0438\u0442\u0435 \u0432\u0442\u043E\u0440\u043E\u0435 \u0447\u0438\u0441\u043B\u043E \u0438\u0437 \u043F\u0435\u0440\u0432\u043E\u0433\u043E. \u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043E\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C.");
        result = operand_1 - operand_2;
    }
    var result_str = transform(result, result_scale);
    addHintedRow(operand_1_scale.toString(), operand_1_str);
    addHintedRow(operand_2_scale.toString(), operand_2_str);
    addHintedRowWithInputAndButton(result_scale.toString(), "bin_task_button", "bin_task_input");
    console.log(result_str);
    GetId("bin_task_button").onclick = function () {
        if (GetId("bin_task_input").value == result_str) {
            GetId("bin_task_input").className = "input_element_correct";
            finishTask();
        }
        else {
            GetId("bin_task_input").className = "input_element_incorrect";
        }
    };
}
function loadNetTask_1() {
    var net_task_1_type = Math.floor(Math.random() * 2);
    var net_ip = [0, 0, 0, 0];
    var host_ip = [0, 0, 0, 0];
    var netmask = [0, 0, 0, 0];
    for (var i = 0; i < 4; i++) {
        net_ip[i] = Math.floor(Math.random() * 256);
        netmask[i] = Math.floor(Math.random() * 256);
        host_ip[i] = net_ip[i] & netmask[i];
    }
    var convergeIP = function (array) {
        var ip = "";
        for (var byte = 0; byte < 4; byte++) {
            ip += array[byte].toString() + ".";
        }
        return ip.substring(0, ip.length - 1);
    };
    var host_ip_str = convergeIP(host_ip);
    var answer;
    if (net_task_1_type == 0) {
        createTextRow("\u0412\u044B\u0447\u0438\u0441\u043B\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u0445\u043E\u0441\u0442\u0430.");
        addHintedRow("IP сети&nbsp", convergeIP(net_ip));
        addHintedRow("Маска&nbsp&nbsp&nbsp", convergeIP(netmask));
        addHintedRowWithInputAndButton("IP хоста", "bin_task_button", "bin_task_input");
        answer = host_ip_str;
    }
    else if (net_task_1_type == 1) {
        createTextRow("\u0412\u044B\u0447\u0438\u0441\u043B\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 c\u0435\u0442\u0438.");
        addHintedRow("IP хоста", host_ip_str);
        addHintedRow("Маска&nbsp&nbsp&nbsp", convergeIP(netmask));
        addHintedRowWithInputAndButton("IP сети&nbsp", "bin_task_button", "bin_task_input");
        answer = convergeIP(net_ip);
    }
    console.log(host_ip_str);
    GetId("bin_task_button").onclick = function () {
        if (GetId("bin_task_input").value == answer) {
            GetId("bin_task_input").className = "input_element_correct";
            finishTask();
        }
        else {
            GetId("bin_task_input").className = "input_element_incorrect";
        }
    };
}
function addHintedRow(hint, value) {
    var element = "<div class=\"row\">\n                        <div class=\"hex_numbers\">\n                            <p class=\"hint\">" + hint + "</p>\n                            <div class=\"hex_label\">" + value + " </div>\n                        </div>\n                    </div>";
    GetId("task_panel").insertAdjacentHTML("beforeend", element);
}
function addHintedRowWithInputAndButton(hint, button_id, input_id) {
    var element = "<div class=\"row\">\n                        <div class=\"hex_numbers\">\n                            <p class=\"hint\">" + hint + "</p>\n                            <input class=\"input_element\" id=\"" + input_id + "\" type=\"text\" placeholder=\"0\">\n                            <button class=\"menu_button\" id=\"" + button_id + "\" type=\"button\">\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C</button>\n                        </div>\n                    </div>";
    GetId("task_panel").insertAdjacentHTML("beforeend", element);
}
function genTranslateTaskConditions(scale_from, scale_to) {
    var random = 0;
    while (random < 50) {
        random = Math.floor(Math.random() * 4096);
    }
    var question = transform(random, scale_from);
    var answer = transform(random, scale_to);
    return { "question": question, "answer": answer };
}
function transform(num, scale_target) {
    switch (scale_target) {
        case 2: return num.toString(2);
        case 8: return num.toString(8);
        case 16: return num.toString(16).toUpperCase();
        default: return num.toString();
    }
}
function loadTask1() {
    var cs = Math.floor(Math.random() * 65535);
    var ss = Math.floor(Math.random() * 65535);
    var ip = Math.floor(Math.random() * 65535);
    var sp = Math.floor(Math.random() * 65535);
    task_1_fiz_address = (cs * 16 + ip).toString(16).toUpperCase();
    task_1_stack_address = (ss * 16 + sp).toString(16).toUpperCase();
    createFirstBitRow("CS", cs);
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
    var task_num = document.createElement("p");
    task_num.className = "task_number";
    //task_num.innerHTML = task_number.toString();
    GetId("first_row").append(task_num);
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
    for (var i = 0; i < amount; i++) {
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
function createFirstBitRow(suffix, random_number) {
    var row = document.createElement("div");
    CreateRow(row);
    row.id = "first_row";
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
            callback && callback();
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 20);
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
