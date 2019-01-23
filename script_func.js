const renderButtons = function(projectsarray){
    projectsarray.forEach(function(project) {
    const button = document.createElement('button')
    button.textContent = project.title
    button.id = project.id
    button.className = 'mainButton'
    document.querySelector('#buttonWrapper').appendChild(button)
})
}

const renderRelatedProjects = function(projectarray, buttonid){
    const project = projectarray.find(function(e){
        return e.id === buttonid
    })

    let headerBar = document.querySelector('#headerBar')
    headerBar.innerHTML = ''
    project.relatedProjects.forEach(function(e){
        let a = document.createElement('a')
        a.textContent = e.name
        a.href = e.link
        a.className = 'headerlink'
        headerBar.appendChild(a)
    })
}