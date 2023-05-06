import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Edit } from '@mui/icons-material';
import axios from 'axios';
import { baseUrl } from '../config/config';
import { TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';

const checkoutSchema = yup.object().shape({
  voucher_name: yup
    .string()
    .required('Il est nécessaire  de spécifier le nom de coupon'),
  description: yup
    .string()
    .required('Il est nécessaire  de spécifier la description'),
  available: yup
    .string()
    .required('Il est nécessaire de spécifier si il et valable ou non '),
  discount: yup.number().required('Il est nécessaire de spécifier la remise '),
  nbVoucher: yup
    .number()
    .required('Il est nécessaire de spécifier le nombre de vouchers '),
});
export default function EditVoucher({ style, data, idVoucher }) {
  const [open, setOpen] = React.useState(false);
  const [voucherInfo, setVoucherInfo] = React.useState();
  const handleClose = () => {
    setOpen(false);
  };
  const [editable, setEditable] = React.useState(false);

  const handleDescriptionClick = () => {
    setEditable(true);
  };

  const initialValues = {
    _id: data._id,
    voucher_name: data.voucher_name,
    description: data.description,
    available: data.available,
    discount: data.discount,
    nbVoucher: data.nbVoucher,
  };
  console.log('data', data);

  const handleOpen = async (idVoucher) => {
    setVoucherInfo(idVoucher);
    setOpen(true);
    console.log(voucherInfo);
  };
  const handleFormSubmit = async (values) => {
    try {
      console.log('values', values);
      await axios.put(`${baseUrl}vouchers/updateVoucher/${idVoucher}`, values);

      alert(
        'La  modification  a été effectuée avec succès raffrechiser la page  !'
      );
    } catch (error) {
      console.error(error);
    }
  };
  console.log(idVoucher);
  return (
    <div>
      <Edit onClick={() => handleOpen(idVoucher)}></Edit>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.voucher_name}
                    name="voucher_name"
                    readOnly={!editable}
                    error={!!touched.voucher_name && !!errors.voucher_name}
                    helperText={touched.voucher_name && errors.voucher_name}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    readOnly={!editable}
                    onClick={handleDescriptionClick}
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    sx={{ gridColumn: 'span 2' }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Disponible ou non"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.available}
                    name="available"
                    readOnly={!editable}
                    error={!!touched.available && !!errors.available}
                    helperText={touched.available && errors.available}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Remise"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.discount}
                    name="discount"
                    readOnly={!editable}
                    error={!!touched.discount && !!errors.discount}
                    helperText={touched.discount && errors.discount}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label=" Nombre de Coupon"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nbVoucher}
                    readOnly={!editable}
                    name="nbVoucher"
                    error={!!touched.nbVoucher && !!errors.nbVoucher}
                    helperText={touched.nbVoucher && errors.nbVoucher}
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
      </Modal>
    </div>
  );
}
