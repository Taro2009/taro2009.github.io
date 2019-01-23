// create filters and notes variables
let notes = getSavedNotes();

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters)

document.querySelector('#createNote').addEventListener('click', function (e) {
    const currId = uuidv4();

    const timestamp = moment().valueOf()
    notes.push({
        id: currId,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    })
    saveNotes(notes)
    renderNotes(notes, filters)
    location.assign(`/notesapp/edit.html#${currId}`)
})

document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value;
    renderNotes(notes, filters);
})

document.querySelector('#filterBy').addEventListener('change', function (e) {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage', function (e) {
    if (e.key === 'notes')
    {
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
        

    }
})

// const now = moment();
// now.year(1995)
// now.month(2)
// now.date(9)
// console.log(now.format('MMM D, Y'))

