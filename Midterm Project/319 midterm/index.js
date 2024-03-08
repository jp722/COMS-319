fetch("./data.json")
        .then(response => response.json())
        .then(contents => loadPlaceholder(contents));

let contents = "";
function loadPlaceholder(content){
  for (var i = 0; i<content.placeholder.length; i++){
    contents += content.placeholder[i].string + "\r\n<br>";
  }
  displayFile(contents); 

}



function regexTutorial(){
  alert('Hi!');
}


function readSingleFile(fileIn) {
  var f = fileIn.target.files[0];
  if (!f) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(fileIn) {
    contents = fileIn.target.result;
    displayFile(contents);
  };
  reader.readAsText(f);
  reader.readAsText(f);
}


function displayFile(text) {
  var element = document.getElementById('fileinput');
  element.innerHTML = text;
}


document.getElementById('file-input').addEventListener('change', readSingleFile, false);



$(document).ready(function() {
  $('form').submit(function(event) {
      event.preventDefault();

      var regIn = $('#regexIn').val();
      const regex = new RegExp(regIn, "gi");
      let modifyRegex = contents.split("\n"); //split based on newlines
      
      var result = "";
      for(var i = 0; i < modifyRegex.length; i++){
        modifyRegex[i] = modifyRegex[i].replace("<br>", ""); //remove HTML breaks for formatting
        if(modifyRegex[i].match(regex) != null){
          currStr = modifyRegex[i];
          match = currStr.match(regex);
          console.log(match)
          currStrMod = currStr.replace(regex, "<mark>"+ match[0] + "</mark>"); //use match[0] as they will all b e the same, var regex w/o formatting
          console.log(currStrMod);
          result += "<lineNum>"+ (i+1) + "</lineNum>" + ": " + currStrMod + "<br>"; //add the HTML formatting back
        }
      }
      
      document.getElementById('searchResults').innerHTML = result; //replace text at search results




      
  })
});

