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
import { Delete } from '@mui/icons-material';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { tokens } from '../../theme';
import Header from '../../components/Header';

import axios from 'axios';
import { baseUrl } from '../../config/config';

import { useEffect, useState } from 'react';
import EditCategory from '../../components/EditCategory';
import ModalSubCat from '../../components/showDetails/ModalSubCat';
import EditSubCategory from '../../components/EditSubCategory';

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

const SubCategory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState({});
  const [subCategoryData, setSubCategoryData] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (subcategoryId) => {
    console.log('categoryData', subCategoryData);
    const subcategoryDetails = subCategoryData.find(
      (subcategory) => subcategory.id === subcategoryId
    );
    if (!subcategoryDetails) {
      console.error(`Could not find Category with id ${subcategoryId}`);
      return;
    }
    setCategoryInfo(subcategoryDetails);
    setOpen(true);
    console.log(categoryInfo);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}subCategory/delete_sub_Category/${id}`);
      setSubCategoryData((prevData) => {
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
      console.error(error);
    }
  };

  const transformStoreData = (subCats) => {
    return subCats.map((subCat) => {
      let storesNames = [];

      if (subCat.stores && subCat.stores.length > 0) {
        storesNames = subCat.stores.map((store) => store.store_name);
      }

      const nbStores = storesNames.length;
      const storesString =
        nbStores > 0 ? `${nbStores} ` : 'pas de sous boutiques';

      return {
        id: subCat.id,
        _id: subCat._id,
        category_name: subCat.category.category_name,
        subCategory_name: subCat.subCategory_name,
        store_name: storesNames,
        nbStores,
        storesString,
      };
    });
  };

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}subCategory/getAll_sub_Category`
        );
        console.log(response.data);
        const subCategoryWithId = response.data.map((subcategory, index) => ({
          ...subcategory,
          id: index,
        }));

        setSubCategoryData(transformStoreData(subCategoryWithId));
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubCategory();
  }, []);
  console.log('SubCategoryData', subCategoryData);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: '_id', headerName: 'Registrar ID' },
    {
      field: 'subCategory_name',
      headerName: 'Sous_Catégorie',
      flex: 1,
      cellClassName: 'name-column--cell',
    },

    {
      field: 'category_name',
      headerName: 'Catégorie',
      flex: 1,
    },
    {
      field: 'storesString',
      headerName: 'Boutiques',
      flex: 1,
    },

    {
      field: 'details',
      headerName: 'Détails',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex' }}>
          <ModalSubCat data={params.row} id={params.row._id} style={style} />
        </Box>
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
          <EditSubCategory
            data={params.row}
            id={params.row._id}
            style={style}
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box m="20px">
        <Header
          title="Sous_catégories"
          subtitle="Liste des Sous_Catégorie disponible"
        />
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
            rows={subCategoryData}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row._id}
          />
        </Box>
      </Box>
    </>
  );
};

export default SubCategory;
