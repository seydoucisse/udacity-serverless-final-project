import { TodosAccess } from './todosAcess'
import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import * as createError from 'http-errors'

// DONE: Implement businessLogic

const logger = createLogger('TodosLogic')
const todosAccess: TodosAccess = new TodosAccess()
const attachmentUtils: AttachmentUtils = new AttachmentUtils()

export async function getTodos(userId: string): Promise<TodoItem[]> {
    logger.info('Getting all todos')

    return todosAccess.getTodos(userId)
}

export async function createTodo(createTodoRequest: CreateTodoRequest, userId: string): Promise<TodoItem> {
    logger.info('Creating a todo')

    const todoId = uuid.v4()
    const createdAt = new Date().toISOString()
    const todoItem = {
        todoId,
        userId,
        createdAt,
        done: false,
        ...createTodoRequest
    }

    if(!todoItem.name) {
        throw new createError.BadRequest('Todo name is required')
    }

    return todosAccess.createTodo(todoItem)
}

export async function updateTodo(todoId: string, userId: string, updateTodoRequest: UpdateTodoRequest): Promise<void> {
    logger.info('Updating a todo')

    if(!updateTodoRequest.name) {
        throw new createError.BadRequest('Todo name is required')
    }
    

    return todosAccess.updateTodo(todoId, userId, updateTodoRequest)
}

export async function deleteTodo(todoId: string, userId: string): Promise<void> {
    logger.info('Deleting a todo')

    if(!todoId) {
        throw new createError.BadRequest('Todo id is required')
    }

    await todosAccess.deleteTodo(todoId, userId)
}

export async function createAttachmentPresignedUrl(todoId: string, userId: string): Promise<string> {
    logger.info('Generating upload url')

    if(!todoId) {  
        throw new createError.BadRequest('Todo id is required')
    }

    const attachmentUrl = attachmentUtils.getAttachmentUrl(todoId)
    await todosAccess.updateTodoWithAttachmentUrl(todoId, userId, attachmentUrl)

    return attachmentUtils.generateUploadUrl(todoId)
}
