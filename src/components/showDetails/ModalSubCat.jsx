import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Edit } from '@mui/icons-material';
import axios from 'axios';
import { baseUrl } from '../../config/config';
import { TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { Select, MenuItem } from '@mui/material';
import { useState } from 'react';

function ModalSubCat({ style, data, id }) {
  const storesInfo = data.storesNames.map((store) => ({
    _idstore: store._id,
    store_name: store.store_name,
  }));
  const initialValues = {
    _id: data._id,
    subCategory_name: data.subCategory_name,
    stores: storesInfo.store_name,
  };
  const [open, setOpen] = useState(false);
  const [subCatInfo, setSubCatInfo] = useState();
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = async (id) => {
    setSubCatInfo(id);
    setOpen(true);
    console.log(subCatInfo);
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
                    label="Nom de coupon"
                    onChange={handleChange}
                    value={values.subCategory_name}
                    name="subCategory_name"
                    readOnly={false}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <Select
                    fullWidth
                    label="Stores"
                    value=""
                    sx={{ gridColumn: 'span 4' }}
                  >
                    {storesInfo.map((store) => (
                      <MenuItem key={store._idstore} value="" disabled>
                        {store.store_name}
                      </MenuItem>
                    ))}
                  </Select>
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

export default ModalSubCat;
