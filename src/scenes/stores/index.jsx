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

const Store = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
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
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    // {
    //   field: 'email',
    //   headerName: 'Email',
    //   flex: 1,
    // },
    // {
    //   field: 'location',
    //   headerName: 'Address',
    //   flex: 1,
    // },
    {
      field: 'city',
      headerName: 'City',
      flex: 1,
    },
    // {
    //   field: 'zipcode',
    //   headerName: 'Zip Code',
    //   flex: 1,
    // },

    {
      field: 'category',
      headerName: 'categoryNames',
      flex: 1,
    },
    {
      field: 'name_V',
      headerName: 'coupons',
      flex: 1,
      // renderCell: (params) => (
      //   <Box>
      //     <Select value={params.value}>
      //       {name_V.map((coupon) => (
      //         <MenuItem key={coupon.id} value={coupon.name_V}>
      //           {coupon.name}
      //         </MenuItem>
      //       ))}
      //     </Select>
      //   </Box>
      // ),
    },
    {
      field: 'showModal',
      headerName: 'Show Modal',
      flex: 1,
      renderCell: (params) => {
        const handleOpen = () => {
          setOpen(true);
          setModalData(params.row); 
        };

        const handleClose = () => {
          setOpen(false);
        };

        return (
          <Box sx={{ textAlign: 'center' }}>
            <Button color="success" onClick={handleOpen}>
              Voir plus
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  "_id": {modalData._id}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {modalData.phone} | {modalData.city} | {modalData.category}
                </Typography>
              </Box>
            </Modal>
          </Box>
        );
      },
    },
  ];

  const transformStoreData = (stores) => {
    const tranformedStores = [];
    console.log(stores[0].id);
    stores.map((store, index) => {
      console.log(store.id);
      // const nameVs = store.vouchers.map((voucher) => voucher.name_V);
      tranformedStores.push({
        id: store.id,
        _id: store._id,
        store_name: store.store_name,
        phone: store.phone,
        email: store.email,
        location: store.locations[0].formattedAddress,
        city: store.locations[0].city,
        zipcode: store.locations[0].zipcode,
        category: store.sub_categories[0].category.category_name,
        name_V:
          store.vouchers.length > 0 ? store.vouchers[0].name_V : 'Undefined',
      });
    });

    console.log(tranformedStores);
    return tranformedStores;
  };

  const [storesData, setStoresData] = useState([]);
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(`${baseUrl}store/getAllStore`);
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
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Store;
