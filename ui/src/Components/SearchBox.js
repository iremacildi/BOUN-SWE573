import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = (props) => {

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto' }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search Service or Event"
                inputProps={{ 'aria-label': 'search services or events' }}
            />
            <IconButton type="submit" sx={{ p: '8px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

export default SearchBox;