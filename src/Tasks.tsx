import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {getListItemSx} from './Todolist.styles';
import Checkbox from '@mui/material/Checkbox';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType} from './model/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {ChangeEvent} from 'react';
import {RootState} from './app/store';
import {TodolistType} from './model/todolists-reducer';

type Props={
    todolist: TodolistType,
}

export const Tasks = ({todolist}:Props) => {

    const dispatch =useDispatch();

    const tasks=useSelector<RootState,TasksStateType>(state=>state.tasks);

    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC({id: taskId, todolistId}));
    };

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({taskId, todolistId, isDone: taskStatus}))
    };

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({taskId, todolistId, title}));
    };

    const allTodolistTasks = tasks[todolist.id]

    let tasksForTodolist = allTodolistTasks;

    if (todolist.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
    }

    if (todolist.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
    }



    return <>
        {allTodolistTasks.length === 0
            ? <p>Тасок нет</p>
            : <List>
                {allTodolistTasks.map(task => {
                    const removeTaskHandler = () => {
                        removeTask(task.id, todolist.id)
                    };

                    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>, taskId: string,) => {
                        const newStatusValue = event.currentTarget.checked
                        changeTaskStatus(taskId, newStatusValue, todolist.id)
                    };

                    const changeTaskTitleHandler = (title: string) => {
                        updateTask(todolist.id, task.id, title)
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
    </>
};