import './App.css';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector} from 'react-redux';
import {RootState} from './store';
import {getTheme} from '../common/theme/theme';
import {Header} from '../Header';
import {Main} from '../Main';


export type ThemeMode = 'dark' | 'light'

function App() {

    const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode)


    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline/>
            <Header/>
            <Main/>
        </ThemeProvider>
    )
}

export default App;
