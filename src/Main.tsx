import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import {AddItemForm} from './AddItemForm';
import {addTodolistAC} from './model/todolists-reducer';
import {useDispatch} from 'react-redux';
import {Todolists} from './Todolists';

export const Main = () => {
    const dispatch = useDispatch()

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    };

    return <Container fixed>
        <Grid container sx={{mb: '30px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={4} sx={{mb: '30px'}}>
            <Todolists/>
        </Grid>
    </Container>
}