import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
import { baseUrl } from '../config/config';
import { IconButton, Select, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import Header from './Header';
import { MenuItem } from 'react-pro-sidebar';

import * as Yup from 'yup';

const checkoutSchema = Yup.object().shape({
  store_name: Yup.string().required('Le nom de la boutique est requis'),
  phone: Yup.string().required('Le numéro de téléphone est requis'),
  email: Yup.string()
    .email("L'adresse e-mail n'est pas valide")
    .required("L'adresse e-mail est requise"),
  laltitude: Yup.number()
    .required('La laltitude est requise')
    .typeError('La laltitude doit être un nombre'),
  longitude: Yup.number()
    .required('La longitude est requise')
    .typeError('La longitude doit être un nombre'),
});

export default function EditStore({ style, data, idStore }) {
  const locationInfo = data.locations.map((loc) => ({
    _idSub: loc._id,
    adr: loc.formattedAddress,
    laltitude: loc.coordinates[0],
    longitude: loc.coordinates[1],
    city: loc.city,
    zipcode: loc.zipcode,
  }));
  const [open, setOpen] = React.useState(false);
  const [storeInfo, setStoreInfo] = React.useState();

  const [selectedLocation, setSelectedLocation] = React.useState([]);
  const [selectAvailbeLoc, setSelectAvailbeLoc] = React.useState();
  const [initialVal, setInitialVal] = React.useState({
    store_name: data.store_name,
    phone: data.phone,
    email: data.email,
    laltitude: 0,
    longitude: 0,
  });
  console.log('initialVal', initialVal);
  const handleClose = () => {
    setOpen(false);
  };
  const [editable, setEditable] = React.useState(false);

  const handleDescriptionClick = () => {
    setEditable(true);
  };
  const initialValues = {
    store_name: data.store_name,
    phone: data.phone,

    email: data.email,
    laltitude: 0,
    longitude: 0,
  };
  const handleDeleteLocation = (loc) => {
    const id = loc.id;
    const name = loc.name;
    const confirmMessage = `êtes-vous sûr de vouloir supprimer la Boutique ${name}?`;
    const result = window.confirm(confirmMessage);
    if (result) {
      axios
        .delete(`${baseUrl}store/stores/${idStore}/locations/${id}`)
        .then((response) => {
          const newSelectedLoc = selectedLocation.filter(
            (v) => v.id !== loc.id
          );
          setSelectedLocation(newSelectedLoc);
          window.confirm(
            `Coupon supprimer avec succées  ${name} reféechiser la page`
          );
        })
        .catch((error) => {
          console.error('Error deleting store:', error);
          window.confirm(error);
        });
    }
  };
  console.log('selectAvailbeLoc.name', selectAvailbeLoc);
  const handleOpen = async (idStore) => {
    setStoreInfo(idStore);
    setOpen(true);
  };
  const checkLocation = (laltitude, longitude) => {
    console.log('laltitude', laltitude, 'longitude', longitude);
    const location = locationInfo.find(
      (loc) =>
        loc.laltitude === Number(laltitude) &&
        loc.longitude === Number(longitude)
    );
    console.log(locationInfo);
    if (location) {
      console.log('Location found:', location.adr);
    } else {
      console.log('Location not found');
    }
  };

  const handleFormSubmit = async (values) => {
    console.log('values', values);
    try {
      console.log('values', values);
      console.log('inisialeval', initialVal);
      let modifiedValues = {};
      // Vérifier si les valeurs ont été modifiées
      if (values.store_name !== initialVal.store_name) {
        modifiedValues.store_name = values.store_name;
      }
      if (values.phone !== initialVal.phone) {
        modifiedValues.phone = values.phone;
      }
      if (values.email !== initialVal.email) {
        modifiedValues.email = values.email;
      }
      if (values.laltitude !== initialVal.laltitude) {
        modifiedValues.laltitude = values.laltitude;
      }
      if (values.longitude !== initialVal.longitude) {
        modifiedValues.longitude = values.longitude;
      }
      // Si les valeurs ont été modifiées, envoyer toutes les valeurs au serveur
      // Sinon, envoyer seulement les valeurs modifiées
      console.log('modifiedValues', modifiedValues);
      const body =
        Object.keys(modifiedValues).length > 0
          ? { ...modifiedValues }
          : { ...values };
      await axios.put(`${baseUrl}store/updateStore/${idStore}`, body);
      alert(
        'La  modification  a été effectuée avec succès raffrechiser la page  !'
      );
      // Mettre à jour les valeurs d'initialisation
      setInitialVal({ ...initialVal, ...modifiedValues });
    } catch (error) {
      console.error(error);
    }
  };

  const availablelocation = locationInfo.filter(
    (locId) => !selectedLocation.some((loc) => loc.id === locId._idSub)
  );
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

          <Formik
            onSubmit={handleFormSubmit}
            // validationSchema={checkoutSchema}
            initialValues={initialValues}
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
                    // error={!!touched.store_name && !!errors.store_name}
                    // helperText={touched.store_name && errors.store_name}
                    sx={{ gridColumn: 'span 2' }}
                  />
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
                      // error={!!touched.phone && !!errors.phone}
                      // helperText={touched.phone && errors.phone}
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
                      // error={!!touched.email && !!errors.email}
                      // helperText={touched.email && errors.email}
                      sx={{ gridColumn: 'span 2', mx: 1 }}
                    />
                  </Box>
                  <Button type="submit" color="secondary" variant="contained">
                    Modifier
                  </Button>
                  <p>Ajout nouvel localisation</p>
                  <Box
                    display="flex"
                    justifyContent={'space-between'}
                    sx={{ borderBottom: '1px solid #ccc', pb: 1 }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      value={values.laltitude}
                      label="Laltitude"
                      name="laltitude"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{ gridColumn: 'span 2', mx: 1 }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Longitude"
                      value={values.longitude}
                      name="longitude"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{ gridColumn: 'span 2', mx: 1 }}
                    />
                    <Button
                      variant="contained"
                      onClick={() => {
                        const location = checkLocation(
                          values.laltitude,
                          values.longitude
                        );

                        if (location) {
                          setSelectAvailbeLoc(location.adr);
                        }
                      }}
                    >
                      Verifier localisation
                    </Button>
                  </Box>
                  {/* <p>Adresse: {selectAvailbeLoc}</p> */}

                  <Box sx={{ borderBottom: '1px solid #ccc', pb: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ textDecoration: 'underline' }}
                    >
                      Supprimer une localisation :
                    </Typography>
                    <Select
                      fullWidth
                      label="Adresse"
                      multiple
                      value={selectedLocation}
                      onChange={(event) => {
                        setSelectedLocation(event.target.value);
                      }}
                      sx={{ mt: 2 }}
                      MenuProps={{ sx: { mt: 0 } }}
                    >
                      {availablelocation.map((adresse) => (
                        <MenuItem
                          key={adresse._idSub}
                          value={{ id: adresse._idSub, name: adresse.adr }}
                        >
                          {adresse.adr}
                        </MenuItem>
                      ))}
                    </Select>
                    <Box
                      display="flex"
                      alignItems="center"
                      flexWrap="wrap"
                      sx={{ mt: 2 }}
                    >
                      {selectedLocation.map((v) => (
                        <Box
                          key={v.id}
                          display="flex"
                          alignItems="center"
                          sx={{ mr: 1, mt: 1 }}
                        >
                          <Typography variant="body1">{v.name}</Typography>
                          <IconButton onClick={() => handleDeleteLocation(v)}>
                            <Delete />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  </Box>

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
