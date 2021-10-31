/*

Developed, created, and authored by Evan Vera (All rights reserved)

Created for the simple purpose of being able to transmit cvs credit files to IMDB

*/

var userResponse = false;
var inputNum = 0;
var BUTTON_NAME = "inputButton";
var fileData = [];
var creditNum = 0;
var iValue = 0;
var cookieData = "";
var tempVal = 0;

String.prototype.replaceAll = function(search, replace)
{
  if (replace === undefined)
  {
    return this.toString();
  }

  return this.replace(new RegExp('[' + search + ']', 'g'), replace);
}

function setCookie(name, value, days)
{
  var expires = "";
  if (days)
  {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name)
{
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++)
  {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name)
{
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

var checkPage = document.getElementsByName("icicle-search-o.1.visual_effects_department.new.1.edit.name");

if (checkPage[0])
{
  if (typeof extensionRun != 'undefined')
  {
    alert("You already ran this extension, calm down. The button to upload your files is on the bottom left hand of this web page.");
  }
  else if (window.location.href != "https://contribute.imdb.com/updates")
  {
    alert("Hello, but I’m sorry to inform you that the IMDBifier extension only works on the IMDB update credits web page. Please navigate to that website (https://contribute.imdb.com/updates) and then you can use this extension. It's okay, we all make mistakes.");
  }
  else if (getCookie("continueValue") != null)
  {
    userResponse = confirm("It appears that you were previously entering values into this program, but your .csv file had too many values to input and therefore it maxed out. Would you like this extension to continue entering those values into this imdb page?");

    if (userResponse)
    {
      function uploadDealcsv()
      {};

      uploadDealcsv.prototype.getParsecsvdata = function(data)
      {
        let parsedata = [];

        let newLinebrk = data.split(/\r\n|\n|\r/);
        for (let i = 0; i < newLinebrk.length; i++)
        {
          parsedata.push(newLinebrk[i].split(","))
        }

        console.table(parsedata);

        parseCsv.inputData(parsedata);
      }

      uploadDealcsv.prototype.inputData = function(creditTable)
      {

        function inputCredits(numberOfCredits)
        {
          var previousValue = getCookie("continueValue");

          for (i = 0; i < numberOfCredits; i++)
          {
            if (previousValue >= creditTable.length)
            {
              break;
            }
            else
            {
              document.getElementsByName("icicle-search-o.1.visual_effects_department.new." + (i + 1) + ".edit.name")[0].value = creditTable[previousValue][0];
              document.getElementsByName("o.1.visual_effects_department.new." + (i + 1) + ".edit.job_other")[0].value = (creditTable[previousValue][1] + ": DNEG");

              if (creditTable[previousValue][2] == "")
              {
                document.getElementsByName("o.1.visual_effects_department.new." + (i + 1) + ".edit.attr")[0].value = "Uncredited";
              }
              else
              {
                document.getElementsByName("o.1.visual_effects_department.new." + (i + 1) + ".edit.attr")[0].value = creditTable[previousValue][2];
              }
              
              previousValue++;
            }
          }
          
          tempVal = previousValue;
        }

        inputNum = document.getElementsByTagName("input").length;

        if (inputNum > 18 && inputNum < 24)
        {
          creditNum = 1;
        }
        else if (inputNum > 25 && inputNum < 31)
        {
          creditNum = 2;
        }
        else if (inputNum > 32 && inputNum < 38)
        {
          creditNum = 3;
        }
        else if (inputNum > 39 && inputNum < 45)
        {
          creditNum = 4;
        }
        else if (inputNum > 46 && inputNum < 52)
        {
          creditNum = 5;
        }
        else if (inputNum > 81 && inputNum < 87)
        {
          creditNum = 10;
        }
        else if (inputNum > 116 && inputNum < 122)
        {
          creditNum = 15;
        }
        else if (inputNum > 151 && inputNum < 157)
        {
          creditNum = 20;
        }
        else
        {
          creditNum = 25;
        }

        inputCredits(creditNum);

        if (tempVal < creditTable.length)
        {
        	alert("Success! It appears the credits have been successfully inputted into the table! Thank you for using IMDBifier, and have a nice day!");
          
          alert("It appears as though there are more credits in your excel table than there are inputs on this page. All available spaces will be filled, but the rest of the credits in your table will need to be inputted later (AGAIN). Next time you click this extension, the rest of your values will be inputted (AGAIN).");

          tempVal = (parseInt(tempVal));

          setCookie("continueValue", tempVal, 3);
        }
        else if (tempVal == creditTable.length)
        {
        	alert("Success! It appears the credits have been successfully inputted into the table! Thank you for using IMDBifier, and have a nice day!");
          
          eraseCookie("continueValue");
          eraseCookie("csvData");
        }
        else
        {
          eraseCookie("continueValue");
          eraseCookie("csvData");
          
          alert("A SERIOUS ERROR HAS OCCURED! THIS PROGRAM DOESNT KNOW WHAT HAPPENED, BUT IT CANT RUN. PLEASE CLEAR YOUR COOKIES AND RESTART, AND IF THIS DOESNT FIX THIS ERROR EMAIL evanvera18@gmail.com");
        }
      }

      var parseCsv = new uploadDealcsv();
      parseCsv.getParsecsvdata(getCookie("csvData").replaceAll("|", "\n"));
    }
    else
    {
      alert("It appears you have decided to cancel the continuation of your IMDBifying. This is unfortunate, but this extension doesn't take it personally. Feel free to use it again when you're ready (Hopefully you do).")

      eraseCookie("csvData");
      eraseCookie("continueValue");
    }
  }
  else
  {
    userResponse = confirm("This is the IMDBifier chrome extension. If you wish to upload a file (.csv) with credits to add then click OK. Otherwise, click Cancel and add them manually.");

    if (userResponse && typeof extensionRun === 'undefined')
    {
      var extensionRun = true;

      function uploadDealcsv()
      {};

      uploadDealcsv.prototype.getCsv = function(e)
      {

        let input = document.getElementById(BUTTON_NAME);
        input.addEventListener('change', function()
        {

          if (this.files && this.files[0])
          {

            var myFile = this.files[0];
            var reader = new FileReader();

            reader.addEventListener('load', function(e)
            {

              let csvdata = e.target.result;

              parseCsv.getParsecsvdata(csvdata);

            });

            reader.readAsBinaryString(myFile);
          }
        });
      }

      uploadDealcsv.prototype.getParsecsvdata = function(data)
      {
        cookieData = data.replace(/(\r\n|\n|\r)/gm, "|");

        setCookie("csvData", cookieData, 3);

        let parsedata = [];

        let newLinebrk = data.split(/\r\n|\n|\r/);
        
        for (let i = 0; i < newLinebrk.length; i++)
        {
          parsedata.push(newLinebrk[i].split(","))
        }

        console.table(parsedata);

        parseCsv.inputData(parsedata);
      }

      uploadDealcsv.prototype.inputData = function(creditTable)
      {

        function inputCredits(numberOfCredits)
        {

          for (i = 0; i < numberOfCredits; i++)
          {
            if (i > creditTable.length)
            {
              break;
            }
            else
            {
              document.getElementsByName("icicle-search-o.1.visual_effects_department.new." + (i + 1) + ".edit.name")[0].value = creditTable[i][0];
              document.getElementsByName("o.1.visual_effects_department.new." + (i + 1) + ".edit.job_other")[0].value = (creditTable[i][1] + ": DNEG");

              if (creditTable[i][2] == "")
              {
                document.getElementsByName("o.1.visual_effects_department.new." + (i + 1) + ".edit.attr")[0].value = "Uncredited";
              }
              else
              {
                document.getElementsByName("o.1.visual_effects_department.new." + (i + 1) + ".edit.attr")[0].value = creditTable[i][2];
              }

              iValue++;
            }
          }
        }

        inputNum = document.getElementsByTagName("input").length;

        if (inputNum > 18 && inputNum < 24)
        {
          creditNum = 1;
        }
        else if (inputNum > 25 && inputNum < 31)
        {
          creditNum = 2;
        }
        else if (inputNum > 32 && inputNum < 38)
        {
          creditNum = 3;
        }
        else if (inputNum > 39 && inputNum < 45)
        {
          creditNum = 4;
        }
        else if (inputNum > 46 && inputNum < 52)
        {
          creditNum = 5;
        }
        else if (inputNum > 81 && inputNum < 87)
        {
          creditNum = 10;
        }
        else if (inputNum > 116 && inputNum < 122)
        {
          creditNum = 15;
        }
        else if (inputNum > 151 && inputNum < 157)
        {
          creditNum = 20;
        }
        else
        {
          creditNum = 25;
        }

        inputCredits(creditNum);

        if (creditTable.length > creditNum)
        {
        	alert("Success! It appears the credits have been successfully inputted into the table! Thank you for using IMDBifier, and have a nice day!");
          
          alert("It appears as though there are more credits in your excel table than there are inputs on this page. All available spaces will be filled, but the rest of the credits in your table will need to be inputted later. Next time you click this extension, the rest of your values will be inputted.");

          setCookie("continueValue", iValue, 3);
        }
        else if (creditTable.length < creditNum)
        {
        	alert("Success! It appears the credits have been successfully inputted into the table! Thank you for using IMDBifier, and have a nice day!");
          
          alert("It appears as though there are less credits in your excel table than there are inputs on this page. This extension will fill in as many spaces as it can, but the rest will be left blank (We can't make credits up, sorry).");

          eraseCookie("csvData");
          eraseCookie("continueValue");
        }
        else if ((iValue + 1) == creditTable.length)
        {
        	alert("Success! It appears the credits have been successfully inputted into the table! Thank you for using IMDBifier, and have a nice day!");
          
          eraseCookie("csvData");
          eraseCookie("continueValue");
        }
        else
        {
        	eraseCookie("continueValue");
          eraseCookie("csvData");
          
          alert("A SERIOUS ERROR HAS OCCURED! THIS PROGRAM DOESNT KNOW WHAT HAPPENED, BUT IT CAN'T RUN. PLEASE CLEAR YOUR COOKIES AND RESTART, AND IF THIS DOESNT FIX THIS ERROR EMAIL evanvera18@gmail.com");
        }
      }

      var inputButton = document.createElement("INPUT");
      inputButton.setAttribute("type", "file");
      inputButton.setAttribute("accept", ".csv");
      inputButton.setAttribute("id", BUTTON_NAME);
      inputButton.style.position = 'absolute';
      inputButton.style.right = 500;
      document.body.appendChild(inputButton);

      alert("You have selected to upload a (.csv) file for the credits. A new button has been added to the bottom left hand of this web page, please click on it and upload your (.csv) file.");

      var parseCsv = new uploadDealcsv();
      parseCsv.getCsv();

    }
    else
    {
      alert("You have selected to enter in the credits manually. Good luck, you'll need it.");
    }
  }
}
else
{
  alert("It appears as though there is an issue with the current webpage, and it is unable to accept the values of a csv table. Please reload this page or navigate to the correct page and run this extension again.");
}