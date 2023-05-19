import {
  Box,
  Button,
  TextField,
  Backdrop,
  CircularProgress,
} from '@mui/material';

import { Formik } from 'formik';
import * as yup from 'yup';
import { Input } from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { Add } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { baseUrl } from '../../config/config';
import axios from 'axios';
import Modal from '@mui/material/Modal';
const checkoutSchema = yup.object().shape({
  category_name: yup.string().required('required'),
  image: yup
    .mixed()
    .test('fileRequired', 'Une image est obligatoire', (value) => {
      return !!value?.name;
    }),
});
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
const CategoryForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const [open, setOpen] = useState(false);

  const initialValues = {
    category_name: '',
    image: null,
  };

  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('category_name', values.category_name);

      formData.append('image', values.image);

      const response = await axios.post(
        `${baseUrl}category/addCategory`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      window.alert(`Catégorie ajoutée avec succès : ${values.category_name}`);
    } catch (error) {
      console.error(error);
      window.alert(`Error: ${error.response.data.message}`);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box m="20px" alignItems="center">
    
      <Box display="flex" alignItems="center">
        <Button
          onClick={handleOpen}
          color="primary"
          startIcon={<Add />}
          sx={{ mr: 1 }}
        >
          Ajouter une nouvelle catégorie
        </Button>
        <Backdrop
          open={open}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: '#fff' }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header
            title="Créer une Nouvelle Catégorie"
            subtitle="Veuillez remplir tous les champs"
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
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box m="20px" alignItems="center">
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      '& > div': {
                        gridColumn: isNonMobile ? undefined : 'span 4',
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Catégorie"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.category_name}
                      name="category_name"
                      error={!!touched.category_name && !!errors.category_name}
                      helperText={touched.category_name && errors.category_name}
                      sx={{ gridColumn: 'span 2' }}
                    />

                    <Input
                      fullWidth
                      type="file"
                      label="Image"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        setFieldValue('image', e.currentTarget.files[0]);
                      }}
                      name="image"
                      error={!!touched.image && !!errors.image}
                      helperText={touched.image && errors.image}
                      sx={{ gridColumn: 'span 4' }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                      Ajouter
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
    </Box>
  );
};

export default CategoryForm;
