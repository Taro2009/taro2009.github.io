// TO DO: make related project string array into an object array and put the link in too with the title so the onclick will redirect to the right place
// addNewProject(title) függvény
// addNewRelatedProject(title, ['relatedproj1', relatedproj2])
const webprojects = [{
    title: 'JS Bootcamp',
    id: 'jsBoot',
    relatedProjects: [{
        name: 'notes',
        link: '/notesapp/index.html'
    },
    {
        name: 'todo',
        link: '/todoapp/index.html'
    }]
},
{
    title: 'Netacademia stuff', 
    id: 'netacademia',
    relatedProjects: [{
        name: 'bootstrap page',
        link: '/bootstrap/index.html'
    },{
        name: 'calculator',
        link: '/calc/index.html'
    },{
        name: 'snake',
        link: '/snake'
    },{
        name: 'flappybird',
        link: '/flappybird'
    }]
},
{
    title: 'JS Games',
    id: 'jsGames',
    relatedProjects: [{
        name: 'click shapes',
        link: '/link3'
    },{
        name: 'car driving',
        link: '/link4'
    },{
        name: 'target blaster',
        link: '/link4'
    },{
        name: 'catch objects',
        link: '/link4'
    },{
        name: 'card game',
        link: '/link4'
    }]
}]


// render the buttons in the middle
renderButtons(webprojects)


// get the html elements
let jsBoot = document.querySelector('#jsBoot')
let netacademia = document.querySelector('#netacademia')
let jsGames = document.querySelector('#jsGames')
document.querySelector('#footer').textContent = `© Horváth Barnabás ${moment().year()}`

// add event listeners
jsBoot.addEventListener('click', function() {
    renderRelatedProjects(webprojects, jsBoot.id)
})
netacademia.addEventListener('click', function(){
    renderRelatedProjects(webprojects, netacademia.id)
})
jsGames.addEventListener('click', function(){
    renderRelatedProjects(webprojects, jsGames.id)
})


