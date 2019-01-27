'use strict'

// console.log(uuidv4())

// read existing notes from local storage
const getSavedNotes =  () => {
    const notesJSON = localStorage.getItem('notes');
    try {
        return notesJSON ?  JSON.parse(notesJSON) :  []
    }
    catch (e){
        return []
    }
}

// remove a note
const removeNote =  (id) => {
    const noteIndex = notes.findIndex((note) => id == note.id)
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// Generate the DOM structure for a note
const generateNoteDOM =  (note) => {
    const noteEl = document.createElement('div');
    const textEl = document.createElement('a')
    const button = document.createElement('button')

    // Setup the remove note button
    button.textContent = 'x'
    noteEl.appendChild(button)
    button.addEventListener('click',  () => {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })
    // setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    }
    else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.setAttribute('href', `/notesapp/edit.html#${note.id}`)
    noteEl.appendChild(textEl)

    return noteEl;
}

// sort your notes by 1 of 3 ways
const sortNotes =  (notes, sortBy) => {
    switch (sortBy) {
        case 'byEdited':
            return notes.sort( (a, b) => {
                if (a.updatedAt > b.updatedAt) { return -1 }
                else if (a.updatedAt < b.updatedAt) { return 1 }
                else { return 0 }
            })
            break;
        case 'byCreated':
            return notes.sort( (a, b) => {
                if (a.createdAt > b.createdAt) { return -1 }
                else if (a.createdAt < b.createdAt) { return 1 }
                else { return 0 }
            })
            break;
        case 'alphabetical':
            return notes.sort( (a, b) => {
                if (a.title.toLowerCase() < b.title.toLowerCase()) { return -1 }
                else if (a.title.toLowerCase() > b.title.toLowerCase()) { return 1 }
                else { return 0 }
            })
            break;
    }
}




// Rendering application notes
const renderNotes =  (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter( (note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    // console.log(filteredNotes);

    document.querySelector('#notesWrapper').innerHTML = '';
    filteredNotes.forEach( (note) => {
        const noteEl = generateNoteDOM(note);
        document.querySelector('#notesWrapper').appendChild(noteEl);
    });
}

// save the notes to local storage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}



