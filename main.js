const todoUrl = 'https://jsonplaceholder.typicode.com/todos';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts';

// GET REQUEST
function getTodos() {
    axios.get(`${todoUrl}?_limit=5`)
        .then(res => showOutput(res))
        .catch(err => console.error(err))
}

// POST REQUEST
function addTodo() {
    axios.post(`${todoUrl}`, {
        title: 'Hello World',
        completed: true
    }).then(res => showOutput(res))
        .catch(err => console.error(err))
}

// PUT/PATCH REQUEST
function updateTodo() {
    axios.patch(`${todoUrl}/1`, {
        title: "Some text",
        completed: true
    }).then(res => showOutput(res))
        .catch(err => console.error(err))
}

// DELETE REQUEST
function removeTodo() {
    axios.delete(`${todoUrl}/1`)
        .then(res => showOutput(res))
        .catch(err => console.error(err))
}

// SIMULTANEOUS DATA
function getData() {
    axios.all([
        axios.get(`${todoUrl}?_limit=5`),
        axios.get(`${postsUrl}?_limit=5`)
    ]).then(axios.spread((todos, posts) => showOutput(todos)))
        .catch(err => console.error(err))
}

// CUSTOM HEADERS
function customHeaders() {
    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: 'token'
        }
    };

    axios.post(`${todoUrl}`,
        {
            title: 'Hello',
            completed: true
        }, config)
        .then(res => showOutput(res))
        .catch(err => console.error(err))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
    console.log('Transform Response');
}

// ERROR HANDLING
function errorHandling() {
    axios.get('https://jsonplaceholder.typicode.com/todoss')
        .then(res => showOutput(res))
        .catch(err => {
            if (err.response){
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers)
            }
        })
}

// CANCEL TOKEN
function cancelToken() {
    console.log('Cancel Token');
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
    config => {
        console.log(`${config.method.toUpperCase()} sent to ${config.url} at ${new Date().toLocaleDateString()}`);
        return config;
    }, error => {
        return Promise.reject(error)
    });

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
    document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>
  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);