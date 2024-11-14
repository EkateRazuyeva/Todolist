import {FilterValuesType, TaskType} from './App';
import {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box';
import {filterButtonsContainerSx, getListItemSx} from './Todolist.styles';


type PropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValuesType
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = ({
                             todolistId,
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             removeTodolist,
                             updateTask,
                             updateTodolist,
                             filter
                         }: PropsType) => {

    const addTaskCallback = (title: string) => {
        addTask(title, todolistId)
    }

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, todolistId)
    };

    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>, taskId: string,) => {
        const newStatusValue = event.currentTarget.checked
        changeTaskStatus(taskId, newStatusValue, todolistId)
    };

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    };

    const updateTodolistHandler = (title: string) => {
        updateTodolist(todolistId, title)
    };

    return (
        <div>
            <div className={'todolist-title-container'}>
                <h3>
                    <EditableSpan value={title} onChange={updateTodolistHandler}/>
                </h3>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskCallback}/>
            {tasks.length === 0
                ? <p>Тасок нет</p>
                : <List>
                    {tasks.map(task => {
                        const removeTaskHandler = () => {
                            removeTask(task.id, todolistId)
                        };

                        const changeTaskTitleHandler = (title: string) => {
                            updateTask(todolistId, task.id, title)
                        };

                        return (
                            <ListItem
                                key={task.id}
                                disableGutters
                                disablePadding
                                sx={getListItemSx(task.isDone)}
                            >
                                <div>
                                    <Checkbox
                                        checked={task.isDone}
                                        onChange={(e) => changeTaskStatusHandler(e, task.id)}
                                    />
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                </div>
                                <IconButton onClick={removeTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            }
            <Box sx={filterButtonsContainerSx}>
                <Button
                    variant={filter === 'all' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={() => changeFilterTasksHandler('all')}
                >
                    All
                </Button>
                <Button
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={() => changeFilterTasksHandler('active')}
                >
                    Active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                    onClick={() => changeFilterTasksHandler('completed')}
                >
                    Completed
                </Button>
            </Box>
        </div>
    )
}