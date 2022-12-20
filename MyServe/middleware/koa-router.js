const router = require('koa-router')();
const path = require('path')
const todoJsonPath = path.join(__dirname,'../data/todo/index.json')
const fileUtils = require('../utils/file_utils')
//查询所有todo
router.get('/api/todo/lists',async(ctx,next) =>{
    try{
        const json = await getAll(todoJsonPath)
        ctx.response.body = {
            code:20000,
            data:{
                todo:json.todo
            }
        }
    } catch(error){
        const errorMsg = {
            message: '读取文件内容失败, 文件资源不存在',
            status: 404
        }
        ctx.response.body = JSON.stringify(errorMsg)
    }
})
//增加一个todo
router.post('/api/todo/add',async(ctx,next) =>{
    const {todo} = ctx.request.body
    console.log(ctx.request.body)
    try {
        const json = await getAll(todoJsonPath)

        json.todo.push(todo)
        await fileUtils.setFileJsonData(todoJsonPath, JSON.stringify(json))

        ctx.response.body = {
            code: 20000,
            data: {
                todo: json.todo
            }
        }
    } catch (error) {
        const errorMsg = {
            message: '添加失败',
            status: 404
        }
        ctx.response.body = JSON.stringify(errorMsg)
    }
})
// 删除一个 todo
router.post('/api/todo/delete', async (ctx, next) => {
    const { id } = ctx.request.body
    try {
        const json = await getAll(todoJsonPath)

        json.todo = json.todo.filter(todo => todo.id !== id)
        await fileUtils.setFileJsonData(todoJsonPath, JSON.stringify(json))

        ctx.response.body = {
            code: 20000,
            data: {
                todo: json.todo
            }
        }
    } catch (error) {
        const errorMsg = {
            message: '删除失败',
            status: 404
        }
        ctx.response.body = JSON.stringify(errorMsg)
    }
})
//修改一个todo
router.post('/api/todo/update', async (ctx, next) => {
    const { id, title } = ctx.request.body
    try {
        const json = await getAll(todoJsonPath)
        json.todo.forEach((todo) => {
            if (todo.id === id) todo.title = title
        })

        await fileUtils.setFileJsonData(todoJsonPath, JSON.stringify(json))

        ctx.response.body = {
            code: 20000,
            data: {
                todo: json.todo
            }
        }
    } catch (error) {
        const errorMsg = {
            message: '修改失败',
            status: 404
        }
        ctx.response.body = JSON.stringify(errorMsg)
    }
})
router.post('/api/todo/check', async (ctx, next) => {
    const { id } = ctx.request.body
    try {
        const json = await getAll(todoJsonPath)
        json.todo.forEach((todo) => {
            if (todo.id === id) todo.done = !todo.done;
        });

        await fileUtils.setFileJsonData(todoJsonPath, JSON.stringify(json))

        ctx.response.body = {
            code: 20000,
            data: {
                todo: json.todo
            }
        }
    } catch (error) {
        const errorMsg = {
            message: '修改失败',
            status: 404
        }
        ctx.response.body = JSON.stringify(errorMsg)
    }
})
//全选
router.post('/api/todo/checkAll', async (ctx, next) => {
    const { done } = ctx.request.body
    try {
        const json = await getAll(todoJsonPath)
        json.todo.forEach((todo) => {
            todo.done = done;
        });

        await fileUtils.setFileJsonData(todoJsonPath, JSON.stringify(json))

        ctx.response.body = {
            code: 20000,
            data: {
                todo: json.todo
            }
        }
    } catch (error) {
        const errorMsg = {
            message: '修改失败',
            status: 404
        }
        ctx.response.body = JSON.stringify(errorMsg)
    }
})
//清除
router.post('/api/todo/clearAll', async (ctx, next) => {
    try {
        const json = await getAll(todoJsonPath)

        json.todo = json.todo.filter((todo) => {
            return !todo.done;
        });

        await fileUtils.setFileJsonData(todoJsonPath, JSON.stringify(json))

        ctx.response.body = {
            code: 20000,
            data: {
                todo: json.todo
            }
        }
    } catch (error) {
        const errorMsg = {
            message: '修改失败',
            status: 404
        }
        ctx.response.body = JSON.stringify(errorMsg)
    }
})
async function getAll(jsonPath){
    const result = await fileUtils.getFileJsonData(jsonPath)
    const json = JSON.parse(result)
    return json;
}
module.exports = router.routes();
