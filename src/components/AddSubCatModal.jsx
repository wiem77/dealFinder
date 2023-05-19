import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Add, Edit } from '@mui/icons-material';
import axios from 'axios';
import { baseUrl } from '../config/config';
import { FormControl, InputLabel, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import Header from './Header';
const checkoutSchema = yup.object().shape({
  subCategory_name: yup.string().required('* Obligatoire'),
});
export default function AddSubCatModal({ style, id, data, sub }) {
  console.log('sub', sub);
  const [open, setOpen] = React.useState(false);
  const [categoryInfo, setCategoryInfo] = React.useState();
  const [editable, setEditable] = React.useState(false);

  const handleDescriptionClick = () => {
    setEditable(true);
  };
  const handleOpen = async (id) => {
    setCategoryInfo(id);
    setOpen(true);
  };
  const initialValues = {
    subCategory_name: '',
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleFormSubmit = async (values) => {
    console.log(values);
    try {
      console.log('values', values);
      const response = await axios.post(
        `${baseUrl}subCategory/add_sub_Category/${id}`,
        values
      );
      window.alert(
        ` Sous_Catégorie ajoutée avec succès : ${values.subCategory_name}`
      );
    } catch (error) {
      console.error(error);
      window.alert(`Error: ${error.response.data.message}`);
    }
  };
  return (
    <div>
      <Add onClick={() => handleOpen(id)}></Add>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header
            title="Ajout d'une Nouvel Sous_Catégorie"
            subtitle={data.category_name}
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
                  <FormControl variant="filled" fullWidth>
                    <InputLabel id="Sous_Catégories-label">
                      Sous Catégories
                    </InputLabel>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Nom Sous_catégories "
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.subCategory_name}
                      name="subCategory_name"
                      readOnly={!editable}
                      error={
                        !!touched.subCategory_name && !!errors.subCategory_name
                      }
                      helperText={
                        touched.subCategory_name && errors.subCategory_name
                      }
                      sx={{ gridColumn: 'span 4' }}
                    />
                  </FormControl>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Ajouter
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
