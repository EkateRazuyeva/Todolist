import './App.css';
import {Todolist} from './Todolist';
import {useState} from 'react';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'

import Grid from '@mui/material/Grid2'
import {MenuButton} from './MenuButton';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Switch from '@mui/material/Switch';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type ThemeMode = 'dark' | 'light'

function App() {

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#ef6c00',
            },
        },
    });

    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolist] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to watch', filter: 'all'}
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ]
    });

    const addTask = (title: string, todolistId: string) => {
        const newTask = {id: v1(), title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    };

    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)});
    };

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolist(todolists.map(el => (el.id === todolistId ? {...el, filter} : el)))
    };

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)})
    };

    const removeTodolist = (todolistId: string) => {
        setTodolist(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    };

    const addTodolist = (title: string) => {
        const todolistID = v1()
        const newTodolist: TodolistType = {id: todolistID, title, filter: 'all'};
        setTodolist([newTodolist, ...todolists])
        setTasks({...tasks, [todolistID]: []})
    };

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        const newTodolistTask = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? {...t, title} : t))
        };
        setTasks(newTodolistTask)
    };


    const updateTodolist = (todolistId: string, title: string) => {
        const newTodolist = todolists.map(td => td.id === todolistId ? {...td, title} : td);
        setTodolist(newTodolist)
    };


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position="static" sx={{mb: '30px'}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <MenuButton>Login</MenuButton>
                        <MenuButton>Logout</MenuButton>
                        <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler}/>
                    </div>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{mb: '30px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={4} sx={{mb: '30px'}}>
                    {todolists.map(el => {
                        const allTodolistTasks = tasks[el.id]

                        let tasksForTodolist = allTodolistTasks;
                        if (el.filter === 'active') {
                            tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                        }

                        if (el.filter === 'completed') {
                            tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                        }
                        return (
                            <Grid>
                                <Paper sx={{p: '0 20px 20px 20px'}}>
                                    <Todolist
                                        key={el.id}
                                        todolistId={el.id}
                                        title={el.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={el.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTask}
                                        updateTodolist={updateTodolist}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default App;
