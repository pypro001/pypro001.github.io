
let noteTxt = document.getElementById("TextArea");
var noteArry = [];
let allNotes = localStorage.getItem("notes");
let displayNotes = document.getElementById("showNotes");
let searchBtn = document.getElementById("searchBtn");
let noteContent = document.getElementsByClassName("noteCard")

//checking for localStorage and parsing it to notes array
//display all notes
if (islocalStorageEmpty()) {
        noteArry = []
        
    } else {
        noteArry = JSON.parse(allNotes)
        showNotes()
    }

function islocalStorageEmpty() {
    if (allNotes == null) {
        return true;
    }
    return false;
}
function addnote(notesTxt) {
    noteArry.push(notesTxt);
    localStorage.setItem("notes", JSON.stringify(noteArry));
    showNotes()
}

document.getElementById("addBtnNote").addEventListener("click", ()=>{
    if (noteTxt.value != "") {
        addnote(noteTxt.value);
        
    } else {
        //    warning
        console.log("pls enter some text!!")
    }
    noteTxt.value = "";
   
})
function showNotes() {
    let disCart = "";
    // if (islocalStorageEmpty()) {
    //     noteArry = []
        
    // } else {
    //     noteArry = JSON.parse(allNotes)
        
        noteArry.forEach((element, index) => {
            disCart += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body d-grid gap-2 d-md-block">
                <h5 class="card-title text-center fw-bold">Note ${index+1}</h5>
                <p class="card-text">${element} </p>
                <button id="${index}"onclick="deleteNote(this.id)" class="btn text-white bg-danger" type="button">Delete</button>
            </div>
        </div>            
  `
        })
    
    
    displayNotes.innerHTML = disCart;
}

function deleteNote(cardIndex){
   noteArry.splice(cardIndex,1)
   localStorage.setItem("notes", JSON.stringify(noteArry));
   showNotes();
}
searchBtn.addEventListener("input", ()=>{
    console.log("searchimg...")
   let inputVal = searchBtn.value.toLowerCase();
   Array.from(noteContent).forEach((element)=>{
     let notesTxt = element.getElementsByTagName("p")[0].innerText;
     console.log(typeof notesTxt)
     if (notesTxt.includes(inputVal)) {
          element.style.display = "block";
     }else{
        element.style.display = "none";  
     }
   })


})