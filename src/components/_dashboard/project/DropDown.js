// material
import React, { useEffect } from 'react';

import { FormControl, MenuItem, InputLabel, Select } from '@material-ui/core';

const MyDropdown = (props) => {
    const { heading, array, setStates, type, selectedVal, index } = props;

    const [selectedOption, setSelectedOption] = React.useState('');

    useEffect(() => {
        setSelectedOption(selectedVal || ''); // Use selectedVal or an empty string if it's falsy
    }, [selectedVal]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        setStates(type, event.target.value, index);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="dropdown-label">{heading}</InputLabel>
            <Select
                labelId="dropdown-label"
                value={selectedOption}
                onChange={handleChange}
                displayEmpty
                label={heading}
                inputProps={{ 'aria-label': 'Select Option' }}
            >
                {array?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MyDropdown;