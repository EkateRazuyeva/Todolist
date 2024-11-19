import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm'
import {EditableSpan} from '../common/components/EditableSpan/EditableSpan'
import axios from 'axios';

export type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number
}

type FieldError = {
    error: string
    field: string
}

type CreateTodolistResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {
        item: Todolist
    }
}

type DeleteTodolistResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {}
}

export type UpdateTodolistResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {}
}

type DomainTask = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type  GetTasksResponse = {
    error: string | null
    items: DomainTask[]
    totalCount: number
}

type CreateTaskResponse = {
    data: { item: DomainTask }
    fieldsErrors: FieldError[]
    messages: string[]
    resultCode: number
}

export type UpdateTaskModel = {
    description: string
    title: string
    status: number
    priority: number
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

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<any>({})

    useEffect(() => {
        axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            headers: {
                Authorization: 'Bearer c9d215b9-78a3-4f0e-8ea7-59879c62fa89'
            }
        }).then(res => {
            const todolists = res.data
            setTodolists(todolists)
            todolists.forEach(tl => {
                axios
                    .get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
                        headers: {
                            Authorization: 'Bearer c9d215b9-78a3-4f0e-8ea7-59879c62fa89',
                            'API-KEY': '10d6e6f8-7d62-45e4-b7cd-431b71ca06ba',
                        },
                    })
                    .then(res => {
                        setTasks({...tasks, [tl.id]: res.data.items})
                    })
            })
        })
    }, []);

    const createTodolistHandler = (title: string) => {
        axios.post<CreateTodolistResponse>(
            'https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title},
            {
                headers: {
                    Authorization: 'Bearer c9d215b9-78a3-4f0e-8ea7-59879c62fa89',
                    'API-KEY': '10d6e6f8-7d62-45e4-b7cd-431b71ca06ba',
                },
            }
        )
            .then(res => {
                setTodolists([res.data.data.item, ...todolists])
            })
    };

    const removeTodolistHandler = (id: string) => {
        axios
            .delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
                headers: {
                    Authorization: 'Bearer c9d215b9-78a3-4f0e-8ea7-59879c62fa89',
                    'API-KEY': '10d6e6f8-7d62-45e4-b7cd-431b71ca06ba',
                },
            })
            .then(res => {
                setTodolists(todolists.filter(t => t.id !== id))
            })
    };

    const updateTodolistHandler = (id: string, title: string) => {
        axios
            .put<UpdateTodolistResponse>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
                {title},
                {
                    headers: {
                        Authorization: 'Bearer c9d215b9-78a3-4f0e-8ea7-59879c62fa89',
                        'API-KEY': '10d6e6f8-7d62-45e4-b7cd-431b71ca06ba',
                    },
                }
            )
            .then(res => {
                setTodolists(todolists.map(t => t.id === id ? {...t, title: title} : t))
            })
    };

    const createTaskHandler = (title: string, todolistId: string) => {
        axios.post<CreateTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
            {title},
            {
                headers: {
                    Authorization: 'Bearer c9d215b9-78a3-4f0e-8ea7-59879c62fa89',
                    'API-KEY': '10d6e6f8-7d62-45e4-b7cd-431b71ca06ba',
                },
            }).then(res => {
            const newTask = res.data.data.item
            setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        })
    };

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        axios
            .delete<DeleteTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {
                headers: {
                    Authorization: 'Bearer c9d215b9-78a3-4f0e-8ea7-59879c62fa89',
                    'API-KEY': '10d6e6f8-7d62-45e4-b7cd-431b71ca06ba',
                },
            })
            .then(res => {
                setTasks(tasks.filter((t: DomainTask) => t.id !== taskId))
            })
    };

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
        let status = e.currentTarget.checked ? 2 : 0

        const model: UpdateTaskModel = {
            status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }

        axios
            .put<UpdateTaskResponse>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
                model,
                {
                    headers: {
                        Authorization: 'Bearer c9d215b9-78a3-4f0e-8ea7-59879c62fa89',
                        'API-KEY': '10d6e6f8-7d62-45e4-b7cd-431b71ca06ba',
                    },
                }
            )
            .then(res => {
                const newTasks = tasks[task.todoListId].map((t: DomainTask) => t.id === task.id ? {...t, ...model} : t);
                setTasks({...tasks, [task.todoListId]: newTasks})
            })
    };

    const changeTaskTitleHandler = (title: string, task: any) => {
        const model: UpdateTaskModel = {
            status: task.status,
            title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }

        axios
            .put<UpdateTaskResponse>(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
                model,
                {
                    headers: {
                        Authorization: 'Bearer c9d215b9-78a3-4f0e-8ea7-59879c62fa89',
                        'API-KEY': '10d6e6f8-7d62-45e4-b7cd-431b71ca06ba',
                    },
                }
            )
            .then(res => {
                const newTasks = tasks[task.todoListId].map((t: DomainTask) => t.id === task.id ? {...t, ...model} : t);
                setTasks({...tasks, [task.todoListId]: newTasks})
            })
    };

    return (
        <div style={{margin: '20px'}}>
            <AddItemForm addItem={createTodolistHandler}/>

            {/* Todolists */}
            {todolists.map((tl) => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                value={tl.title}
                                onChange={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={title => createTaskHandler(title, tl.id)}/>

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: DomainTask) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.status === 2 ? true : false}
                                            onChange={e => changeTaskStatusHandler(e, task)}
                                        />
                                        <EditableSpan
                                            value={task.title}
                                            onChange={title => changeTaskTitleHandler(title, task)}
                                        />
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
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}