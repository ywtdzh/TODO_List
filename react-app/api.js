import axios from "axios/index";

const getUser = (callback) => {
    axios.get('/rest-api/user')
        .then(function (response) {
            callback(response);
        });
};
const getTodos = (callback) => {
    axios.get('/rest-api/todo')
        .then(function (response) {
            callback(response);
        });
};

const login = (username, password, callback) => {
    axios.get('/login', {
        params: {
            username: username,
            password: password
        }
    })
        .then(function (response) {
            callback(response);
        });
};

const register = (username, password, email, callback) => {
    axios.get('/register', {
        params: {
            username: username,
            password: password,
            email: email
        }
    })
        .then(function (response) {
            callback(response);
        });
};

const logout = (callback) => {
    axios.get('/logout')
        .then(function (response) {
            callback(response);
        });
};

const postTodo = (title, description, expiredDate, priority, callback) => {
    axios.post('/todo/post', {
        title: title,
        description: description,
        timestamp: expiredDate,
        priority: priority
    })
        .then(function (response) {
            callback(response);
        });
};

const altStatus = (id, status, callback) => {
    axios.get('/todo/status', {
        params: {
            id: id,
            status: status
        }
    })
        .then(function (response) {
            callback(response);
        });
};

const delTodo = (id, callback) => {
    axios.get('/todo/del', {params: {id: id}})
        .then(function (response) {
            callback(response);
        });
};

const editTodo = (id, title, description, callback) => {
    axios.post('/todo/edit', {
        id: id,
        title: title,
        description: description
    })
        .then(function (response) {
            callback(response);
        });
};
export default {getUser, getTodos, login, logout,
    register, postTodo, delTodo, editTodo, altStatus};