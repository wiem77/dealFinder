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
import Header from './Header';

const checkoutSchema = yup.object().shape({
  store_name: yup
    .string()
    .required('Il est nécessaire  de spécifier le nom de la boutique'),
});
export default function EditCategory({ style, data, categoryId }) {
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
    _id: data._id,
    category_name: data.category_name,
    category_image: data.category_image,
  };

  const handleOpen = async (idCategory) => {
    setCategoryInfo(idCategory);
    setOpen(true);
    console.log(categoryInfo);
  };
  const handleFormSubmit = async (values) => {
    try {
      console.log('values', values);
      await axios.put(
        `${baseUrl}category/updateCategory/${categoryId}`,
        values
      );

      alert(
        'La  modification  a été effectuée avec succès raffrechiser la page  !'
      );
    } catch (error) {
      console.error(error);
    }
  };
  console.log(categoryId);
  return (
    <div>
      <Edit onClick={() => handleOpen(categoryId)}></Edit>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header
            title="Modifier la Categorie"
            subtitle={+' - ' + categoryId}
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
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  }}
                >
                  <div>
                    <img
                      src={data.category_image}
                      alt="Category Image"
                      style={{
                        borderRadius: '50%',
                        width: '100px',
                        height: '100px',
                      }}
                    />
                  </div>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Nom de la catégorie"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.category_name}
                    name="category_name"
                    readOnly={!editable}
                    error={!!touched.category_name && !!errors.category_name}
                    helperText={touched.category_name && errors.category_name}
                    sx={{ gridColumn: 'span 4' }}
                  />
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
