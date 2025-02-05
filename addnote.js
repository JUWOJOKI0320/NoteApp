const textbox = document.getElementById("textbox");
const addnoteButton = document.getElementById("add");
const noteContainer = document.getElementById("note-container")
const addContainer = document.getElementById("addnote-container");
let lastCreatedNote = null;
let allNotes = JSON.parse(localStorage.getItem("notes")) || false;
let indexer = -1;

function update(){
if (allNotes){
    allNotes.forEach((note,index)=>{
        const TypeNote = document.createElement("div")
        noteContainer.appendChild(TypeNote);
        TypeNote.classList.add("TypeNote")
        TypeNote.id = String(note.id);
        console.log("Typenote:", TypeNote.id);

        NoteTitle = document.createElement("input")
        NoteTitle.classList.add("NoteTitle");
        NoteTitle.type = "text";
        NoteTitle.value = note.title;
        NoteTitle.placeholder = "Note Title";
        TypeNote.appendChild(NoteTitle);

        NoteText = document.createElement("textarea")
        NoteText.classList.add("NoteText");
        NoteText.value = note.content;
        NoteText.placeholder = "Add Text";
        TypeNote.appendChild(NoteText);

        CreateEditDeleteButton(TypeNote);

        TypeNote.style.cssText = `position:relative;
                                width: 200px;
                                height: 200px;
                                opacity: 1;`;
        
        indexer = note.id;
    });
}
else{
    console.log("empty")
}
}

function UpdateGetNotes(){
    allNotes = JSON.parse(localStorage.getItem("notes")) || false;
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
    let allNotes = JSON.parse(localStorage.getItem("notes")) || [];


    console.log(id, title, content)

    // Create a new note object
    let newNote = {
        id:id,
        title: title,
        content: content,
    };

    // Append new note
    allNotes.push(newNote);

    // Save back to localStorage
    localStorage.setItem("notes", JSON.stringify(allNotes));
    UpdateGetNotes();
}

update();

// Click outside to hide
document.addEventListener("click", function(event) {
    if (addnoteButton.contains(event.target)){
        addnoteButton.style.pointerEvents = "none";
        const TypeNote = document.createElement("div")
        noteContainer.appendChild(TypeNote);
        TypeNote.classList.add("TypeNote")
        indexer++;
        TypeNote.id = String(indexer);

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
                width: clamp(300px, 27vw, 40rem);
                height: clamp(300px, 27vw, 40rem);
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

    else if(event.target.classList.contains("bxs-edit")){
        const noteToEdit = event.target.closest(".TypeNote");
        const editButton = noteToEdit.querySelector(".bxs-edit");
        const deleteButton = noteToEdit.querySelector(".bxs-trash");
        const NoteTitle = noteToEdit.querySelector(".NoteTitle");
        const NoteText = noteToEdit.querySelector(".NoteText");
        const saveButton = document.createElement("button");
        let overlay = document.createElement("div");
        if(noteToEdit){
            allNotes = allNotes.filter(note => note.id !== noteToEdit.id);
            noteToEdit.style.position = "absolute";
            noteToEdit.style.zIndex = "1";
            noteToEdit.style.top = "200px";
            noteToEdit.style.width= "clamp(300px, 27vw, 40rem)";
            noteToEdit.style.height= "clamp(300px, 27vw, 40rem)";
            
            saveButton.style.cssText = `
                position: relative;
                background-color: rgba(89, 163, 89, 0.589);
                font-size: clamp(15px, 1vw, 20px);
                padding: 2px;
                border-radius: 5px;
                color: rgb(51, 51, 51);
                transition: .1s ease-in;
                margin-bottom: 20px;
                bottom: 30px;
                cursor: pointer;
            `;
            saveButton.textContent = "Save Changes";

            noteToEdit.appendChild(saveButton);

            overlay.style.position = "fixed";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.background = "rgba(0, 0, 0, 0.5)"; // Dark semi-transparent
            overlay.style.backdropFilter = "blur(5px)";  // Blur effect
            overlay.style.zIndex = "0";  // Ensure it's behind the focused element
            document.body.appendChild(overlay);

            editButton.style.display= "none";
            deleteButton.style.display= "none";

        }
        saveButton.addEventListener('click', () =>{
            UpdateGetNotes();
            let index = allNotes.findIndex(note => note.id === noteToEdit.id);
            if (index !== -1) {
                // Update properties
                allNotes[index].title = NoteTitle.value;
                allNotes[index].content = NoteText.value;
        
                // Save back to localStorage
                localStorage.setItem("notes", JSON.stringify(allNotes));
                UpdateGetNotes();
                overlay.remove();
                noteToEdit.style.position = "";
                noteToEdit.style.zIndex = "";
                noteToEdit.style.top = "";
                noteToEdit.style.width = "";
                noteToEdit.style.height = "";
                saveButton.remove();
                editButton.style.display= "block";
                deleteButton.style.display= "block";
                const notes = document.querySelectorAll('.TypeNote');
        notes.forEach(note=>{
            note.remove();
        });
        update();
            } else {
                console.log("Note not found");
            }
        });
    }
   
});