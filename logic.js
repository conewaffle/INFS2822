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
    var userText = captureUserData();
    // create dictionary variable of id and text
    var dictionary = {
        "id": currentId,
        "text": userText,
    };

    listItems.push(dictionary);
    // pass dictionary to function to draw table
    addItem(dictionary);
}

function captureUserData() {
    // we used this before jquery
    // var inputBox = document.getElementById("itemSet");
    // var userText = inputBox.value;

    // but now we use
    var inputBox = $("#itemSet");
    var userText = inputBox.val();

    // empty the textfield and re-give the focus
    //inputBox.value = ""; - pre-jquery
    inputBox.val("");
    inputBox.focus();

    return userText;
}

function addItem(dictionary) {
    // instantiating a variables
    var tablebody = document.getElementById("tablebody");
    var myId = dictionary["id"];
    var userText = dictionary["text"];
    // add onclick delete text
    var myActions = "<a onclick='deleteItem(" + dictionary["id"] + ")' href='#'>Delete this one</a>"
  
    // add rows within table body
    if (dictionary["text"] != "") {
        var rowHtml = "";
        rowHtml += ("<tr id='item_" + dictionary["id"] + "'>" + 
                        "<td>" + myId + "</td>" + 
                        "<td><em>" + userText + "</em></td>" + 
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
    download("data.json", JSON.stringify(listItems, null, '\t'));
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
