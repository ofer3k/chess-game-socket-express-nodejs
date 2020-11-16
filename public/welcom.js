let name='ofer'
let password='2134'

const params = new URLSearchParams(window.location.search)
document.getElementById('name').value=params.get('name')

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById('authors');
const url = 'http://localhost:3002/users';
fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  let authors = data;
  return authors.map(function(author) {
    let li = createNode('li'),
        score = createNode('score'),
        span = createNode('span');
        br=createNode('br')
    
    span.innerHTML = `${author.name}`+"<br>"+`score: ${author.password}`;
    
    append(li, span);
    // append(li, score);
    append(ul, li);

    
  })
})
.catch(function(error) {
  console.log(error);
});


// const sidebarTemplate=document.getElementById('sidebar-template').innerHTML
// //recieve username and room from the query selector
// const{username,room}=Qs.parse(location.search,{ ignoreQueryPrefix:true})

// const html=Mustache.render(sidebarTemplate,{
//     room,
//     users
// })
// document.querySelector('#sidebar').innerHTML=html

