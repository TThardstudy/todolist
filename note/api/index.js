import http from '../utils/request'
//在这里请求写在服务器端的方法并传参
export const getAllTodo = (data) =>{
    return http.get('/todo/lists')
}
export const addTodo = (data) => {
    return http.post('/todo/add', data)
}

export const deleteTodo = (data) => {
    return http.post('/todo/delete', data)
}

export const updateTodo = (data) => {
    return http.post('/todo/update', data)
}

export const checkTodo = (data) => {
    return http.post('/todo/check', data)
}

export const checkAllTodo = (data) => {
    return http.post('/todo/checkAll', data)
}

export const clearAllTodo = (data) => {
    return http.post('/todo/clearAll', data)
}
