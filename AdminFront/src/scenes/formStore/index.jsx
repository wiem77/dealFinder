import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Input,
  FormHelperText,
} from '@mui/material';

import { Formik } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
const categories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Home & Garden' },
];

const StoreForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header
        title="Ajouter une Nouvel Boutique"
        subtitle="Veuillez remplir les informations nécessaires ci-dessous"
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
          <div>
            {' '}
            <form onSubmit={handleSubmit}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                }}
              >
                <Box gridColumn="span 4">
                  <InputLabel htmlFor="store_name">
                    Nom de la boutique
                  </InputLabel>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.store_name}
                    name="store_name"
                    error={!!touched.store_name && !!errors.store_name}
                    helperText={touched.store_name && errors.store_name}
                  />
                </Box>
                <Box gridColumn="span 2">
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                  />
                </Box>

                <Box gridColumn="span 2">
                  <InputLabel htmlFor="phone">Numéro de téléphone</InputLabel>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    name="phone"
                    error={!!touched.phone && !!errors.phone}
                    helperText={touched.phone && errors.phone}
                  />
                </Box>

                <Box gridColumn="span 2">
                  <InputLabel htmlFor="coordinates">Coordonnées</InputLabel>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Laltitude 1"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.latitude1}
                    name="latitude1"
                    error={!!touched.latitude1 && !!errors.latitude1}
                    helperText={touched.latitude1 && errors.latitude1}
                  />
                </Box>

                <Box gridColumn="span 2">
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Longitude 1"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.longitude1}
                    name="longitude1"
                    error={!!touched.longitude1 && !!errors.longitude1}
                    helperText={touched.longitude1 && errors.longitude1}
                  />
                </Box>

                <Box gridColumn="span 2">
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Latitude 2"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.latitude2}
                    name="latitude2"
                    error={!!touched.latitude2 && !!errors.latitude2}
                    helperText={touched.latitude2 && errors.latitude2}
                  />
                </Box>

                <Box gridColumn="span 2">
                  <InputLabel htmlFor="longitude2">Longitude 2</InputLabel>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.longitude2}
                    name="longitude2"
                    error={!!touched.longitude2 && !!errors.longitude2}
                    helperText={touched.longitude2 && errors.longitude2}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Créer une nouvelle boutique
                  </Button>
                </Box>
              </Box>
            </form>
          </div>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  store_name: yup.string().required('Nom de boutique est obligatoire'),
  image: yup.string().required('Image obligatoire '),
  email: yup.string().email('Format de mail invalide').required('Email requis'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Numéro de télephone invalide')
    .required('Numéro de téléphone requis'),
  latitude1: yup.number().required('La latitude est requise'),
  longitude1: yup.number().required('La longitude est requise'),
  latitude2: yup.number(),
  longitude2: yup.number(),
});

const initialValues = {
  store_name: '',
  phone: '',
  email: '',
  phone: '',
  latitude1: '',
  longitude1: '',
  latitude2: '',
  longitude2: '',
};

export default StoreForm;
