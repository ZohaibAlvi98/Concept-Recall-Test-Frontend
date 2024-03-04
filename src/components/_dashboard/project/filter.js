import React, { useState } from 'react';
import { Stack, TextField, MenuItem, Button, Paper, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import MyDropdown from "./DropDown";
import { LoadingButton } from '@material-ui/lab';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Swal from 'sweetalert2';

const Filter = ({ handleFilterChange, getProjectData }) => {
    const [filterBy, setFilterBy] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('oldest');

    const handleApplyFilters = () => {
        if((filterBy != '' && filterValue == '' ) || (filterBy == '' && filterValue != '')){
            return Swal.fire('Error', 'Please Add the Search value', 'error');

        }
        handleFilterChange(filterBy, filterValue, sortBy, sortOrder);
    };

    const handleClearFilters = () => {
        getProjectData()
        setFilterBy('')
        setFilterValue('')
        setSortBy('')
        setSortOrder("oldest")
    };

    return (
        <Accordion elevation={3} sx={{ marginY: 2, borderRadius: 2, '&.MuiAccordion-root:before': { display: 'none' } }}>
            <AccordionSummary   expandIcon={<ExpandMoreIcon />}>
                Filters
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={{ xs: 2, md: 3 }} fullWidth>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <MyDropdown
                            array={[
                                { value: 'name', label: 'Name' },
                                { value: 'techStacks', label: 'Tech Stacks' },
                            ]}
                            heading="Filter By"
                            type="filter"
                            setStates={(type, val) => {
                                setFilterBy(val);
                                setFilterValue('')
                            }}
                            selectedVal={filterBy}
                        />

                        {filterBy === 'name' ? (
                            <TextField
                                label="Search by Name"
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                        ) : filterBy === 'techStacks' ?(
                            <MyDropdown
                                array={[
                                    { value: 'MERN', label: 'MERN' },
                                    { value: 'MEAN', label: 'MEAN' },
                                    { value: 'DOTNET', label: 'DOTNET' },
                                    // Add more tech stacks as needed
                                ]}
                                heading="Select Tech Stack"
                                type="techStacks"
                                setStates={(type, val) => { setFilterValue(val)}}
                                selectedVal={filterValue}
                            />
                        ): null}
                    </Stack>

                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                        <MyDropdown
                            array={[
                                { value: 'az', label: 'AZ' },
                                { value: 'za', label: 'ZA' },
                                // Add more sorting options as needed
                            ]}
                            heading="Sort Alphabetically"
                            type="sort"
                            setStates={(type, val) => { setSortBy(val)}}
                            selectedVal={sortBy}
                            sx={{ minWidth: 120 }} // Set minimum width for the dropdown
                        />

                        <MyDropdown
                            array={[
                                { value: 'newest', label: 'Newest to Oldest' },
                                { value: 'oldest', label: 'Oldest to Newest' },
                                // Add more sorting options as needed
                            ]}
                            heading="Sort by Date"
                            type="sort"
                            setStates={(type,val) => setSortOrder(val)}
                            selectedVal={sortOrder}
                            sx={{ minWidth: 120 }} // Set minimum width for the dropdown
                        />


                    </Stack>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <LoadingButton variant="contained" fullWidth onClick={handleApplyFilters}>
                            Apply Filters
                        </LoadingButton>
                        <LoadingButton color='error' variant="contained" fullWidth onClick={handleClearFilters}>
                            Clear
                        </LoadingButton>
                    </Stack>
                    
                </Stack>
            </AccordionDetails>
        </Accordion>

    );
};

export default Filter;
