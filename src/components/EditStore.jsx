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

const checkoutSchema = yup.object().shape({
  store_name: yup.string().required('* Obligatoire'),
  description: yup.string().required('* Obligatoire'),

  phone: yup.number().required(' * Obligatoire'),
  zipcode: yup.number().required('* Obligatoire'),
  city: yup.string().required('* Obligatoire'),
  email: yup.string().email('invalid email').required('* Obligatoire'),
  laltitude: yup.number().required(' * Obligatoire'),
  longitude: yup.number().required('* Obligatoire'),
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
    phone: data.phone,
    zipcode: data.zipcode,
    city: data.city,
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
      await axios.put(`${baseUrl}store/updateStore/${idStore}`, {
        ...values,
        // laltitude: selectedLocation.laltitude,
        // longitude: selectedLocation.longitude,
      });

      alert(
        'La  modification  a été effectuée avec succès raffrechiser la page  !'
      );
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
                    label=" nom de  la Boutique "
                    value={values.store_name}
                    name="store_name"
                    readOnly={false}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <Box display="flex" justifyContent={'space-between'}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Téléphone"
                      value={values.phone}
                      name="phone"
                      readOnly={false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{ gridColumn: 'span 2', mx: 1 }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Email"
                      value={values.email}
                      name="email"
                      readOnly={false}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      sx={{ gridColumn: 'span 2', mx: 1 }}
                    />
                  </Box>

                  <Box
                    display="flex"
                    justifyContent={'space-between'}
                    sx={{ borderBottom: '1px solid #ccc', pb: 1 }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      value={values.Laltitude}
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
