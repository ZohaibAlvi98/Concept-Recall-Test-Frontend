import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
// material

// material
import { Box, Grid, Card, Stack, TextField, Typography, IconButton } from '@material-ui/core';
import { DatePicker, LoadingButton } from '@material-ui/lab';
import { Clear } from '@material-ui/icons';
import { UploadAvatar } from 'src/components/upload';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import MyDropdown from './DropDown';
import { getImageUrl } from 'src/utils/imageUrl';
import CoreHttpHandler from 'src/http/services/CoreHttpHandler';
import Swal from 'sweetalert2';

export default function ParentBuilderForm(props) {
    let { setLoading, handleSave, type, handleClose, updateType } = props;

    const [_data, set_Data] = useState(props?.data);
    const [image, setImage] = useState(props?.data?.image)

    const [techStacks, setTechStacks] = useState(props?.techStacks)


    const [items, setItems] = useState([])

    useEffect(() => {
        if (props?.data.length === 0 && _data.length == 0) {
            let d = {
                name: '',
                repoLink: '',
                liveUrl: '',
                description: '',
                image: ''
            };
            set_Data(d);
        }
    }, [props?.data]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: _data,
    });

    const { getFieldProps, touched, errors, setFieldValue, values } = formik;

    const onSubmit = () => {

        if (getFieldProps('name').value == undefined || getFieldProps('name').value == '') {
            return Swal.fire({
                title: 'Error',
                text: 'Name field cannot be empty',
                icon: 'error',
                customClass: {
                    container: 'my-swal'
                  }
            });
        }

        if(image == '' || image == undefined){
            return Swal.fire({
                title: 'Error',
                text: 'Upload Image',
                icon: 'error',
                customClass: {
                    container: 'my-swal'
                  }
            });
        }

        _data['name'] = getFieldProps('name').value;
        _data['repoLink'] = getFieldProps('repoLink').value;
        _data['description'] = getFieldProps('description').value;

        if (getFieldProps('startDate').value == undefined) {
            _data['startDate'] = new Date()
        } else {
            _data['startDate'] = getFieldProps('startDate').value;
        }

        _data['liveUrl'] = getFieldProps('liveUrl').value;
        _data["techStacks"] = techStacks
        _data["image"] = image

        handleSave(_data, type);
        handleClose();
    };

    const techLabels = [
        { value: 'MERN', label: 'MERN' },
        { value: 'MEAN', label: 'MEAN' },
        { value: 'DOTNET', label: 'DOTNET' }
    ];

    const setDropDownStates = (type, val) => {
        setTechStacks(val)
    }

    const commonContent = (
        <>
            <br></br>
            <h4>
                {props?.data?.name != undefined ? props?.data?.name?.charAt(0).toUpperCase() +
                    props?.data?.name?.slice(1) : ""}
            </h4>
            <br></br>

            <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField fullWidth label="Name" {...getFieldProps('name')} />
                    <TextField fullWidth label="Git Repo Link" {...getFieldProps('repoLink')} />
                    {/* <TextField fullWidth label="icon" {...getFieldProps('categoryIcon')} /> */}
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <DatePicker
                        label="Start date"
                        {...getFieldProps('startDate')}
                        onChange={(date) => setFieldValue('startDate', date)}
                        renderInput={(params) => (
                            <TextField fullWidth {...params} error={Boolean(touched.startDate && errors.startDate)} />
                        )}
                        inputFormat="dd/MM/yyyy"
                    />
                    <TextField fullWidth label="Live Url" {...getFieldProps('liveUrl')} />
                    <MyDropdown array={techLabels} heading={"Select Labels"} type={""} setStates={setDropDownStates} selectedVal={props?.data?.techStacks} />
                </Stack>
            </Stack>
            <br />
            <TextField
                {...getFieldProps('description')}
                fullWidth
                multiline
                minRows={4}
                maxRows={4}
                label="Description"
            />
            <br />
            <br />

            <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, md: 3 }}>
                    <Box flex={1}>
                        <Typography variant="h6" sx={{ textAlign: 'center' }}>
                            Image
                        </Typography>
                        <br />

                        {/* Replace 'values.url' with the actual path to the URL value */}
                        {image ? (
                            <div style={{ alignItems: 'center' }}>
                                <IconButton
                                    style={{ marginLeft: '60px' }}
                                    onClick={() => handleClearImage('image')}
                                >
                                    <Clear />
                                </IconButton>
                                <img
                                    src={getImageUrl(image)}
                                    alt="Uploaded"
                                    style={{
                                        marginLeft: '150px',
                                        width: '30%',
                                        height: 'auto'
                                    }}
                                />
                            </div>
                        ) : (
                            <UploadAvatar
                                accept="image/*"
                                onDrop={(acceptedFiles) => handleDLocalDrop(acceptedFiles, 'image')}
                                caption={
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            mt: 2,
                                            mx: 'auto',
                                            display: 'block',
                                            textAlign: 'center',
                                            color: 'text.secondary'
                                        }}
                                    >
                                        {/* Allowed *.jpeg, *.jpg, *.png, *.gif */}
                                    </Typography>
                                }
                            />
                        )}
                    </Box>

                </Stack>
            </Stack>

            <Box
                sx={{
                    mt: 3,
                    display: 'flex' // Use flex to align items
                }}
            >
                <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={false}
                    sx={{ marginLeft: 'auto' }} // Pushes the button to the far right
                    onClick={() => onSubmit()}
                >
                    Save Changes
                </LoadingButton>
            </Box>
        </>
    );

    const handleClearImage = (type, val) => {
        setImage('')
    };

    const handleDLocalDrop = useCallback(
        (acceptedFiles, type) => {
            setLoading(true);
            const file = acceptedFiles;
            const fileData = new FormData();
            fileData.append('file', file[0], `${file[0].name}`);

            CoreHttpHandler.request(
                'upload',
                'file',
                {
                    params: fileData
                },
                (response) => {
                    setLoading(false);
                    const imageUrl = response.data.result;
                    // set_Data(prevData => {
                    //     let res = { ...prevData, values };
                    //     res["image"] = imageUrl;
                    //     res, 'ereeree');
                    //     return res;
                    // });
                    setImage(imageUrl)
                },
                (err) => {
                    setLoading(false);
                    
                }
            );
        },
        [setLoading, set_Data]
    );


    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div sx={{ p: 4 }}>{commonContent}</div>
                    </Grid>
                </Grid>
            </Form>
        </FormikProvider>
    );
}
