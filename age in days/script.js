function ageindays(){
var birthyear = prompt('what is your birthyear');
var Ageindayss = (2021-birthyear)*365;
var h1 = document.createElement('h1');
var textans = document.createTextNode('You are ' + Ageindayss + ' days Old');
h1.setAttribute('h1' , 'ageindays');
h1.appendChild(textans);
document.getElementById('age-result').appendChild(h1);
}

function reset(){
    document.getElementById('age-result').remove();
}