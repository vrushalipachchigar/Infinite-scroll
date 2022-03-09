const container = document.getElementById('container');
const loading = document.querySelector('.loading');

getTodo();
getTodo();
getTodo();

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // console.log({ scrollTop, scrollHeight, clientHeight });

    if (clientHeight + scrollTop >= scrollHeight - 5) {
        // show the loading animation
        showLoading();
    }
});

function showLoading() {
    loading.classList.add('show');

    // load more data
    setTimeout(getTodo, 1000)
}

async function getTodo() {

    const todoResponse = await fetch(`https://jsonplaceholder.typicode.com/todos/${getRandomNr()}`);
    const todoData = await todoResponse.json();

    // const userResponse = await fetch('https://randomuser.me/api');
    // const userData = await userResponse.json();
    console.log(todoData)
    const data = { todo: todoData };

    addDataToDOM(data);
}

function getRandomNr() {
    return Math.floor(Math.random() * 100) + 1;
}

function addDataToDOM(data) {
    isRequestOn = true;
    const todoElement = document.createElement('div');
    todoElement.classList.add('todo-post');
    todoElement.innerHTML = `
		<h2 class="title">To Do: ${data.todo.title}</h2>
		<p class="status">Completed: ${data.todo.completed}</p>`;

    // 	<div class="user-info">
    // 		<img src="${data.user.picture.large}" alt="${data.user.name.first}" />
    // 		<span>${data.user.name.first} ${data.user.name.last}</span>
    // 	</div>
    // `;
    container.appendChild(todoElement);

    isRequestOn = false;
    loading.classList.remove('show');
}
let isRequestOn = false;