const noteId = location.hash.substring(1)
let notes = getSavedNotes()

let note = notes.find(function (note) {
    return note.id === noteId
})


if (note === undefined) {
    location.assign('/notesapp/index.html')
}

document.querySelector('#note-title').value = note.title
document.querySelector('#note-body').value = note.body
document.querySelector('#lastEdited').textContent = `Last edited: ${moment(note.updatedAt).fromNow()}`

// event listener for note title
document.querySelector('#note-title').addEventListener('input', function (e) {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    saveNotes(notes)
    document.querySelector('#lastEdited').textContent = `Last edited: ${moment(note.updatedAt).fromNow()}`
})


// event listener for note body
document.querySelector('#note-body').addEventListener('input', function (e) {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    saveNotes(notes)
    document.querySelector('#lastEdited').textContent = `Last edited: ${moment(note.updatedAt).fromNow()}`
})

// event listener for remove button
document.querySelector('#remove-note').addEventListener('click', function (e) {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/notesapp/index.html')
})


window.addEventListener('storage', function (e) {
    // console.log(e)
    if (e.key === 'notes') {
        // console.log(e)
        notes = JSON.parse(e.newValue)
        note = notes.find(function (note) {
            return note.id === noteId
        })


        if (note === undefined) {
            location.assign('/notesapp/index.html')
        }
        document.querySelector('#note-title').value = note.title
        document.querySelector('#note-body').value = note.body
        document.querySelector('#lastEdited').textContent = `Last edited: ${moment(note.updatedAt).fromNow()}`

    }

})


