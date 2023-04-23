


//step-1---this line will be add whole app including button in notescontainer app
const notesContainer = document.getElementById("app");



//step---2addnotebutton contain <button class="addnote">+</button>
const addNoteButton = notesContainer.querySelector(".addnote");


getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

//-----step-3
// this is put event listen on button 
//when ever yiu click it  addnote function will fire
addNoteButton.addEventListener("click", () => addNote());



//----------step-5
//this is method getitem(key) to get the value at key
//here the two key stickey note or khali array
function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

//---------step-6 redirect to step-4
//setitem(key,value) this is the method to set the key and value
//here the key is sticky note and value save in form of string


//-------imp note the value and key must be in the form of the string


// if there is object then convert is by json.stringify(obj)
//and revrese it json.parse(string) convert it to the obj
function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}




//--------step 7
//this function use id and content and work ahead
//in variable element new textarea created
//this give note class
// and fill it with the conten if any there
//placeholder is set by default if ther is no content

function createNoteElement(id, content) {
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Double-tap-to-remove";


    //--------step-8
    //updatre the note within the creat note
    //using id and content

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });


    //-------------step-9
    //logic for deletion of the note

    element.addEventListener("dblclick", () => {
        const doDelete = confirm(
            "Are you sure you wish to delete this sticky note?"
        );

        if (doDelete) {
            deleteNote(id, element);
        }
    });

    return element;
}



//---step-4
//notes variable has all the notes ID AND CONTENT(content if changed)
//if there is no contain there are blank note generated

//add note function add the id and content blank at the webpage
//------step 7 ahead createlemnt using id and content
function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };


    //using step-7 noteis created using id and content
    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    
    //notecontainer variable step-1
    //insertbefore is used to insert the child node before the existing child node
    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}


//----step-8 logic
//updation logic
function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
}

//------step-9 logic
//deletion logic
function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id != id);



    //if the data is deleted but save in local storage
    saveNotes(notes);
    notesContainer.removeChild(element);
}
