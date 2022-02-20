"use strict";

window.addEventListener("load", prepare, false);

function prepare(){
    var form = document.getElementById("person");
    var alderRange = document.getElementById("alderRange");
    
    alderRange.addEventListener("input", function(){
        var alder = document.getElementById("alder");
        alder.firstChild.textContent = this.value;
    }, false);
    form.addEventListener("submit", validateForm, false);
    form.addEventListener("reset", resetForm, false);
}
function resetForm(){
    var errorDiv = document.getElementById("error");
    errorDiv.style.display = "none";
}
function validateForm(evt){
    try{
        var form = document.getElementById("person");
        var inputs = document.getElementsByTagName("input");
        var current = 0;
        var i = 0;
        for(i; i<inputs.length;i++){
            current=inputs.item(i);
            if(current.getAttribute("name")==="fornamn" || current.getAttribute("name") === "efternamn"){
                if(current.value === ""){
                    var name = null;
                    if(current.getAttribute("name")=== "fornamn"){
                        name = "förnamn";
                    }else{
                        name = "efternamn";
                    }
                    throw new Error("Du måste ange ditt " + name);
                }
                if(!checkTextInput(current.value)){
                    throw new Error("Du får bara ange bokstäver i "+ current.getAttribute("name") +"!");
                }

            }
            if(current.getAttribute("name") === "telefonnummer" || current.getAttribute("name") === "mobilnummer"){
                var nummer = current.getAttribute("name");

                if(current.value.length < 6){
                     throw new Error("Du måste ange "+nummer);
                }
                if(!checkNumberInput(current.value)){
                     throw new Error("Du får bara ange " + nummer + " i siffor!");
                }
            }
            if(current.getAttribute("name") === "gender"){
                if(!checkRadio()){
                    throw new Error("Du måste välja kön");
                }
            }
        }
    }catch (error){
        evt.preventDefault();
        var errorDiv = document.getElementById("error");
        errorDiv.style.display = "block";
        var errorDivSpan = document.getElementById("error").firstChild;
        if(errorDivSpan.firstChild === null){
            errorDivSpan.appendChild(document.createTextNode(error.message));
        }else{
            errorDivSpan.firstChild.textContent = error.message;
        }
    }
    
}
function checkTextInput(inText){
    var valid = /^[a-z]+$/;
    if(inText.match(valid)){
        return true;
    }else{
        return false;
    }
 
}
function checkNumberInput(inNumber){
    var valid = /^[0-9]+$/;
    if(inNumber.match(valid)){
        return true;
    }else{
        return false;
    }
}
function checkRadio(){
    var genders = document.querySelectorAll('input[type="radio"]');
    for(var i=0; i<genders.length; i++){
        if(genders.item(i).checked){
            return true;
        }
    }
 
}