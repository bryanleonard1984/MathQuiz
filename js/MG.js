//Import libraries
import * as Utils from "./DMMan.js";

//Global Variables
var cor = new Array(0);
var chk = new Array(0);
var input = Utils.getEl.gEID("last");
var numCor = new Array(0);

//Main Functions

window.onload = Load();

var el = Utils.getEl.gEID('last');
el.addEventListener('click', function(){Main();});
el.addEventListener('keydown', function(){ Cont(event); });

//Called when textbox "id 'last'" is clicked on.
function Main()
{
  Question();
}

//Called when textbox has focus and the enter key is pressed.
function Cont(event)
{
  var key = event.which || event.keyCode;
  if(key == 13)
    {
      if(cor.length < 31)
        {
          InputCheck();
          Question();
        }

      else
        {
          var result;
          chk.forEach(Score);
          result = Math.round((numCor.length / chk.length) * 100);
          window.alert("You scored : " + result + "%");
          Utils.getEl.gEID('reload').style.visibility = "visible";
        }
    }
}

//Support Functions

function answer(color)
{
  var x = Utils.getEl.gEID('prob');
  x.style.backgroundColor = x.style.backgroundColor == "gray" ? color : "gray";
}

function Question()
{
  var a = Math.floor(Math.random() * 11);
  var b = Math.floor(Math.random() * 11);
  var c;
  var op = Math.floor(Math.random() * 4);
  var operator = Utils.getEl.gEID('operator');
  var fir = Utils.getEl.gEID("first");
  var sec = Utils.getEl.gEID("second");
  cor.push(0);
  if(cor.length == 31){op = -1;}
  switch (op)
    {
      case 0:
        operator.innerHTML = "+";
        c = a + b;
        fir.innerHTML = a;
        sec.innerHTML = b;
        cor[cor.length - 1] = c;
        break;
      case 1:
        operator.innerHTML = "-";
        c = a + b;
        fir.innerHTML = c;
        sec.innerHTML = b;
        cor[cor.length - 1] = a;
        break;
      case 2:
        operator.innerHTML = "x";
        c = a * b;
        fir.innerHTML = a;
        sec.innerHTML = b;
        cor[cor.length - 1] = c;
        break;
      case 3:
        if(b == 0)
          {
            b = Math.floor((Math.random() * 10) + 1);
          }
        operator.innerHTML = "&divide;";
        c = a * b;
        fir.innerHTML = c;
        sec.innerHTML = b;
        cor[cor.length - 1] = a;
        break;
      default:
        fir.innerHTML = "##";
        sec.innerHTML = "##";
        Utils.getEl.gEID("last").value = "";
        break;
    }
}

function InputCheck()
{
  if((input.value == null) || (input.value == ""))
    {
      chk.push(-1);
      Interval("red");
    }
  else if(isNaN(input.value))
    {
      chk.push(-1);
      input.value = "";
      Interval("red");
    }
  else
    {
      chk.push(parseInt(input.value)-cor[cor.length-1]);
      input.value = "";
      if(chk[chk.length - 1]==0)
        {
          Interval("green");
        }
      else
        {
          Interval("red");
        }
    }
  answer("gray");
}

function Score(item, index)
{
  if(item == 0)
    {
      numCor.push(0);
    }
}

function Interval(color)
{
  var now = Date.now();
          var end = Date.now() + 200;
          var myVar = setInterval(IntStart,50);
          function IntStart()
          {
            if(now >= end)
              {
                clearInterval(myVar);
              }
            else
              {
                answer(color);
                now = Date.now();
              }
          }
}

function Load()
{
  var newEl, newText, pos;
  Utils.getEl.gEID('reload').style.visibility = "hidden";
  Utils.getEl.gEID('instruct').innerHTML = "Click on the textbox to get a new question.";
  const bod = Utils.getEl.gETN('body', 0);
  Utils.AddEl.AppendText('p', "Press enter to answer the question.", bod);
  Utils.AddEl.AppendText('p', "Press enter twice after last question.", bod);
  
}
