import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import {Todolist} from './Todolist';
import {useSelector} from 'react-redux';
import {RootState} from './app/store';
import {TodolistType} from './model/todolists-reducer';

export const Todolists = () => {

    const todolists = useSelector<RootState, TodolistType[]>((state) => state.todolists);

    return <>
        {todolists.map(el => {
            return (
                <Grid>
                    <Paper sx={{p: '0 20px 20px 20px'}}>
                        <Todolist
                            key={el.id}
                            todolist={el}
                        />
                    </Paper>
                </Grid>
            )
        })}
    </>
};