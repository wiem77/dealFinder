import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Edit } from '@mui/icons-material';
import axios from 'axios';
import { baseUrl } from '../config/config';
import { TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import Header from './Header';

const checkoutSchema = yup.object().shape({
  store_name: yup
    .string()
    .required('Il est nécessaire  de spécifier le nom de la boutique'),
  description: yup
    .string()
    .required('Il est nécessaire  de spécifier la description'),
  location: yup
    .string()
    .required('Il est nécessaire de spécifier  la nouvelle adresse '),
  phone: yup
    .number()
    .required('Il est nécessaire de spécifier le  numéro de télephone '),
  zipcode: yup.number().required('Il est nécessaire de spécifier le zipCode '),
  city: yup
    .string()
    .required('Il est nécessaire de spécifier la ville de la boutique '),
  email: yup.string().email('invalid email').required('required'),
});
export default function EditStore({ style, data, idStore }) {
  const [open, setOpen] = React.useState(false);
  const [sotreInfo, setStoreInfo] = React.useState();
  const handleClose = () => {
    setOpen(false);
  };
  const [editable, setEditable] = React.useState(false);

  const handleDescriptionClick = () => {
    setEditable(true);
  };

  const initialValues = {
    _id: data._id,
    store_name: data.store_name,
    location: data.location,
    phone: data.phone,
    zipcode: data.zipcode,
    category: data.category,
    subCategoy: data.subCategoy,
    city: data.city,
    email: data.email,
    laltitude: data.laltitude,
    longatude: data.longatude,
  };
  console.log(
    'data',
    data.phone,
    data.category,
    data.subCategoy,
    data.location
  );

  const handleOpen = async (idStore) => {
    setStoreInfo(idStore);
    setOpen(true);
    console.log(sotreInfo);
  };
  const handleFormSubmit = async (values) => {
    try {
      console.log('values', values);
      await axios.put(`${baseUrl}store/updateStore/${idStore}`, values);

      alert(
        'La  modification  a été effectuée avec succès raffrechiser la page  !'
      );
    } catch (error) {
      console.error(error);
    }
  };
  console.log(idStore);
  return (
    <div>
      <Edit onClick={() => handleOpen(idStore)}></Edit>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header
            title="Modifier Boutique"
            subtitle={data.store_name + ' - ' + data._id}
          />
          <p>Adresse: {data.location}</p>

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
                  gap="30px"
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
                    label="Nom de  La Boutique"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.store_name}
                    name="store_name"
                    readOnly={!editable}
                    error={!!touched.store_name && !!errors.store_name}
                    helperText={touched.store_name && errors.store_name}
                    sx={{ gridColumn: 'span 2' }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Numéro de télephone "
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    name="phone"
                    readOnly={!editable}
                    error={!!touched.phone && !!errors.phone}
                    helperText={touched.phone && errors.phone}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="category"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.category}
                    readOnly={!editable}
                    name="category"
                    error={!!touched.category && !!errors.category}
                    helperText={touched.category && errors.category}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    readOnly={!editable}
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: 'span 4' }}
                  />

                  <Box display="flex" justifyContent={'space-around'}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Nom de La ville"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.city}
                      readOnly={!editable}
                      name="city"
                      error={!!touched.city && !!errors.city}
                      helperText={touched.city && errors.city}
                      sx={{ gridColumn: 'span 2', mx: 2 }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="zipCode"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.zipcode}
                      readOnly={!editable}
                      name="city"
                      error={!!touched.zipcode && !!errors.zipcode}
                      helperText={touched.zipcode && errors.zipcode}
                      sx={{ gridColumn: 'span 2', mx: 2 }}
                    />
                  </Box>
                  <Box display="flex" justifyContent={'space-around'}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Laltitude"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.laltitude}
                      name="laltitude"
                      readOnly={!editable}
                      onClick={handleDescriptionClick}
                      error={!!touched.laltitude && !!errors.laltitude}
                      helperText={touched.laltitude && errors.laltitude}
                      sx={{ gridColumn: 'span 2', mx: 2 }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Longitude"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.longatude}
                      name="longatude"
                      readOnly={!editable}
                      onClick={handleDescriptionClick}
                      error={!!touched.longatude && !!errors.longatude}
                      helperText={touched.longatude && errors.longatude}
                      sx={{ gridColumn: 'span 2', mx: 2 }}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Modifier
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
