export type ThemeMode = 'dark' | 'light'

type InitialState = typeof initialState

const initialState = {
    themeMode: 'light' as ThemeMode,
}

export const appReducer = (
    state: InitialState = initialState,
    action: ActionsType
): InitialState => {
    switch (action.type) {
        case 'CHANGE_THEME':
        return {...state, themeMode: action.payload.theme}
        default:
            return state
    }
}

// Action creators
// 1
export const changeThemeAC = (theme: ThemeMode) => {
    return {type: 'CHANGE_THEME', payload: {theme}}
};

// 2
// Actions types
type ChangeThemeActionType = ReturnType<typeof changeThemeAC>

type ActionsType = ChangeThemeActionType