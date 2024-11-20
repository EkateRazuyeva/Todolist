import { FieldError } from "../../../common/types/types"
import { TaskPriority, TaskStatus } from "common/enum/enum"

export type DomainTask = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type GetTasksResponse = {
  error: string | null
  items: DomainTask[]
  totalCount: number
}

export type CreateTaskResponse = {
  data: { item: DomainTask }
  fieldsErrors: FieldError[]
  messages: string[]
  resultCode: number
}

export type UpdateTaskModel = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}

export type UpdateTaskResponse = {
  data: { item: UpdateTaskModel }
  resultCode: number
  messages: string[]
}

export type DeleteTaskResponse = {
  resultCode: number
  messages: string[]
  data: {}
}
