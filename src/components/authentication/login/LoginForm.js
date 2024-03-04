import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { Stack, Alert, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';
import CoreHttpHandler from 'src/http/services/CoreHttpHandler';

// ----------------------------------------------------------------------

export default function LoginForm() {
    const { login } = useAuth();
    const isMountedRef = useIsMountedRef();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            remember: true
        },
        validationSchema: LoginSchema,
        onSubmit: async (values, { setErrors, resetForm }) => {
            try {
                setIsSubmitting(true);
                await CoreHttpHandler.request(
                    'user',
                    'login',
                    {
                        email: values.email,
                        password: values.password
                    },
                    async (response) => {
                        const { token } = response.data;
                        const user = response.data;
                        setIsSubmitting(false);

                        enqueueSnackbar('Login success', {
                            variant: 'success',
                            action: (key) => (
                                <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                                    <Icon icon={closeFill} />
                                </MIconButton>
                            )
                        });
                        await login(token, user);
                    },
                    (failure) => {
                        setIsSubmitting(false);
                        enqueueSnackbar(failure.response.data.message, {
                            variant: 'error',
                            action: (key) => (
                                <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                                    <Icon icon={closeFill} />
                                </MIconButton>
                            )
                        });
                    }
                );

                // if (isMountedRef.current) {
                //     setSubmitting(false);
                // }
            } catch (error) {
                console.error(error);
                resetForm();
                if (isMountedRef.current) {
                    setIsSubmitting(false);
                    setErrors({ afterSubmit: error.message });
                }
            }
        }
    });

    const { errors, touched, handleSubmit, getFieldProps } = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

                    <TextField
                        fullWidth
                        autoComplete="username"
                        type="email"
                        label="Email address"
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />

                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        {...getFieldProps('password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPassword} edge="end">
                                        <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />
                </Stack>

                <br />
                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    Login
                </LoadingButton>
            </Form>
        </FormikProvider>
    );
}
