import { Delete, Edit, LocationCitySharp, Pin } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import * as React from 'react';
import Header from './Header';
import { Formik } from 'formik';
import { MenuItem } from 'react-pro-sidebar';
import { baseUrl } from '../config/config';
import axios from 'axios';
import Toast from './CustomToast/Toast';

function EditLoc({ style, data, idStore }) {
  const [open, setOpen] = React.useState(false);
  const [storeInfo, setStoreInfo] = React.useState();
  const [verifLoc, setVerifLoc] = React.useState(true);
  const [location, setlocation] = React.useState();
  const [selectedLocation, setSelectedLocation] = React.useState([]);
  const [selectAvailbeLoc, setSelectAvailbeLoc] = React.useState();
  const [toastMessage, setToastMessage] = React.useState('');
  const [showToast, setShowToast] = React.useState(false);

  const showToastMessage = (message, duration = 3000) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, duration);
  };

  const handleOpen = async (idStore) => {
    setStoreInfo(idStore);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const locationInfo = data.locations.map((loc) => ({
    _idSub: loc._id,
    adr: loc.formattedAddress,
    laltitude: loc.coordinates[0],
    longitude: loc.coordinates[1],
    city: loc.city,
    zipcode: loc.zipcode,
  }));
  const checkLocation = (laltitude, longitude) => {
    console.log('laltitude', laltitude, 'longitude', longitude);
    const location = locationInfo.find(
      (loc) =>
        loc.laltitude === Number(laltitude) &&
        loc.longitude === Number(longitude)
    );

    console.log(locationInfo);
    if (location) {
      setlocation(location.adr);
      setVerifLoc(true);
    } else {
      setlocation("localisation n'existe pas");
      setSelectAvailbeLoc(null);
      setVerifLoc(false);
    }
  };
  const initialValues = {
    laltitude: 0,
    longitude: 0,
  };
  const handleFormSubmit = async (values) => {
    try {
      if (values.latitude === 0 || values.longitude === 0) {
        showToastMessage(
          'Erreur : Veuillez fournir des valeurs valides pour la latitude et la longitude.'
        );
        return;
      }
      const response = await axios.post(
        `http://localhost:4000/api/admin/stores/${idStore}/newLocation`,
        {
          latitude: values.laltitude,
          longitude: values.longitude,
        }
      );

      showToastMessage('La localisation a été ajoutée avec succès.');

      setlocation(null);
      setVerifLoc(true);
    } catch (error) {}
  };

  const handleRemoveLocation = (location) => {
    const updatedSelectedLocation = selectedLocation.filter(
      (loc) => loc.id !== location.id
    );
    setSelectedLocation(updatedSelectedLocation);
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
  const availablelocation = locationInfo.filter(
    (locId) => !selectedLocation.some((loc) => loc.id === locId._idSub)
  );
  return (
    <div>
      <LocationCitySharp onClick={() => handleOpen(idStore)} />
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
            subtitle={('Boutique', data.store_name)}
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
                  <Box>
                    <p>Ajout nouvelle localisation</p>
                    <Box
                      display="flex"
                      justifyContent="space-between"
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
                          checkLocation(values.laltitude, values.longitude);
                        }}
                      >
                        Verifier localisation
                      </Button>
                    </Box>
                    {location && <p>Adresse: {location}</p>}
                    {verifLoc === false && (
                      <div style={{ marginTop: 15 }}>
                        <Button variant="contained" type="submit">
                          Ajouter une nouvelle adresse
                        </Button>
                      </div>
                    )}
                    {showToast && (
                      <Toast
                        message={toastMessage}
                        duration={3000}
                        onClose={() => setShowToast(false)}
                      />
                    )}
                  </Box>

                  <Box
                    sx={{
                      borderBottom: '1px solid #ccc',
                      pb: 1,
                      mt: -5,
                      mb: 30,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ textDecoration: 'underline' }}
                    >
                      Supprimer une localisation :
                    </Typography>
                    <FormControl variant="filled" fullWidth>
                      <InputLabel id="adr-select-label">
                        Sélectionner une adresse
                      </InputLabel>
                      <Select
                        labelId="adr-select-label"
                        fullWidth
                        label="Adresse"
                        multiple
                        value={selectedLocation}
                        onChange={(event) => {
                          setSelectedLocation(event.target.value);
                        }}
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
                    </FormControl>
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
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleRemoveLocation(v)}
                          >
                            Annuler
                          </Button>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}

export default EditLoc;
