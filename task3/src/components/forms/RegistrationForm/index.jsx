import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Container, Snackbar } from '@mui/material';
import TextFormField from './TextFormField';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  npiNumber: yup.string().required(),
  businessAddress: yup.string().required(),
  telephoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
  emailAddress: yup.string().email().required(),
}).required()

export const RegistrationForm = () => {
  const methods = useForm({
    mode: 'all',
    defaultValues: {
      firstName: '',
      lastName: '',
      npiNumber: '',
      businessAddress: '',
      telephoneNumber: '',
      emailAddress: '',
    },
    resolver: yupResolver(schema)
  });

  const { formState, handleSubmit } = methods;

  const [loading, setLoading] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleSuccessClose = () => {
      setIsSuccessOpen(false);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const onSubmit = handleSubmit(async (fields) => {
    setLoading(true);
    await delay(2000);
    console.log(fields);
    setLoading(false);
    setIsSuccessOpen(true);
  })

  return (
    <Container maxWidth="sm">
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} noValidate>
          <TextFormField
            label="First Name"
            name="firstName"
            fullWidth
            margin="normal"
          />

          <TextFormField
            label="Last Name"
            name="lastName"
            fullWidth
            margin="normal"
          />

          <TextFormField
            label="NPI Number"
            name="npiNumber"
            fullWidth
            margin="normal"
          />

          <TextFormField
            label="Business Address"
            name="businessAddress"
            fullWidth
            margin="normal"
          />

          <TextFormField
            label="Telephone Number"
            name="telephoneNumber"
            fullWidth
            margin="normal"
          />

          <TextFormField
            label="Email Address"
            name="emailAddress"
            fullWidth
            margin="normal"
          />

          <LoadingButton variant="contained" onClick={onSubmit} loading={loading} disabled={!formState.isValid}>
            Submit
          </LoadingButton>
        </form>
        <Snackbar
          open={isSuccessOpen}
          autoHideDuration={3000}
          onClose={handleSuccessClose}
          message='Form submitted successfully!'
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        />
      </FormProvider>
    </Container>
  );
};
