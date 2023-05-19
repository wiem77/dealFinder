import {
  Box,
  Select,
  MenuItem,
  Modal,
  Button,
  Typography,
  useTheme,
  IconButton,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';

import { tokens } from '../../theme';
import Header from '../../components/Header';

import axios from 'axios';
import { baseUrl } from '../../config/config';

import { useEffect, useState } from 'react';
import EditCategory from '../../components/EditCategory';
import ShowStoreV from '../../components/ShowStoreV';
import DeleteVfromStore from '../../components/deleteModels/deleteVfromStore';
import AddVoucher from '../../components/AddVoucher';
import AddSubCatModal from '../../components/AddSubCatModal';
import DeletesCatfromCat from '../../components/deleteModels/deleteSubCatfromCat';
import ModalSubCat from '../../components/showDetails/ModalSubCat';
import CategoryForm from '../catForm';

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

const Category = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState({});
  const [categoryData, setcategoryData] = useState({});

  const handleClose = () => {
    setOpen(false);
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
  const handleDelete = async (id) => {
    const confirmMessage = `êtes-vous sûr de vouloir supprimer la Category ${id}?`;
    const result = window.confirm(confirmMessage);
    if (result) {
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
          'La suppression a été effectuée avec succès raffrechiser la page  !'
        );
      } catch (error) {
        console.error('Error deleting store:', error);
      }
    }
  };

  const transformStoreData = (categories) => {
    return categories?.map((category) => {
      let subcategoriesNames;
      console.log('category', category);
      if (category.subcategories && category.subcategories?.length > 0) {
        subcategoriesNames = category.subcategories.map(
          (subCategory) => subCategory
        );
      }
      const nbCat =
        subcategoriesNames && subcategoriesNames?.length > 0
          ? subcategoriesNames?.length
          : 0;
      const nbCatt = nbCat > 0 ? `${nbCat} ` : 'pas de sous_catégories';
      console.log(
        'subcategoriesNamessss123',
        subcategoriesNames[0].subCategory_name
      );
      return {
        id: category.id,
        _id: category._id,
        category_name: category.category_name,
        category_image: category.category_image[0].path,
        subcategories: subcategoriesNames,
        nbCatt: nbCatt,
      };
    });
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${baseUrl}category/getAllCategory`);
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
      field: 'details',
      headerName: 'Détails',
      flex: 1,
      renderCell: (params) => (
        <>
          <Button color="success" onClick={() => handleOpen(params.row.id)}>
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
      ),
    },

    {
      field: 'nbCatt',
      headerName: 'Sous_Catégories',
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            textAlign: 'center',
            height: '100%',
            boxSizing: 'border-box',
          }}
        >
          {params.row.subcategories && params.row.subcategories.length > 0 ? (
            <Typography>{params.row.subcategories.length}</Typography>
          ) : (
            <Typography>pas de sous_catégories</Typography>
          )}
          {params.row.nbCatt !== 'pas de sous_catégories' && (
            <>
              <DeletesCatfromCat
                data={params.row}
                id={params.row._id}
                style={style}
                sub={params.row.subcategories}
              />
              <ModalSubCat
                data={params.row}
                id={params.row._id}
                style={style}
                sub={params.row.subcategories}
              />
              <AddSubCatModal
                data={params.row}
                id={params.row._id}
                style={style}
                sub={params.row.subcategories}
              />
            </>
          )}
        </Box>
      ),
    },

    {
      field: 'test',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <Delete />
          </IconButton>
          <EditCategory
            data={params.row}
            categoryId={params.row._id}
            style={style}
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box m="20px">
        <Header title="Catégories" subtitle="Liste des catégories disponible" />

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
          <CategoryForm />
          <DataGrid
            rows={categoryData}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row._id}
          />
        </Box>
      </Box>
    </>
  );
};

export default Category;
