function generateCat(){
    var image = document.createElement('img');
    var div = document.getElementById('cat-result');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif";
    div.appendChild(image);
}