import {
  Box,
  Select,
  MenuItem,
  Modal,
  Button,
  Typography,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { mockDataContacts } from '../../data/mockData';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';
import { baseUrl } from '../../config/config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
const Category = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState({});
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
  const handleOpen = (categoryId) => {
    console.log('categoryData', categoryData);
    const categoryDetails = categoryData.find(
      (category) => category.id === categoryId
    );
    if (!categoryDetails) {
      console.error(`Could not find Category with id ${categoryId}`);
      return;
    }
    setCategoryInfo(categoryDetails);
    setOpen(true);
    console.log(categoryInfo);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}category/deletecategory/${id}`);
      setcategoryData((prevData) => {
        const newData = [...prevData];
        const index = newData.findIndex((store) => store.id === id);
        if (index !== -1) {
          newData.splice(index, 1);
        }
        return newData;
      });
      alert(
        'La suppression a été effectuée avec succès raffrechiser lapage  !'
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdate = (id) => {
    // handleOpen();
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: '_id', headerName: 'Registrar ID' },
    {
      field: 'category_name',
      headerName: 'Nom_Catégories',
      flex: 1,
      cellClassName: 'name-column--cell',
    },

    {
      field: 'subCategoy',
      headerName: 'sous_Categories',
      flex: 1,
    },
    {
      field: 'details',
      headerName: 'Détails',
      flex: 1,
      renderCell: (params) => (
        <Button color="success" onClick={() => handleOpen(params.row.id)}>
          Voir détails
        </Button>
      ),
    },

    {
      field: 'Actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex' }}>
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <Delete />
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpdate(params.row._id)}
          >
            Update
          </Button>
        </Box>
      ),
    },
  ];

  const transformStoreData = (categories) => {
    return categories.map((category) => {
      let subcategoriesNames = '';
      if (category.subcategories && category.subcategories.length > 0) {
        subcategoriesNames = category.subcategories
          .map((subCategory) => subCategory.subCategory_name)
          .join(', ');
      } else {
        subcategoriesNames = 'pas de sous souscategory';
      }

      return {
        id: category.id,
        _id: category._id,
        category_name: category.category_name,
        subCategoy: subcategoriesNames,
      };
    });
  };

  const [categoryData, setcategoryData] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${baseUrl}category/getAllCategory`);
        console.log(response.data.categories); // log the response data to the console
        const categoryWithId = response.data.categories.map(
          (category, index) => ({
            ...category,
            id: index,
          })
        );

        setcategoryData(transformStoreData(categoryWithId));
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategory();
  }, []);

  return (
    <>
      <Box m="20px">
        <Header title="Boutiques" subtitle="Liste des catégories disponible" />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .name-column--cell': {
              color: colors.greenAccent[300],
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: colors.blueAccent[700],
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: colors.primary[400],
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
              backgroundColor: colors.blueAccent[700],
            },
            '& .MuiCheckbox-root': {
              color: `${colors.greenAccent[200]} !important`,
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <DataGrid
            rows={categoryData}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row._id}
          />
        </Box>
      </Box>
      <Button color="success" onClick={handleOpen}>
        Voir détails
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Identifiant de la catégorie: {categoryInfo._id}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Nom de la Catégories: {categoryInfo.category_name}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sous catégories : {categoryInfo.subCategoy}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Category;
