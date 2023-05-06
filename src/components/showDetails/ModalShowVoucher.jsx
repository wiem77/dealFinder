import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { TextField } from '@mui/material';
import { Formik } from 'formik';

import VisibilityIcon from '@mui/icons-material/Visibility';

import { Select, MenuItem } from '@mui/material';
import { useState } from 'react';

function ModalVoucher({ style, data, id }) {
  console.log('dataVVVVVVV', data);
  const initialValues = {
    _id: data._id,
    voucher_name: data.voucher_name,
    description: data.description,
    discount: data.discount,
    storename: data.storename,
    available: data.available,
    creatDate: data.creatDate.slice(0, 10),
    nbVoucher: data.nbVoucher,
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
                    label="Nom de coupon"
                    onChange={handleChange}
                    value={values.voucher_name}
                    name="voucher_name"
                    readOnly={false}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Boutique"
                    value={values.storename}
                    name="storename"
                    readOnly={false}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Desciption"
                    value={values.description}
                    name="voucher_name"
                    readOnly={false}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Remise"
                    value={values.discount}
                    name="discount"
                    readOnly={false}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Valable"
                    value={values.available}
                    name="available"
                    readOnly={false}
                    sx={{ gridColumn: 'span 4' }}
                  />{' '}
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Date de Creation"
                    value={values.creatDate}
                    name="creatDate"
                    readOnly={false}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Nombre disponible"
                    value={values.nbVoucher}
                    name="nbVoucher"
                    readOnly={false}
                    sx={{ gridColumn: 'span 4' }}
                  />
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

export default ModalVoucher;
