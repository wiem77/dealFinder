import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { TextField } from '@mui/material';
import { Formik } from 'formik';

import VisibilityIcon from '@mui/icons-material/Visibility';

import { useState } from 'react';

function ModalStore({ style, data, id }) {
  console.log('dataVVVVVVV', data);
  const initialValues = {
    _id: data._id,

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
    rating: data.rating,

    subCategoy: data.subCategoy,
    name_V: data.name_V,
  };
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = async (id) => {
    setOpen(true);
  };
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
                    label="Nom "
                    onChange={handleChange}
                    value={values.store_name}
                    name="store_name"
                    readOnly={false}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="location"
                    value={values.location}
                    name="location"
                    readOnly={false}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <Box display="flex" justifyContent={'space-around'}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Nom de La ville"
                      value={values.city}
                      readOnly={false}
                      name="city"
                      sx={{ gridColumn: 'span 2', mx: 2 }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="zipCode"
                      value={values.zipcode}
                      readOnly={false}
                      name="city"
                      sx={{ gridColumn: 'span 2', mx: 2 }}
                    />
                  </Box>
                  <Box display="flex" justifyContent={'space-around'}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Laltitude"
                      value={values.laltitude}
                      name="laltitude"
                      readOnly={false}
                      sx={{ gridColumn: 'span 2', mx: 2 }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Longitude"
                      value={values.longatude}
                      name="longatude"
                      readOnly={false}
                      sx={{ gridColumn: 'span 2', mx: 2 }}
                    />
                  </Box>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="phone"
                    value={values.phone}
                    name="phone"
                    readOnly={false}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="email"
                    value={values.email}
                    name="email"
                    readOnly={false}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="rating"
                    value={values.rating}
                    name="rating"
                    readOnly={false}
                    sx={{ gridColumn: 'span 4' }}
                  />{' '}
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
