import React, {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';


function SearchField(props) {

    const [query, setQuery] = useState('');
    const [companies, setCompanies] = useState([]);
    
    const filter = createFilterOptions();
    const { isAuthenticated, handleModal, handleQuerySubmit, handleCompanyUpdate, isCompanyAdded } = props;
      
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
        
        if (isCompanyAdded === true) {
            fetchCompanies();
            handleCompanyUpdate(false);
        }
    }, [isCompanyAdded]);

    useEffect(() => {
        if (query) {
            handleQuerySubmit(query);
            setQuery('');
        }
      }, [query]);

    return (
        <Autocomplete
            value={query}
            id="custom-autocomplete"
            onChange={(event, newQuery) => { // represents on click
                if (typeof newQuery === 'string') {
                    setQuery({
                        Name: newQuery,
                    });
                } else if (newQuery && newQuery.inputValue) {
                    // post new company
                    setQuery({
                        Name: newQuery.inputValue,
                    });
                    handleModal(true);
                    handleQuerySubmit(query);
                } else {
                    setQuery(newQuery);
                    handleQuerySubmit(query);
                }
            }}
            filterOptions={(options, params) => { // updates autocomplete options
                const filtered = filter(options, params);
                const { inputValue } = params;
                const isExisting = options.some((option) => inputValue === option.Name);
                if (inputValue !== '' && !isExisting && filtered.length === 0) {
                  filtered.push({
                    inputValue,
                    Name: `Get the gist of "${inputValue}!"`,
                  });
                }
        
                return filtered;
            }}
            selectOnFocus
            disableClearable
            clearOnBlur
            handleHomeEndKeys
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
            freeSolo
            renderInput={(params) => (
                <TextField 
                    {...params} 
                    label="search company..."
                    InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                    }}
                    fullWidth
                    sx={ 
                        { 
                            borderRadius: 10, 
                            width:800,
                        } 
                    }
                    variant="filled"
                />
            )}
        />
    );
}

export default SearchField