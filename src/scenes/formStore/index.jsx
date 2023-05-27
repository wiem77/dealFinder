import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormControl,
  FormControlLabel,
  Backdrop,
  CircularProgress,
} from '@mui/material';

import { Formik } from 'formik';
import * as yup from 'yup';
import { Input } from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';

import { useState, useEffect } from 'react';
import { baseUrl } from '../../config/config';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import { Add } from '@mui/icons-material';
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const checkoutSchema = yup.object().shape({
  StoreName: yup.string().required('required'),
  webSite: yup.string(),
  email: yup.string().email('invalid email').required('required'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('required'),
  laltitude: yup.number().required('required'),
  longitude: yup.number().required('required'),
  description: yup.string().required('required'),
});
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
const StoreForm = () => {
  const [categories, setCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const [open, setOpen] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const initialValues = {
    StoreName: '',
    webSite: '',
    email: '',
    phone: '',
    laltitude: '',
    longitude: '',
    description: '',
    image: null,
  };

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(`${baseUrl}category/getAllCategory`);
        setCategories(response.data.categories);
        console.log(response.data.categories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubCategories();
  }, []);
  useEffect(() => {
    const subCategories = categories.find(
      (c) => c.category_name === selectedCategory
    )?.subcategories;
    setFilteredSubCategories(subCategories || []);
    setSubCategories([]);
  }, [selectedCategory, categories]);

  console.log('categories', categories);
  const handleFormSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('StoreName', values.StoreName);
      formData.append('webSite', values.webSite);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('laltitude', values.laltitude);
      formData.append('longitude', values.longitude);
      formData.append('description', values.description);
      formData.append('image', values.image);

      subCategories.forEach((subCategory) => {
        formData.append('subCategories[]', subCategory);
      });

      const response = await axios.post(`${baseUrl}store/addStore`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      window.alert(
        `Boutique ajoutée avec succès et affiche le nom de la boutique: ${response.data.storeName}`
      );
    } catch (error) {
      console.error(error);
      window.alert(`Error: ${error.response.data.message}`);
    }
  };

  const handleCategoryChange = (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected);
    const filtered =
      categories.find((c) => c.category_name === selected)?.subcategories || [];
    setFilteredSubCategories(filtered);
  };

  const handleSubCategoryChange = (event) => {
    const selectedSubCategory = event.target.value;
    if (subCategories.includes(selectedSubCategory)) {
      setSubCategories((prevState) =>
        prevState.filter((subCategory) => subCategory !== selectedSubCategory)
      );
    } else {
      setSubCategories((prevState) => [...prevState, selectedSubCategory]);
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Button
          onClick={handleOpen}
          variant="contained"
          color="inherit"
          startIcon={<Add />}
          sx={{
            // mr: 1,
            marginTop: '-10px',
          }}
        >
          Ajouter une nouvelle Boutique
        </Button>
        <Backdrop
          open={backdropOpen}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: '#fff' }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            overflow: 'auto',
            padding: '20px',
            maxHeight: '500px',
          }}
        >
          <Header
            title="Crée une Nouvel Boutique"
            subtitle="Veuiller Remplire tous  les champs"
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
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    '& > div': {
                      gridColumn: isNonMobile ? undefined : 'span 4',
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Store Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="StoreName"
                    error={!!touched.StoreName && !!errors.StoreName}
                    helperText={touched.StoreName && errors.StoreName}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label=" site web"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.webSite}
                    name="webSite"
                    error={!!touched.webSite && !!errors.webSite}
                    helperText={touched.webSite && errors.webSite}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="télephone nyméro"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    name="phone"
                    error={!!touched.phone && !!errors.phone}
                    helperText={touched.phone && errors.phone}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <Input
                    fullWidth
                    type="file"
                    label="Store Image"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldValue('image', e.currentTarget.files[0]);
                    }}
                    name="image"
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="laltitude 1"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.laltitude}
                    name="laltitude"
                    error={!!touched.laltitude && !!errors.laltitude}
                    helperText={touched.laltitude && errors.laltitude}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="longitude "
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.longitude}
                    name="longitude"
                    error={!!touched.longitude && !!errors.longitude}
                    helperText={touched.longitude && errors.longitude}
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="description "
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    sx={{ gridColumn: 'span 4' }}
                  />
                  <FormControl variant="filled" fullWidth>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                      labelId="category-select-label"
                      id="categories"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      error={!!touched.subCategories && !!errors.subCategories}
                      helperText={touched.subCategories && errors.subCategories}
                    >
                      {categories.map((category) => (
                        <MenuItem
                          key={category._id}
                          value={category.category_name}
                        >
                          {category.category_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl variant="filled" fullWidth>
                    {filteredSubCategories.map((subCategory) => (
                      <FormControlLabel
                        key={subCategory._id}
                        control={
                          <Checkbox
                            checked={subCategories.includes(subCategory._id)}
                            onChange={handleSubCategoryChange}
                            value={subCategory._id}
                          />
                        }
                        label={subCategory.subCategory_name}
                      />
                    ))}
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
    </Box>
  );
};

export default StoreForm;
