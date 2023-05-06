import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
import { baseUrl } from '../config/config';
import { IconButton, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import Header from './Header';
import { Select, MenuItem } from '@mui/material';
const checkoutSchema = yup.object().shape({
  subCategory_name: yup
    .string()
    .required('Indiquer le nom de la sous_catégorie'),
});
export default function EditSubCategory({ style, data, id }) {
  const [open, setOpen] = React.useState(false);
  const [categoryInfo, setCategoryInfo] = React.useState();
  const handleClose = () => {
    setOpen(false);
  };
  const [editable, setEditable] = React.useState(false);
  const [selectedStores, setSelectedStores] = React.useState([]);
  const handleDescriptionClick = () => {
    setEditable(true);
  };
  console.log('data.storesName', data.storesNames);
  const storesInfo = data.storesNames.map((store) => ({
    _idstore: store._id,
    store_name: store.store_name,
  }));

  const initialValues = {
    _id: data._id,
    subCategory_name: data.subCategory_name,
    stores: storesInfo,
  };
  console.log('data', data);

  const handleOpen = async (idCategory) => {
    setCategoryInfo(idCategory);
    setOpen(true);
    console.log(categoryInfo);
  };
  const handleFormSubmit = async (values) => {
    try {
      console.log('values', values);
      await axios.put(
        `${baseUrl}subCategory/update_sub_Category/${id}`,
        values
      );

      alert(
        'La  modification  a été effectuée avec succès raffrechiser la page  !'
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteStore = (store) => {
    const storeId = store.id;
    const confirmMessage = `êtes-vous sûr de vouloir supprimer la Boutique ${storeId}?`;
    const result = window.confirm(confirmMessage);
    if (result) {
      axios
        .delete(`${baseUrl}${storeId}`)
        .then((response) => {
          const newSelectedStores = selectedStores.filter(
            (s) => s.id !== store.id
          );
          setSelectedStores(newSelectedStores);
        })
        .catch((error) => {
          console.error('Error deleting store:', error);
        });
    }
  };
  return (
    <div>
      <Edit onClick={() => handleOpen(id)}></Edit>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header
            title="Modifier la Sous_Catégorie "
            subtitle={data.subCategory_name + ' - ' + id}
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
                    label="Nom Sous_catégorie "
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
                  <Select
                    fullWidth
                    label="Stores"
                    multiple
                    value={selectedStores}
                    onChange={(event) => {
                      setSelectedStores(event.target.value);
                    }}
                    sx={{ gridColumn: 'span 4' }}
                  >
                    {storesInfo.map((store) => (
                      <MenuItem
                        key={store._idstore}
                        value={{ id: store._idstore, name: store.store_name }}
                      >
                        {store.store_name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexWrap="wrap"
                    sx={{ gridColumn: 'span 4', mt: 2 }}
                  >
                    {selectedStores.map((store) => (
                      <Box key={store.id} display="flex" alignItems="center">
                        <Typography variant="body1">{store.name}</Typography>
                        <IconButton onClick={() => handleDeleteStore(store)}>
                          <Delete />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
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
