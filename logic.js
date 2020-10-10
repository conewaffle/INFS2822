var currentId = 1;
var listItems = [

];

// use with onkeypress="search(ele)" in index.html
// function search(ele) {
//     if(event.key === 'Enter') {
//         userDidClickCreate();
//     }
// }

function bodyDidLoad() {
    const uploader = document.getElementById("uploader");
    uploader.addEventListener("change", handleFiles, false);
    function handleFiles() {
        file0 = this.files[0];

        var reader = new FileReader();
        reader.onload = function(fileLoadedEvent) {
            var readText = fileLoadedEvent.target.result;
            fileRead(readText);
        }
        reader.readAsText(file0);

    }
}

function fileRead(readText) {
    console.log(readText);
    newList = JSON.parse(readText);
    drawFromList(newList);
}

// using JQuery to get enter event
$(document).keyup(function(event) {
    if($("#itemSet").is(":focus") && event.key == 'Enter') {
        userDidClickCreate();
    }
});



function userDidClickCreate() {
    // call capture user data function
    var dictionary = captureUserData();

    listItems.push(dictionary);
    // pass dictionary to function to draw table
    addItem(dictionary);
}

function captureUserData() {
    // we used this before jquery
    // var inputBox = document.getElementById("itemSet");
    // var userText = inputBox.value;

    // but now we use
    var minBox = $("#minInput");
    var maxBox = $("#maxInput");
    var condBox = $("#condInput");
    var minTemp = minBox.val();
    var maxTemp = maxBox.val();
    var cond = condBox.val();

    // empty the textfield and re-give the focus
    //inputBox.value = ""; - pre-jquery
    minBox.val("");
    maxBox.val("");
    condBox.val("");
    //inputBox.focus();
    var dictionary = {
        "id": currentId,
        "min": minTemp,
        "max": maxTemp,
        "cond": cond
    };

    return dictionary;
}

function addItem(dictionary) {
    // instantiating a variables
    var tablebody = document.getElementById("tablebody");
    var myId = dictionary["id"];
    var minTemp = dictionary["min"];
    var maxTemp = dictionary["max"];
    var cond = dictionary["cond"];

    // add onclick delete text
    var myActions = "<a onclick='deleteItem(" + dictionary["id"] + ")' href='#'>Delete this one</a>"
  
    // add rows within table body
    if (dictionary["min"] != "" && dictionary["max"] != "" && dictionary["cond"] != "") {
        var rowHtml = "";
        rowHtml += ("<tr id='item_" + myId + "'>" + 
                        "<td>" + myId + "</td>" +
                        "<td>" + minTemp + "</td>" + 
                        "<td>" + maxTemp + "</td>" + 
                        "<td>" + cond + "</td>" + 
                        "<td>" + myActions + "</td>" +                                
                    "</tr>");
        tablebody.innerHTML += rowHtml;

        // increment id counter
        currentId++;
    } else {
        console.log("text was blank!");
    }
}

function drawFromList(list) {
    $("tablebody").html("");
    list.forEach(element => addItem(element));
    list.forEach(element => listItems.push(element));
}

function deleteItem(id) {
    // go to listitems and delete the row
    var rowToRemove = _.findWhere(listItems, {"id": id});
    listItems = _.without(listItems, rowToRemove);

    // go to DOM and delete the row by setting it to blank
    document.getElementById("item_" + id).innerHTML = "";

}

function downloadJSON() {
    download("weather_observations.json", JSON.stringify(listItems, null, '\t'));
}

// adapted from
// w-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
