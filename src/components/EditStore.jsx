import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import { Edit } from '@mui/icons-material';
import axios from 'axios';
import { baseUrl } from '../config/config';
import { TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import Header from './Header';
import Toast from './CustomToast/Toast';

export default function EditStore({ style, data, idStore }) {
  const checkoutSchema = yup.object().shape({
    store_name: yup.string().required('Le nom de la boutique est requis'),
    phone: yup.string().required('Le numéro de téléphone est requis'),
    email: yup
      .string()
      .email("L'adresse e-mail n'est pas valide")
      .required("L'adresse e-mail est requise"),
  });
  const [open, setOpen] = React.useState(false);
  const [storeInfo, setStoreInfo] = React.useState();
  const [initialVal, setInitialVal] = React.useState({
    store_name: data.store_name,
    phone: data.phone,
    email: data.email,
  });
  const [toastMessage, setToastMessage] = React.useState('');
  const [showToast, setShowToast] = React.useState(false);
  console.log('initialVal', initialVal);
  const showToastMessage = (message, duration = 3000) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, duration);
  };

  const [editable, setEditable] = React.useState(false);

  const initialValues = {
    store_name: data.store_name,
    phone: data.phone,

    email: data.email,
  };

  const handleOpen = async (idStore) => {
    setStoreInfo(idStore);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (values) => {
    try {
      let modifiedValues = {};

      if (values.store_name !== initialVal.store_name) {
        modifiedValues.store_name = values.store_name;
      }
      if (values.phone !== initialVal.phone) {
        modifiedValues.phone = values.phone;
      }
      if (values.email !== initialVal.email) {
        modifiedValues.email = values.email;
      }
      const body =
        Object.keys(modifiedValues).length > 0
          ? { ...modifiedValues }
          : { ...values };
      if (Object.keys(modifiedValues).length == 0) {
        showToastMessage("Erreur : Vous n'avez effectuer aucune modification");
        return;
      }
      await axios.put(`${baseUrl}store/updateStore/${idStore}`, body);
      alert(
        'La  modification  a été effectuée avec succès raffrechiser la page  !'
      );

      setInitialVal({ ...initialVal, ...modifiedValues });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Edit onClick={() => handleOpen(idStore)}></Edit>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            overflow: 'auto',
            padding: '20px',
            maxHeight: '500px',
          }}
        >
          <Header
            title="Modifier Boutique"
            subtitle={'Boutique ' + ' - ' + data.store_name}
          />

          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="50px"
                  gridTemplateColumns="repeat(5, minmax(0, 1fr))"
                  sx={{
                    '& > div': {
                      gridColumn: 'span 5',
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    defaultValue={data.store_name}
                    label=" nom de  la Boutique "
                    value={values.store_name}
                    name="store_name"
                    readOnly={false}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.store_name && !!errors.store_name}
                    helperText={touched.store_name && errors.store_name}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  {showToast && (
                    <Toast
                      message={toastMessage}
                      duration={3000}
                      onClose={() => setShowToast(false)}
                    />
                  )}
                  <Box display="flex" justifyContent={'space-between'}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Téléphone"
                      defaultValue={data.phone}
                      value={values.phone}
                      name="phone"
                      readOnly={false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.phone && !!errors.phone}
                      helperText={touched.phone && errors.phone}
                      sx={{ gridColumn: 'span 2', mx: 1 }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Email"
                      defaultValue={data.email}
                      value={values.email}
                      name="email"
                      readOnly={false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: 'span 2', mx: 1 }}
                    />
                  </Box>
                  <Button type="submit" color="secondary" variant="contained">
                    Modifier
                  </Button>

                  <Box display="flex" justifyContent={'space-around'}></Box>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px"></Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
