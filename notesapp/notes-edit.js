'use strict'

const noteId = location.hash.substring(1)
let notes = getSavedNotes()

let note = notes.find( (note) => note.id === noteId)


if (!note) {
    location.assign('/notesapp/index.html')
}

document.querySelector('#note-title').value = note.title
document.querySelector('#note-body').value = note.body
document.querySelector('#lastEdited').textContent = `Last edited: ${moment(note.updatedAt).fromNow()}`

// event listener for note title
document.querySelector('#note-title').addEventListener('input',  (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    saveNotes(notes)
    document.querySelector('#lastEdited').textContent = `Last edited: ${moment(note.updatedAt).fromNow()}`
})


// event listener for note body
document.querySelector('#note-body').addEventListener('input',  (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    saveNotes(notes)
    document.querySelector('#lastEdited').textContent = `Last edited: ${moment(note.updatedAt).fromNow()}`
})

// event listener for remove button
document.querySelector('#remove-note').addEventListener('click',  (e) => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/notesapp/index.html')
})


window.addEventListener('storage',  (e) => {
    // console.log(e)
    if (e.key === 'notes') {
        // console.log(e)
        notes = JSON.parse(e.newValue)
        note = notes.find( (note) => note.id === noteId)


        if (!note) {
            location.assign('/notesapp/index.html')
        }
        document.querySelector('#note-title').value = note.title
        document.querySelector('#note-body').value = note.body
        document.querySelector('#lastEdited').textContent = `Last edited: ${moment(note.updatedAt).fromNow()}`

    }

})


