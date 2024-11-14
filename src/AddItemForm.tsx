import {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddBox from '@mui/icons-material/AddBox'

type Props = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: Props) => {
    const [itemTitle, setItemTitle] = useState('');
    const [error, setError] = useState<string | null>(null);


    const addItemHandler = () => {
        if (itemTitle.trim() !== '') {
            addItem(itemTitle.trim());
            setItemTitle('')
        } else {
            setError('Title is required')
        }
    };

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    };

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    };

    return (
        <div>
            <TextField
                label="Enter a title"
                variant={'outlined'}
                className={error ? 'error' : ''}
                onChange={changeItemTitleHandler}
                onKeyUp={addItemOnKeyUpHandler}
                value={itemTitle}
                size={'small'}
                error={!!error}
                helperText={error}
            />
            <IconButton color={'primary'} onClick={addItemHandler}>
                <AddBox/>
            </IconButton>
        </div>
    )
}