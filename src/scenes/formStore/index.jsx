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
import { useState, useEffect } from 'react';

const StoreForm = () => {
  const [storeData, setStoreData] = useState({});

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    StoreName: yup.string().required('required'),
    webSite: yup.string(),
    email: yup.string().email('invalid email').required('required'),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('required'),
    laltitude: yup.number().required('required'),
    longitude: yup.number().required('required'),
  });
  const initialValues = {
    StoreName: '',
    webSite: '',
    email: '',
    phone: '',
    laltitude: '',
    longitude: '',
  };
  console.log('test');

  const isNonMobile = useMediaQuery('(min-width:600px)');
  const handleFormSubmit = (values) => {
    setStoreData(values);
    console.log('storeData', storeData);
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

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
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Store Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="StoreName"
                error={!!touched.StoreName && !!errors.StoreName}
                helperText={touched.StoreName && errors.StoreName}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label=" site web"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.webSite}
                name="webSite"
                error={!!touched.webSite && !!errors.webSite}
                helperText={touched.webSite && errors.webSite}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="télephone nyméro"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="laltitude 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.laltitude}
                name="laltitude"
                error={!!touched.laltitude && !!errors.laltitude}
                helperText={touched.laltitude && errors.laltitude}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="longitude "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="longitude"
                error={!!touched.longitude && !!errors.longitude}
                helperText={touched.longitude && errors.longitude}
                sx={{ gridColumn: 'span 4' }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};
//   return (
//     <Box m="20px">
//       <Header title="CREATE USER" subtitle="Create a New User Profile" />

//       <Formik
//         onSubmit={handleFormSubmit}
//         initialValues={initialValues}
//         validationSchema={checkoutSchema}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleBlur,
//           handleChange,
//           handleSubmit,
//         }) => (
//           <form onSubmit={handleSubmit}>
//             <Box
//               display="grid"
//               gap="30px"
//               gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//               sx={{
//                 '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
//               }}
//             >
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="First Name"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.firstName}
//                 name="firstName"
//                 error={!!touched.firstName && !!errors.firstName}
//                 helperText={touched.firstName && errors.firstName}
//                 sx={{ gridColumn: 'span 2' }}
//               />
//               {/* <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="First Name"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.store_name}
//                 name="Nom de la Boutique"
//                 error={!!touched.store_name && !!errors.store_name}
//                 helperText={touched.store_name && errors.store_name}
//                 sx={{ gridColumn: 'span 2' }}
//               /> */}

//               {/* <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Email"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.email}
//                 name="email"
//                 error={!!touched.email && !!errors.email}
//                 helperText={touched.email && errors.email}
//                 sx={{ gridColumn: 'span 4' }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="N° de télephone"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.contact}
//                 name="phone"
//                 error={!!touched.phone && !!errors.phone}
//                 helperText={touched.phone && errors.phone}
//                 sx={{ gridColumn: 'span 4' }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Laltitude  1"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.latitude1}
//                 name="latitude1"
//                 error={!!touched.latitude1 && !!errors.latitude1}
//                 helperText={touched.latitude1 && errors.latitude1}
//                 sx={{ gridColumn: 'span 4' }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="longitude1 "
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.longitude1}
//                 name="longitude1"
//                 error={!!touched.longitude1 && !!errors.longitude1}
//                 helperText={touched.longitude1 && errors.longitude1}
//                 sx={{ gridColumn: 'span 4' }}
//               /> */}
//             </Box>
//             <Box display="flex" justifyContent="end" mt="20px">
//               <Button type="submit" color="secondary" variant="contained">
//                 Create New User
//               </Button>
//             </Box>
//           </form>
//         )}
//       </Formik>
//     </Box>
//   );
// };
//   return (
//     <Box m="20px">
//       <Header
//         title="Ajouter une Nouvel Boutique"
//         subtitle="Veuillez remplir les informations nécessaires ci-dessous"
//       />
//       <Formik
//         onSubmit={handleFormSubmit}
//         initialValues={initialValues}
//         validationSchema={checkoutSchema}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleBlur,
//           handleChange,
//           handleSubmit,
//           setFieldValue,
//         }) => (
//           <form onSubmit={handleFormSubmit}>
//             <Box
//               component="form"
//               onSubmit={handleSubmit}
//               display="grid"
//               gap="30px"
//               gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//               sx={{
//                 '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
//               }}
//             >
//               <Box gridColumn="span 4">
//                 <InputLabel htmlFor="store_name">Nom de la boutique</InputLabel>
//                 <textfiled
//                   fullWidth
//                   variant="filled"
//                   type="text"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.store_name}
//                   name="store_name"
//                   error={!!touched.store_name && !!errors.store_name}
//                   helperText={touched.store_name && errors.store_name}
//                 />
//               </Box>
//               <box gridColumn="span 4">
//                 <InputLabel htmlFor="image">Image</InputLabel>
//                 <input
//                   id="image"
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     // Faites quelque chose avec le fichier, par exemple :
//                     // setFieldValue("image", file);
//                   }}
//                 />
//               </box>

//               <box gridColumn="span 2">
//                 <InputLabel htmlFor="email">Email</InputLabel>
//                 <textfiled
//                   fullWidth
//                   variant="filled"
//                   type="text"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.email}
//                   name="email"
//                   error={!!touched.email && !!errors.email}
//                   helperText={touched.email && errors.email}
//                 />
//               </box>

//               <box gridColumn="span 2">
//                 <InputLabel htmlFor="phone">Numéro de téléphone</InputLabel>
//                 <textfiled
//                   fullWidth
//                   variant="filled"
//                   type="text"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.phone}
//                   name="phone"
//                   error={!!touched.phone && !!errors.phone}
//                   helperText={touched.phone && errors.phone}
//                 />
//               </box>

//               <box gridColumn="span 2">
//                 <InputLabel htmlFor="coordinates">Coordonnées</InputLabel>
//                 <textfiled
//                   fullWidth
//                   variant="filled"
//                   type="text"
//                   label="Laltitude 1"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.latitude1}
//                   name="latitude1"
//                   error={!!touched.latitude1 && !!errors.latitude1}
//                   helperText={touched.latitude1 && errors.latitude1}
//                 />
//               </box>

//               <box gridColumn="span 2">
//                 <textfiled
//                   fullWidth
//                   variant="filled"
//                   type="text"
//                   label="Longitude 1"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.longitude1}
//                   name="longitude1"
//                   error={!!touched.longitude1 && !!errors.longitude1}
//                   helperText={touched.longitude1 && errors.longitude1}
//                 />
//               </box>

//               <box gridColumn="span 2">
//                 <textfiled
//                   fullWidth
//                   variant="filled"
//                   type="text"
//                   label="Latitude 2"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.latitude2}
//                   name="latitude2"
//                   error={!!touched.latitude2 && !!errors.latitude2}
//                   helperText={touched.latitude2 && errors.latitude2}
//                 />
//               </box>

//               <box gridColumn="span 2">
//                 <InputLabel htmlFor="longitude2">Longitude 2</InputLabel>
//                 <textfiled
//                   fullWidth
//                   variant="filled"
//                   type="text"
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   value={values.longitude2}
//                   name="longitude2"
//                   error={!!touched.longitude2 && !!errors.longitude2}
//                   helperText={touched.longitude2 && errors.longitude2}
//                 />
//               </box>
//               <box display="flex" justifyContent="end" mt="20px">
//                 <Button type="submit" color="secondary" variant="contained">
//                   Créer une nouvelle boutique
//                 </Button>
//               </box>
//             </Box>
//           </form>
//         )}
//       </Formik>
//     </Box>
//   );
// };

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?(?!216)[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// const checkoutSchema = yup.object().shape({
//   firstName: yup.string().required('required'),
//   store_name: yup.string().required('Nom de boutique est obligatoire'),
//   image: yup.string().required('Image obligatoire '),
//   email: yup.string().email('Format de mail invalide').required('Email requis'),
//   phone: yup
//     .string()
//     .matches(phoneRegExp, 'Numéro de télephone invalide')
//     .required('Numéro de téléphone requis'),
//   latitude1: yup.number().required('La latitude est requise'),
//   longitude1: yup.number().required('La longitude est requise'),
//   latitude2: yup.number(),
//   longitude2: yup.number(),
// });

// const initialValues = {
//   firstName: '',
//   store_name: '',
//   phone: '',
//   email: '',
//   phone: '',
//   latitude1: '',
//   longitude1: '',
//   latitude2: '',
//   longitude2: '',
// };

export default StoreForm;
