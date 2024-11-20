import {
  CreateTaskResponse,
  DeleteTaskResponse,
  DomainTask,
  UpdateTaskModel,
  UpdateTaskResponse,
} from "./tasksApi.types"
import { ChangeEvent } from "react"
import { instance } from "../../../common/instance/instance"
import { TaskStatus } from "../../../common/enum/enum"

export const tasksApi = {
  createTask(payload: { title: string; todolistId: string }) {
    const { title, todolistId } = payload
    return instance.post<CreateTaskResponse>(`todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(payload: { taskId: string; todolistId: string }) {
    const { taskId, todolistId } = payload
    return instance.delete<DeleteTaskResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  changeTaskStatus(payload: { e: ChangeEvent<HTMLInputElement>; task: DomainTask }) {
    const { e, task } = payload
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

    const model: UpdateTaskModel = {
      status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    }
    return instance.put<UpdateTaskResponse>(`todo-lists/${task.todoListId}/tasks/${task.id}`, model)
  },
  changeTaskTitle(payload: { title: string; task: DomainTask }) {
    const { title, task } = payload
    const model: UpdateTaskModel = {
      status: task.status,
      title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    }
    return instance.put<UpdateTaskResponse>(`todo-lists/${task.todoListId}/tasks/${task.id}`, model)
  },
}
