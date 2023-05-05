import { Box, Typography, useTheme, Button, Modal } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

import { tokens } from '../../theme';

import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

import Header from '../../components/Header';

import axios from 'axios';
import { baseUrl } from '../../config/config';

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);

  const [userInfo, setUserInfo] = useState({});
  const [userData, setUserData] = useState({});

  const [selectionModel, setSelectionModel] = useState([]);

  function handleDelete() {
    const updatedData = userData.filter((row) => {
      return !selectionModel.includes(row.id);
    });
    setUserData(updatedData);
    setSelectionModel([]);
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (userId) => {
    const userDetails = userData.find((user) => user.id === userId);
    if (!userDetails) {
      console.error(`Could not find User with id ${userId}`);
      return;
    }
    setUserInfo(userDetails);
    setOpen(true);
    console.log(userData);
  };
  const transformStoreData = (users) => {
    return users.map((user) => {
      return {
        id: user.id,
        _id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        telephone: user.telephone,
        email: user.email,
        city: user.location.city,
        role: user.roles,
        verified: user.verified,
        age: user.age,
        sexe: user.sexe,
      };
    });
  };
  console.log(userData.verified);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}getUsers`);
        console.log(response.data);
        const userWithId = response.data.map((user, index) => ({
          ...user,
          id: index,
        }));

        setUserData(transformStoreData(userWithId));
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID' },
    // { field: '_id', headerName: 'Registrar ID' },
    {
      field: 'nom',
      headerName: 'nom',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      valueGetter: (params) => params.value || 'Guest',
    },
    {
      field: 'sexe',
      headerName: 'sexe',
      flex: 1,
      valueGetter: (params) => params.value || 'Guest',
    },
    {
      field: 'city',
      headerName: 'city',
      flex: 1,
    },
    {
      field: 'verified',
      headerName: 'Compte verifier',
      flex: 1,
      valueGetter: (params) => params.value || 'false',
    },
    {
      field: 'role',
      headerName: 'Access Level',
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === 'admin'
                ? colors.greenAccent[600]
                : role === 'consommateur'
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === 'admin' && <AdminPanelSettingsOutlinedIcon />}
            {role === 'consommateur' && <LocalOfferOutlinedIcon />}
            {role === 'visiteur' && <PersonOutlineOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              {role}
            </Typography>
          </Box>
        );
      },
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
                Identifiant : {userInfo._id}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Nom de l'utilisateur: {userInfo.nom},{userInfo.prenom}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Contact: {userInfo.telephone}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                email: {userInfo.email}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Compte verifier : {userInfo.verified}
              </Typography>
            </Box>
          </Modal>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Utilisateurs" subtitle="Utilisateurs" />
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
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Supprimer l'affichage
        </Button>
        <DataGrid
          checkboxSelection
          rows={userData}
          columns={columns}
          onSelectionModelChange={(newSelection) => {
            setSelectionModel(newSelection);
          }}
          selectionModel={selectionModel}
          components={{
            Toolbar: GridToolbar,
          }}
        />
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

export default Team;
