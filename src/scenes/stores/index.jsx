import {
  Box,
  Select,
  MenuItem,
  Modal,
  Button,
  Typography,
} from '@mui/material';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useTheme } from '@mui/material';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';

import Header from '../../components/Header';

import axios from 'axios';
import { baseUrl } from '../../config/config';

import { useEffect, useState } from 'react';
import EditStore from '../../components/EditStore';

const Store = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);

  const [storeInfo, setStoreInfo] = useState({});
  const [storesData, setStoresData] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (storeId) => {
    console.log('storeId', storeId);
    console.log(storesData);
    const storeDetails = storesData.find((store) => store.id === storeId);
    if (!storeDetails) {
      console.error(`Could not find store with id ${storeId}`);
      return;
    }
    setStoreInfo(storeDetails);
    setOpen(true);
    console.log(storeInfo);
  };

  const handleUpdate = (id) => {
    handleOpen();
  };
  const handleDelete = async (id) => {
    const confirmMessage = `êtes-vous sûr de vouloir supprimer la Boutique ${id}?`;
    const result = window.confirm(confirmMessage);
    if (result) {
      try {
        await axios.delete(`${baseUrl}store/deleteStore/${id}`);
        setStoresData((prevData) => {
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

  const transformStoreData = (stores) => {
    return stores.map((store) => {
      const voucherNames = store.vouchers
        .map((voucher) => voucher.name_V)
        .join(', ');
      const subCategoryNames = store.sub_categories
        .map((subCategory) => subCategory.subCategory_name)
        .join(', ');
      const addresses = store.locations
        .map((location) => location.formattedAddress)
        .join(', ');
      return {
        id: store.id,
        _id: store._id,
        store_name: store.store_name,
        phone: store.phone,
        email: store.email,
        location: addresses,
        rating: store.rating,
        city: store.locations[0].city,
        laltitude: store.locations[0].coordinates[0],
        longatude: store.locations[0].coordinates[1],
        zipcode: store.locations[0].zipcode,
        category: store.sub_categories[0].subCategory_name,
        subCategoy: subCategoryNames,
        name_V: voucherNames,
      };
    });
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(`${baseUrl}store/getAllStore`);
        console.log('response', response.data);
        const storesWithId = response.data.map((store, index) => ({
          ...store,
          id: index,
        }));
        setStoresData(transformStoreData(storesWithId));
      } catch (error) {
        console.error(error);
      }
    };

    fetchStores();
  }, []);
  console.log('storesData', storesData);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: '_id', headerName: 'Registrar ID' },
    {
      field: 'store_name',
      headerName: 'Nom_boutique',
      flex: 1,
      cellClassName: 'name-column--cell',
    },

    {
      field: 'phone',
      headerName: 'N°Télephone',
      flex: 1,
    },

    {
      field: 'city',
      headerName: 'City',
      flex: 1,
    },

    {
      field: 'category',
      headerName: 'categoryNames',
      flex: 1,
    },
    {
      field: 'name_V',
      headerName: 'coupons',
      flex: 1,
      valueGetter: (params) => params.row.name_V.split(',')[0],
    },

    {
      field: 'showModal',
      headerName: 'Show Modal',
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
          <EditStore style={style} idStore={params.row._id} data={params.row} />
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box m="20px">
        <Header title="Boutiques" subtitle="Liste des boutiques partenaires " />
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
            rows={storesData}
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
            Nom de la Boutique : {storeInfo.store_name}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Numéro de télephone : {storeInfo.phone}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ville : {storeInfo.city}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Description : {storeInfo.description}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            location : {storeInfo.location}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Nom de coupons : {storeInfo.name_V}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Sous_Categories : {storeInfo.subCategoy}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Calassification : {storeInfo.rating}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Store;
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
