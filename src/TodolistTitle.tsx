import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {changeTodolistTitleAC, removeTodolistAC, TodolistType} from './model/todolists-reducer';
import {useDispatch} from 'react-redux';

type Props={
    todolist: TodolistType
}

export const TodolistTitle = ({todolist}:Props) => {
    const {title, id}=todolist;

    const dispatch=useDispatch();

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(id))
    };

    const updateTodolistHandler = (title: string) => {
        dispatch(changeTodolistTitleAC({ id, title }))
    };

    return <div className={'todolist-title-container'}>
        <h3>
            <EditableSpan value={title} onChange={updateTodolistHandler}/>
        </h3>
        <IconButton onClick={removeTodolistHandler}>
            <DeleteIcon/>
        </IconButton>
    </div>

};