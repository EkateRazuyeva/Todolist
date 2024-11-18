import {AddItemForm} from './AddItemForm';
import {TodolistType} from './model/todolists-reducer';
import {FilterTasksButtons} from './FilterTasksButtons';
import {addTaskAC} from './model/tasks-reducer';
import {useDispatch} from 'react-redux';
import {TodolistTitle} from './TodolistTitle';
import {Tasks} from './Tasks';


type Props = {
    todolist: TodolistType,
}

export const Todolist = ({todolist}: Props) => {
    const dispatch = useDispatch();

    const addTaskCallback = (title: string) => {
        dispatch(addTaskAC({title, todolistId: todolist.id}));
    };


    return (
        <>
            <TodolistTitle todolist={todolist} />
            <AddItemForm addItem={addTaskCallback} />
            <Tasks todolist={todolist} />
            <FilterTasksButtons todolist={todolist} />
        </>
    )
}