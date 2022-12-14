
const input = document.querySelector('.get-note');
const addNoteBtn = document.querySelector('#add-btn');
addNoteBtn.addEventListener("click", addNewNote);

const color = document.querySelector('.get-color');
const notesList = document.querySelector('.notes-list');

const allNotes = getNotes();
// console.log(localStorage.getItem("allnotes-sticky"));
if(localStorage.getItem("allnotes-sticky") !== "[]"){
    displayNotes(getNotes());
}


// document.addEventListener('keypress', (event) => {
//     if (event.keyCode === 13) {
//         addNewNote();
//     }
// })

function addNewNote() {
    if (input.value) {
        let newNote = {
            id: Math.floor(Math.random()*1000),
            note: input.value,
            noteColor: color.value
        };
        allNotes.push(newNote);
    }
    else {
        alert("A note can't be empty.");
    }
    // console.log(newNote);
    localStorage.setItem("allnotes-sticky", JSON.stringify(allNotes));
    input.value = "";
    input.focus();
    
    displayNotes(getNotes());
}



function displayNotes(notes) {
    notesList.innerHTML = " ";
    notes.forEach(element => {
       let noteHTML= `
        <div class="note" id="note" style="background-color:${element.noteColor};">
            <div class="note-view" id="note-view" contenteditable>
                ${element.note}
            </div>
            <div class="buttons">
                <a class="deleteBtn"><img src="icons/bin.png" class="bin-icon"></a>
                <a class="copyBtn"><img src="icons/copyBtn.svg" class="copy-icon"></a>
                <a class="boldBtn btns"><b>B<b></a>
                <a class="italicBtn btns"><i>I<i></a>
                <a class="underlineBtn btns"><u>U<u></a>
            </div>
        </div>
        `;

        notesList.insertAdjacentHTML('afterbegin', noteHTML);
        
        const deleteBtn = document.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', e => { deleteNote(e,element, element.id);})
        const copyBtn = document.querySelector('.copyBtn');
        copyBtn.addEventListener('click', e => {copyNote(e,element);})
        
        const boldBtn = document.querySelector('.boldBtn');
        boldBtn.addEventListener('click',e => {boldNote(e,element,element.id);})

        const italicBtn = document.querySelector('.italicBtn');
        italicBtn.addEventListener('click',e => {italicNote(e,element,element.id);})
        
        const underlineBtn = document.querySelector('.underlineBtn');
        underlineBtn.addEventListener('click',e => {underlineNote(e,element,element.id);})
      
    });
}
function getNotes(){
    return JSON.parse(localStorage.getItem("allnotes-sticky") || "[]")
}

function saveNotes(notes){
    localStorage.setItem("allnotes-sticky", JSON.stringify(notes));
}

function boldNote(e,element,id){
    // console.log(e);
    // console.log(element.note);
    var boldText =  `<b>${element.note}<b>`;
    updateNote(id,boldText);
    // alert("boled text: " + boldText);
    window.location.reload();
}
function italicNote(e,element,id){
    var italicText = `<i>${element.note}<i>`
    updateNote(id,italicText);

    window.location.reload();
}
function underlineNote(e,element,id){
    var underlineText = `<u>${element.note}<u>`
    updateNote(id,underlineText);

    window.location.reload();
}

function updateNote(id, newContent) {
const notes = getNotes();
const targetNote = notes.filter((note) => note.id == id)[0];

targetNote.note = newContent;
saveNotes(notes);
}

function deleteNote(e,element, id) {
    const doDelete =  confirm("Are you sure you want to delete this note??");
    if (doDelete){
        const notes = getNotes().filter((note) => note.id != id);
        saveNotes(notes);
        displayNotes(notes);
    }   
}

function copyNote(e,element) {
    // Get the text field
    console.log(e);
    console.log(element.note);
    var copyText = `${element.note}`;
  
    navigator.clipboard.writeText(copyText);
    //     console.log(copyText);
  //   // Select the text field
  //   copyText.select();
  //   copyText.setSelectionRange(0, 99999); // For mobile devices
  
    // Copy the text inside the text field
  
  //   Alert the copied text
    alert("Your Text was copied to the clipboard");
  
  }
