import React, { ChangeEvent, useEffect, useState } from "react"
import axios from "axios"
import { Todolist } from "../features/todolists/api/todolistsApi.types"
import { DomainTask, GetTasksResponse, UpdateTaskModel } from "../features/todolists/api/tasksApi.types"
import { todolistsApi } from "../features/todolists/api/todolistsApi"
import { tasksApi } from "../features/todolists/api/tasksApi"
import { EditableSpan } from "common/components"
import { AddItemForm } from "common/components"
import Checkbox from "@mui/material/Checkbox"
import { TaskStatus } from "common/enum/enum"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<any>({})

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)
      todolists.forEach((tl) => {
        axios
          .get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
            headers: {
              Authorization: "Bearer c9d215b9-78a3-4f0e-8ea7-59879c62fa89",
              "API-KEY": "10d6e6f8-7d62-45e4-b7cd-431b71ca06ba",
            },
          })
          .then((res) => {
            setTasks({ ...tasks, [tl.id]: res.data.items })
          })
      })
    })
  }, [])

  const createTodolistHandler = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      setTodolists([res.data.data.item, ...todolists])
    })
  }

  const removeTodolistHandler = (id: string) => {
    todolistsApi.deleteTodolist(id).then((res) => {
      setTodolists(todolists.filter((t) => t.id !== id))
    })
  }

  const updateTodolistHandler = (id: string, title: string) => {
    todolistsApi.updateTodolist({ id, title }).then((res) => {
      setTodolists(todolists.map((t) => (t.id === id ? { ...t, title: title } : t)))
    })
  }

  const createTaskHandler = (title: string, todolistId: string) => {
    tasksApi.createTask({ title, todolistId }).then((res) => {
      const newTask = res.data.data.item
      setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    })
  }

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    tasksApi.deleteTask({ taskId, todolistId }).then((res) => {
      setTasks(tasks.filter((t: DomainTask) => t.id !== taskId))
    })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

    const model: UpdateTaskModel = {
      status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    }
    tasksApi.changeTaskStatus({ e, task }).then((res) => {
      const newTasks = tasks[task.todoListId].map((t: DomainTask) => (t.id === task.id ? { ...t, ...model } : t))
      setTasks({ ...tasks, [task.todoListId]: newTasks })
    })
  }

  const changeTaskTitleHandler = (title: string, task: DomainTask) => {
    const model: UpdateTaskModel = {
      status: task.status,
      title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    }
    tasksApi.changeTaskTitle({ task, title }).then((res) => {
      const newTasks = tasks[task.todoListId].map((t: DomainTask) => (t.id === task.id ? { ...t, ...model } : t))
      setTasks({ ...tasks, [task.todoListId]: newTasks })
    })
  }

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map((tl) => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan value={tl.title} onChange={(title: string) => updateTodolistHandler(tl.id, title)} />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task: DomainTask) => {
                return (
                  <div key={task.id}>
                    <Checkbox
                      checked={task.status === 2 ? true : false}
                      onChange={(e) => changeTaskStatusHandler(e, task)}
                    />
                    <EditableSpan value={task.title} onChange={(title) => changeTaskTitleHandler(title, task)} />
                    <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                  </div>
                )
              })}
          </div>
        )
      })}
    </div>
  )
}

// Styles
const todolist: React.CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
