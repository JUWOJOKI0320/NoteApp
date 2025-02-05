const textbox = document.getElementById("textbox");
const addnoteButton = document.getElementById("add");
const noteContainer = document.getElementById("note-container")
const addContainer = document.getElementById("addnote-container");
let lastCreatedNote = null;
let indexes = -1;
let allNotes = JSON.parse(localStorage.getItem("notes")) || false;

if (allNotes){
    allNotes.forEach((note,index)=>{
        const TypeNote = document.createElement("div")
        noteContainer.appendChild(TypeNote);
        TypeNote.classList.add("TypeNote")
        TypeNote.id = String(note.id);
        indexes =+ note.id;

        NoteTitle = document.createElement("input")
        NoteTitle.classList.add("NoteTitle");
        NoteTitle.type = "text";
        NoteTitle.value = note.title;
        TypeNote.appendChild(NoteTitle);

        NoteText = document.createElement("textarea")
        NoteText.classList.add("NoteText");
        NoteText.value = note.content;
        TypeNote.appendChild(NoteText);

        CreateEditDeleteButton(TypeNote);

        TypeNote.style.cssText = `position:relative;
                                        width: 200px;
                                        height: 200px;
                                        opacity: 1;`;
    });
}

function CreateEditDeleteButton(lastCreatedNote){
    EditDeleteContainer = document.createElement("div");
    EditDeleteContainer.classList.add("EditDelete-container")
    lastCreatedNote.appendChild(EditDeleteContainer);
    EditButton = document.createElement("i");
    EditButton.classList.add("bx","bxs-edit");
    EditButton.id = "EditButton"; 
    EditDeleteContainer.appendChild(EditButton);
    DeleteButton = document.createElement("i");
    DeleteButton.classList.add("bx","bxs-trash");
    DeleteButton.id = "DeleteButton"; 
    EditDeleteContainer.appendChild(DeleteButton);
}

function addNote(id,title, content) {
    // Retrieve existing notes from localStorage
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    console.log(id, title, content)

    // Create a new note object
    let newNote = {
        id:id,
        title: title,
        content: content,
    };

    // Append new note
    notes.push(newNote);

    // Save back to localStorage
    localStorage.setItem("notes", JSON.stringify(notes));


}

// Click outside to hide
document.addEventListener("click", function(event) {
    if (addnoteButton.contains(event.target)){
        addnoteButton.style.pointerEvents = "none";
        const TypeNote = document.createElement("div")
        noteContainer.appendChild(TypeNote);
        TypeNote.classList.add("TypeNote")
        TypeNote.id = String(indexes + 1);

        NoteTitle = document.createElement("input")
        NoteTitle.classList.add("NoteTitle");
        NoteTitle.type = "text";
        NoteTitle.placeholder = "Note Title";
        TypeNote.appendChild(NoteTitle);

        NoteText = document.createElement("textarea")
        NoteText.classList.add("NoteText");
        NoteText.placeholder = "Add Text";
        TypeNote.appendChild(NoteText);

        SaveButton =  document.createElement("button");
        SaveButton.classList.add("SaveButton");
        SaveButton.textContent = "Save";
        TypeNote.appendChild(SaveButton);
        // Apply transition styles directly after element is created
        setTimeout(() => {
            TypeNote.style.cssText = `
                width: clamp(200px, 27vw, 40rem);
                height: clamp(200px, 27vw, 40rem);
                opacity: 1;
                font-size: 1px;
            `
        }, .1);
        lastCreatedNote = TypeNote;  
    }
    else if(lastCreatedNote){
        if(!lastCreatedNote.contains(event.target)){
            lastCreatedNote.style.cssText = "";
            NoteTitle.placeholder = "";
            addnoteButton.style.pointerEvents = "auto";
            setTimeout(()=>{            
                lastCreatedNote.remove();
                lastCreatedNote= null;
            },400);
        }
    }

    if(document.querySelector(".SaveButton")){
    if(SaveButton.contains(event.target) ){
        const LastNoteTitle = lastCreatedNote.querySelector(".NoteTitle");
        const LastNoteText = lastCreatedNote.querySelector(".NoteText");
        const SaveButton = lastCreatedNote.querySelector(".SaveButton");
        if(LastNoteTitle.value || LastNoteText.value){
            CreateEditDeleteButton(lastCreatedNote);
            LastNoteTitle.style.cssText = `font-size: 25px;`;
            LastNoteText.style.cssText =`font-size:13px;`;
            addnoteButton.style.pointerEvents = "auto";
            SaveButton.style.display = "none";
            lastCreatedNote.style.cssText = `position:relative;
                                        width: 200px;
                                        height: 200px;
                                        opacity: 1;`;
        console.log(lastCreatedNote.id);    
        addNote(lastCreatedNote.id,LastNoteTitle.value, LastNoteText.value);
        lastCreatedNote = null;
        }
    }
}

    // Check if the clicked element has the 'deleteButton' class
    if (event.target.classList.contains("bxs-trash")) {
        // Remove the note that contains this delete button
        const noteToDelete = event.target.closest(".TypeNote");
        if (noteToDelete) {
            allNotes = allNotes.filter(note => note.id !== noteToDelete.id);
            localStorage.setItem('notes', JSON.stringify(allNotes));
            noteToDelete.remove();
        }
      }
    
    else if(event.target.classList.contains("bxs-trash-alt")){
        localStorage.clear();
        const notes = document.querySelectorAll('.TypeNote');
        notes.forEach(note=>{
            note.remove();
        });
  }
   
});