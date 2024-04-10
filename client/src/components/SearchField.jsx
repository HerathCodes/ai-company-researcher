import React, {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';


function SearchField(props) {

    const [query, setQuery] = useState('');
    const [companies, setCompanies] = useState([]);

    const [loading, setLoading] = useState(true);
    
    const filter = createFilterOptions();
    const { isAuthenticated, callback } = props;


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
      
    useEffect(() => {

        let active = true;

        if (!loading) {
            return undefined;
        }

        const fetchCompanies = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3000/api/companies/`);
                await sleep(1500);
                if (response.status === 200) {
                    const data = await response.json();
                    console.log(data);
                    setCompanies(data);
                } else {
                    console.error('Failed to fetch companies:', response.statusText);
                }
            } catch (error) {
                console.error('GET Error: ' + error);
            } finally {
                console.log("done loading");
                setLoading(false);
            }
        }
        
        if (active) {
            fetchCompanies();
        }

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (query) {
            callback(query);
            setQuery('');
        }
      }, [query]);

    return (
        <Autocomplete
            value={query}
            id="custom-autocomplete"
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
            loading={loading}
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
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
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