window.onload = function(){
    function getHistory(){
        return document.getElementById("history-value").innerText;
    }
    function printHistory(num){
        document.getElementById("history-value").innerText=num;
    }
    function getOutput(){
        return document.getElementById("output-value").innerText;
    }
    function printOutput(num){
        if(num==""){
            document.getElementById("output-value").innerText=num;
        }
        else{
            document.getElementById("output-value").innerText=getFormattedNumber(num);
        }	
    }
    function getFormattedNumber(num){
        if(num=="-"){
            return "";
        }
        var n = Number(num);
        var value = n.toLocaleString("en");
        return value;
    }
    function reverseNumberFormat(num){
        return Number(num.replace(/,/g,''));
    }
    // this is for the  operators
    var operator = document.getElementsByClassName("operator");
    for(var i =0;i<operator.length;i++){
        operator[i].addEventListener('click',function(){ // this allows the operators  to be accessed one by one
            if(this.id=="clear"){ // this specifies that  when the clear button is clicked, both the history and my output should be blank
                printHistory("");
                printOutput("");
            }
            else if(this.id=="backspace"){
                var output=reverseNumberFormat(getOutput()).toString(); // this  specifies that  the backspace shoulld  start clearing from behind
                if(output){//if output has a value
                    output= output.substr(0,output.length-1); // this tells the  backspace  to take out characters one after the other from behind
                    printOutput(output);
                }
            }
            else{
                var output=getOutput();
                var history=getHistory();
                if(output==""&&history!=""){
                    if(isNaN(history[history.length-1])){
                        history= history.substr(0,history.length-1);
                    }
                }
                //
                if(output!="" || history!=""){
                    output= output==""?output:reverseNumberFormat(output);
                    history=history+output;
                    if(this.id=="="){
                        var result=eval(history);
                        printOutput(result);
                        printHistory("");
                    }
                    else{
                        history=history+this.id;
                        printHistory(history);
                        printOutput("");
                    }
                }
            }
            
        });
    }
    //this is for the number
    var number = document.getElementsByClassName("number");
    for(var i =0;i<number.length;i++){
        number[i].addEventListener('click',function(){
            var output=reverseNumberFormat(getOutput());
            if(output!=NaN){ //if output is a number
                output=output+this.id;
                printOutput(output);
            }
        });
    }
}