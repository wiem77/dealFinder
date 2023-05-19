import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { InputLabel, Select, TextField } from '@mui/material';
import { Formik } from 'formik';

import VisibilityIcon from '@mui/icons-material/Visibility';

import { useState } from 'react';
import { MenuItem } from 'react-pro-sidebar';
import Header from '../Header';

function ModalStore({ style, data, id }) {
  const [open, setOpen] = useState(false);
  const initialValues = {
    _id: data._id,
    store_name: data.store_name,
    phone: data.phone,
    category: data.category,
    email: data.email,
    rating: data.rating,
  };

  const storesInfo = data?.subCategoy?.map((subCat) => ({
    _idSub: subCat?._id,
    sub_name: subCat?.subCategory_name,
  }));

  const locationInfo = data?.locations?.map((loc) => ({
    _idSub: loc?._id,
    adr: loc?.formattedAddress,
    laltitude: loc?.coordinates[0],
    longitude: loc?.coordinates[1],
    city: loc?.city,
    zipcode: loc?.zipcode,
  }));

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = async (id) => {
    setOpen(true);
  };

  const [selectedSubCat, setSelectedSubCat] = React.useState(
    storesInfo?.length > 0 ? storesInfo[0]?._idSub : ''
  );

  const [selectedLocation, setSelectedLocation] = React.useState(
    locationInfo.length > 0 ? locationInfo[0] : null
  );

  return (
    <div>
      <Button onClick={() => handleOpen(id)}>
        <VisibilityIcon style={{ color: 'black' }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header
            title="Boutique"
            subtitle={data.store_name + ' - ' + data._id}
          />
          <Formik initialValues={initialValues}>
            {({ values, handleChange }) => (
              <form>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    '& > div': {
                      gridColumn: 'span 4',
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Téléphone"
                    value={values.phone}
                    name="phone"
                    readOnly={false}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    value={values.email}
                    name="email"
                    readOnly={false}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  {storesInfo?.length > 0 && (
                    <Select
                      fullWidth
                      value={selectedSubCat}
                      onChange={(event) =>
                        setSelectedSubCat(event.target.value)
                      }
                      label="Sous-Catégorie"
                      sx={{ gridColumn: 'span 4' }}
                    >
                      {storesInfo?.map((cat) => (
                        <MenuItem key={cat?._idSub} value={cat?._idSub}>
                          {cat?.sub_name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}

                  <Select
                    label="Localisation"
                    value={selectedLocation ? selectedLocation.adr : ''}
                    onChange={(event) => {
                      const location = locationInfo.find(
                        (loc) => loc.adr === event.target.value
                      );
                      setSelectedLocation(location);
                    }}
                    sx={{ gridColumn: 'span 4' }}
                  >
                    {locationInfo.map((loc) => (
                      <MenuItem key={loc._idSub} value={loc.adr}>
                        {loc.adr}
                      </MenuItem>
                    ))}
                  </Select>

                  <Box display="flex" justifyContent={'space-between'}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Latitude"
                      value={selectedLocation?.laltitude}
                      readOnly
                      sx={{ gridColumn: 'span 2', mx: 1 }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Longitude"
                      value={selectedLocation?.longatude}
                      readOnly
                      sx={{ gridColumn: 'span 2', mx: 1 }}
                    />
                  </Box>
                  <Box display="flex" justifyContent={'space-between'}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Ville"
                      value={selectedLocation?.city}
                      readOnly
                      sx={{ gridColumn: 'span 2', mx: 1 }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Code postal"
                      value={selectedLocation?.zipcode}
                      readOnly
                      sx={{ gridColumn: 'span 2', mx: 1 }}
                    />
                  </Box>
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

export default ModalStore;
