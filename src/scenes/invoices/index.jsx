import {
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { mockDataInvoices } from '../../data/mockData';
import Header from '../../components/Header';

import axios from 'axios';
import { baseUrl } from '../../config/config';

import { useEffect, useState } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import EditVoucher from '../../components/EditVoucher';

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);
  const [voucherInfo, setVoucherInfo] = useState({});
  const [voucherData, setVoucherData] = useState([]);

  const [modal, setmodal] = useState('test');
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (voucherId) => {
    console.log('voucherDate', voucherData);
    const voucherDetails = voucherData.find(
      (voucher) => voucher.id === voucherId
    );
    if (!voucherDetails) {
      console.error(`Could not find voucher with id ${voucherId}`);
      return;
    }
    setVoucherInfo(voucherDetails);
    setOpen(true);
    console.log(voucherInfo);
  };

  // const handleUpdate = () => {
  //   setmodal(

  //   );
  // };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}vouchers/deleteVoucher/${id}`);
      setVoucherData((prevData) => {
        const newData = [...prevData];
        const index = newData.findIndex((voucher) => voucher.id === id);
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
  const handleConfirmDelete = async () => {
    const id = voucherInfo.id;
    try {
      await axios.delete(`${baseUrl}vouchers/deleteVoucher/${id}`);
      setVoucherData((prevData) => {
        const newData = [...prevData];
        const index = newData.findIndex((voucher) => voucher.id === id);
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
    } finally {
      setOpen(false);
    }
  };

  const transformStoreData = (vouchers) => {
    return vouchers.map((voucher) => {
      return {
        id: voucher.id,
        _id: voucher._id,
        voucher_name: voucher.name_V,
        description: voucher.description,
        discount: voucher.discount,
        storename: voucher.store,
        available: voucher.is_available,
        creatDate: voucher.createdAt.slice(0, 10),
        nbVoucher: voucher.available_vouchers,
      };
    });
  };

  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const response = await axios.get(`${baseUrl}vouchers`);
        console.log(response.data.vouchers);
        const voucherWithId = response.data.vouchers.map((voucher, index) => ({
          ...voucher,
          id: index,
        }));

        setVoucherData(transformStoreData(voucherWithId));
      } catch (error) {
        console.error(error);
      }
    };

    fetchVoucher();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'voucher_name',
      headerName: 'nom de coupon',
      flex: 1,
      cellClassName: 'name-column--cell',
    },

    {
      field: 'discount',
      headerName: 'Remise',
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.discount}%
        </Typography>
      ),
    },
    {
      field: 'creatDate',
      headerName: 'date de la création',
      flex: 1,
    },
    {
      field: 'available',
      headerName: 'Valide ',
      flex: 1,
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
                Identifiant : {voucherInfo._id}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Nom de Voucher: {voucherInfo.voucher_name}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                description: {voucherInfo.description}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Remise: {voucherInfo.discount}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Nombre de coupons disponible : {voucherInfo.nbVoucher}
              </Typography>
            </Box>
          </Modal>
        </>
      ),
    },
    {
      field: 'Actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex' }}>
          <EditVoucher
            style={style}
            idVoucher={params.row._id}
            data={params.row}
          />

          <IconButton onClick={() => setOpen(true)}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Coupons" subtitle="List of Coupons" />
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
        }}
      >
        <DataGrid rows={voucherData} columns={columns} />
        {modal}
      </Box>
    </Box>
  );
};

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
export default Invoices;
