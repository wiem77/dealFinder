import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Add, Edit } from '@mui/icons-material';
import axios from 'axios';
import { baseUrl } from '../config/config';
import { TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import Header from './Header';

export default function AddVoucher({ style, idStore, data }) {
  console.log(data);

  const checkoutSchema = yup.object().shape({
    name_V: yup.string().required('nom de coupon est obligatoire'),

    description: yup.string().required('description de coupon est obligatoire'),
    name_V: yup.string().required('nom de coupon est obligatoire'),
    validity_date: yup.date().required('date requise'),
    available_vouchers: yup.number(),
    discount: yup.number().required('Remise obligatoire'),
  });

  const [open, setOpen] = React.useState(false);
  const [categoryInfo, setCategoryInfo] = React.useState();
  const handleClose = () => {
    setOpen(false);
  };
  const [editable, setEditable] = React.useState(false);

  const handleDescriptionClick = () => {
    setEditable(true);
  };

  const initialValues = {
    name_V: '',
    description: '',
    validity_date: '',
    available_vouchers: 0,
    discount: 0,
    storeId: idStore,
  };

  const handleOpen = async (idStore) => {
    setCategoryInfo(idStore);
    setOpen(true);
  };
  const handleFormSubmit = async (values) => {
    try {
      console.log('values', values);
      await axios.post(`${baseUrl}vouchers/addVoucher`, values);

      alert('Coupon Ajouter avec succsé !');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Add onClick={() => handleOpen(idStore)}></Add>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header
            title="Ajout d'un nouveaux coupon"
            subtitle={data.storename + ' - ' + idStore}
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
                    label="id "
                    value={values.storeId}
                    name="storeId"
                    readOnly={false}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Nom Coupon "
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name_V}
                    name="name_V"
                    readOnly={!editable}
                    error={!!touched.name_V && !!errors.name_V}
                    helperText={touched.name_V && errors.name_V}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Description "
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    readOnly={!editable}
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Date de validiter "
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.validity_date}
                    name="validity_date"
                    readOnly={!editable}
                    error={!!touched.validity_date && !!errors.validity_date}
                    helperText={touched.validity_date && errors.validity_date}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Nom Coupon "
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.available_vouchers}
                    name="available_vouchers"
                    readOnly={!editable}
                    error={
                      !!touched.available_vouchers &&
                      !!errors.available_vouchers
                    }
                    helperText={
                      touched.available_vouchers && errors.available_vouchers
                    }
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Remise de % "
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.discount}
                    name="discount"
                    readOnly={!editable}
                    error={!!touched.discount && !!errors.discount}
                    helperText={touched.discount && errors.discount}
                    sx={{ gridColumn: 'span 4' }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Ajouter coupon
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
