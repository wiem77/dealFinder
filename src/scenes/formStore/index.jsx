import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Input,
  Checkbox,
  FormHelperText,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  ListItemText,
} from '@mui/material';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import { baseUrl } from '../../config/config';
import { CheckBox } from '@mui/icons-material';

const StoreForm = () => {
  const [categories, setCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const handleSubCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSubCategories([...selectedSubCategories, value]);
    } else {
      setSelectedSubCategories(
        selectedSubCategories.filter((subcat) => subcat !== value)
      );
    }
  };

  console.log('selectedCategory', selectedSubCategories);

  const handleSelectCategory = (event, setFieldValue) => {
    const { name, value } = event.target;
    if (name === 'categories') {
      setFieldValue(name, value);
      console.log(`Selected Category ID: ${value}`);
    } else if (typeof value === 'string') {
      setFieldValue(name, value.trim());
    } else {
      setFieldValue(name, value);
    }
  };

  console.log('selectedSubCategory', selectedSubCategories);
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  // const checkoutSchema = yup.object().shape({
  //   StoreName: yup.string().required('required'),
  //   webSite: yup.string(),
  //   email: yup.string().email('invalid email').required('required'),
  //   phone: yup
  //     .string()
  //     .matches(phoneRegExp, 'Phone number is not valid')
  //     .required('required'),
  //   laltitude: yup.number().required('required'),
  //   longitude: yup.number().required('required'),
  //   description: yup.string().required('required'),
  //   subCategories: yup.string().required('required'),
  // });
  const initialValues = {
    StoreName: '',
    webSite: '',
    email: '',
    phone: '',
    laltitude: '',
    longitude: '',
    description: '',
    subCategories: [],
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
    console.log('Subcategories:', categories);
    categories.forEach((category) => {
      category.subcategories.forEach((sub) => {
        console.log(`ID: ${sub._id}, Name: ${sub.subCategory_name}`);
      });
    });
  }, [categories]);
  const handleFormSubmit = async (values) => {
    console.log(values);
    // try {
    //   const response = await axios.post(`${baseUrl}store/addStore`, values);

    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        // validationSchema={checkoutSchema}
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
          <Form>
            <Field
              fullWidth
              id="email"
              name="email"
              label="Email"
              as={TextField}
              // value={values.email}
            />
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
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
                value={values.address2}
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
                value={values.address2}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: 'span 4' }}
              />
              <FormControl
                variant="filled"
                fullWidth
                error={!!touched.categories && !!errors.categories}
              >
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="categories"
                  value={selectedCategory}
                  onChange={(event) => {
                    setSelectedCategory(event.target.value);
                    setFilteredSubCategories(
                      categories.filter(
                        (cat) => cat.category_name === event.target.value
                      )[0].subcategories
                    );
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category.category_name}>
                      {category.category_name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.categories && errors.categories && (
                  <FormHelperText>{errors.categories}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                variant="filled"
                fullWidth
                error={!!touched.subCategories && !!errors.subCategories}
              >
                <InputLabel id="subcategories-select-label">
                  Sub Categories
                </InputLabel>

                <div
                  role="group"
                  aria-labelledby="checkbox-group"
                  value={values.subCategories}
                >
                  <Box>
                    {filteredSubCategories.map((subcat) => (
                      <Field
                        key={subcat._id}
                        type="checkbox"
                        name="subCategories"
                        // value={filteredSubCategories[0].subCategory_name}
                        render={({ field }) => {
                          <CheckBox {...field}>
                            {subcat.subCategory_name}
                          </CheckBox>;
                        }}
                        value={subcat.subCategory_name}
                      />
                    ))}
                  </Box>

                  {/* <label>
                    <Field
                      type="checkbox"
                      name="subCategories"
                      // value={filteredSubCategories[0].subCategory_name}
                      value="One"
                    />
                    One
                  </label>
                  <label>
                    <Field type="checkbox" name="subCategories" value="Two" />
                    Two
                  </label>
                  <label>
                    <Field type="checkbox" name="subCategories" value="Three" />
                    Three
                  </label> */}
                </div>
                {/* <Select
                  labelId="subcategories-select-label"
                  id="subcategories"
                  name="subCategories"
                  multiple
                  value={selectedSubCategories}
                  onChange={handleSelectCategory}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {filteredSubCategories.map((subcat) => (
                    <MenuItem key={subcat._id} value={subcat.subCategory_name}>
                      <Checkbox
                        checked={
                          selectedSubCategories.indexOf(
                            subcat.subCategory_name
                          ) > -1
                        }
                        value={subcat.subCategory_name}
                        onChange={() => handleSubCategoryChange(values.subCategories, setFieldValue)}
                      />
                      <ListItemText primary={subcat.subCategory_name} />
                    </MenuItem>
                  ))}
                </Select>
                {touched.subCategories && errors.subCategories && (
                  <FormHelperText>{errors.subCategories}</FormHelperText>
                )} */}
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default StoreForm;
