var valueString = "0";

$(document).ready(function() {
  /* Clr Button */
  $("#btnClear").click(function() {
    valueString = "0";
    $("#display").html("0");
    pending = false;
  });
  
  /* Equals Button */
  $("#btnEquals").click(function() {
    
    if ($("#display").html() != "Overflow" && !/[\/*+-]/.test(valueString.charAt(valueString.length-1))) //Equals only works if display isn't overflowed and last input wasn't an operator.
      evaluate();
  });

  /* Operator Buttons */
  $(".operator").click(function() {
    if ($("#display").html() != "Overflow") { //If overflow, operators do nothing.
      if (/[\/*+-]/.test(valueString.charAt(valueString.length-1))) //If two operators are pressed in a row, delete the previous one and use the new one.
        valueString = valueString.slice(0, -1);
      else if (/[\/*+-]/.test(valueString))  //Evaluate previous expression (if one exists) when pressing an operator button.
        evaluate();
      valueString += event.target.id.slice(3);
    }
  });
  
  /* Decimal Button */
  $("#btnDecimal").click(function() {
    if ($("#display").html() != "Overflow") { //If overflow, decimal does nothing.
      if (/[\/*+-]/.test(valueString.charAt(valueString.length-1))) //If last input was an operand, reset display
        $("#display").html("0.");
      else if ($("#display").html().indexOf(".") === -1) 
        $("#display").append(".");
      valueString += ".";
    }
  });
  
  /* Number Buttons */
  $(".number").click(function() {
    if ($("#display").html() != "Overflow" && ($("#display").html().length<11 || /[\/*+-]/.test(valueString.charAt(valueString.length-1)))){ //Numbers only work if display isn't overflowed and there is room for another number or the last input was an operator.
      if (/[\/*+-]/.test(valueString.charAt(valueString.length-1)) || $("#display").html() === "0")
        $("#display").html(event.target.id.slice(3));
      else
        $("#display").append(event.target.id.slice(3));
      valueString += event.target.id.slice(3);
    }
  });
});

function evaluate(){
  valueString = eval(valueString).toString();
  if (Math.abs(parseInt(valueString)) > 99999999999) //Large numbers --> overflow
    valueString = "Overflow";
  else if (valueString.toString().length > 11) //Truncate long decimal numbers.
    valueString = valueString.toString().slice(0, 11);
  $("#display").html(valueString);
}