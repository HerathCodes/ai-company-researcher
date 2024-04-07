import React, {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { createTheme } from '@mui/system';


const theme = createTheme({
})

function SearchField() {

    const [query, setQuery] = useState('');
    const [companies, setCompanies] = useState([]);

    const filter = createFilterOptions();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/companies/`);
    
                if (response.status === 200) {
                    const data = await response.json();
                    setCompanies(data);
                } else {
                    console.error('Failed to fetch companies:', response.statusText);
                }
            } catch (error) {
                console.error('GET Error: ' + error);
            }
        }

        fetchCompanies();
    }, []);

    return (
        <Autocomplete
            value={query}
            onChange={(event, newQuery) => {
                if (typeof newQuery === 'string') {
                    setQuery({
                    Name: newQuery,
                  });
                } else if (newQuery && newQuery.inputValue) {
                  // Create a new value from the user input
                  setQuery({
                    Name: newQuery.inputValue,
                  });
                } else {
                  setQuery(newQuery);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                const isExisting = options.some((option) => inputValue === option.Name);
                if (inputValue !== '' && !isExisting) {
                  filtered.push({
                    inputValue,
                    title: `Get the gist of "${inputValue}!"`,
                  });
                }
        
                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="search"
            options={companies}
            getOptionLabel={(option) => {
                if (typeof option === 'string') {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option.Name;
              }}
            renderOption={(props, option) => <li {...props}>{option.Name}</li>}
            sx={
                { 
                    width: 800,
                    borderRadius: 10,
                }
            }
            freeSolo
            renderInput={(params) => (
                <TextField 
                    {...params} 
                    label="search company..."
                    fullWidth
                    sx={ 
                        { 
                            borderRadius: 10, 
                            width:800 
                        } 
                    }
                    variant="filled"
                />
            )}
        />
    );
}

export default SearchField