<!DOCTYPE html>
<html>
  <head>
    <title>Binary Game</title>
    <link rel="stylesheet" href="/styles.css">
    <style>
    .bit_button {
            background-color: #ffffff; /* Green */
            border: none;
            outline: none;
            color: rgb(32, 24, 20);
            padding: 5px 5px;
            font-family: 'Courier New', Courier, monospace;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 30px;
            opacity: 1;
            transition: 0.7s;
        }
        .label_1 {
            background-color: #ffffff; /* Green */
            border: none;
            outline: none;
            font-family: 'Courier New', Courier, monospace;
            color: rgb(32, 24, 20);
            padding: 5px 5px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 30px;
            opacity: 1;
            transition: 0.7s;
        }
        #result {
            background-color: #ffffff; /* Green */
            border: none;
            outline: none;
            font-family: 'Courier New', Courier, monospace;
            color: rgb(32, 24, 20);
            padding: 5px 5px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 30px;
            opacity: 1;
            transition: 0.7s;
            width: 7%;
        }
        .bit_button:hover { 
            background-color: #afafaf;
            opacity: 1;
        }
        .main_panel {
        display:flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh; 
        }
    </style>

  </head>
  <body>

  <div class="main_panel">
    <div>
      <button data-val="15" class="bit_button" type="button">0</button>
      <button data-val="14" class="bit_button" type="button">0</button>
      <button data-val="13" class="bit_button" type="button">0</button>
      <button data-val="12" class="bit_button" type="button">0</button>
      <p class="label_1">.</p>
      <button data-val="11" class="bit_button" type="button">0</button>
      <button data-val="10" class="bit_button" type="button">0</button>
      <button data-val="9" class="bit_button" type="button">0</button>
      <button data-val="8" class="bit_button" type="button">0</button>
      <p class="label_1">.</p>
      <button data-val="7" class="bit_button" type="button">0</button>
      <button data-val="6" class="bit_button" type="button">0</button>
      <button data-val="5" class="bit_button" type="button">0</button>
      <button data-val="4" class="bit_button" type="button">0</button>
      <p class="label_1">.</p>
      <button data-val="3" class="bit_button" type="button">0</button>
      <button data-val="2" class="bit_button" type="button">0</button>
      <button data-val="1" class="bit_button" type="button">0</button>
      <button data-val="0" class="bit_button" type="button">0</button>
    </div>
    <p class="label_1">=</p>
    <p id="result">0</p>
    
  </div>
  </body>
  <script src="greetings.js"></script>
</html>