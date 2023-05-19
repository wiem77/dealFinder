import React, { useState } from 'react';
import {
  Box,
  Select,
  MenuItem,
  IconButton,
  InputLabel,
  FormControl,
} from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Add, Edit, Delete, Remove } from '@mui/icons-material';
import axios from 'axios';
import { baseUrl } from '../../config/config';
import { TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import Header from '../Header';
export default function DeletesCatfromCat({ style, data, id, sub }) {
  console.log('subDelete', sub);
  const catInfo =
    sub && sub.length > 0
      ? sub.map((s) => ({
          _idc: s._id,
          name_c: s.subCategory_name,
        }))
      : [];

  const [open, setOpen] = useState(false);
  const [cInfo, setCInfo] = useState();
  const [selectedSubCat, setSelectedSubCat] = useState([]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = async (id) => {
    setCInfo(id);
    setOpen(true);
    console.log(setCInfo);
  };

  console.log('subbbbbbbbbb', sub);

  const handleDeleteSubCat = (subCat) => {
    const id = subCat.id;
    const name = subCat.name;
    const confirmMessage = `êtes-vous sûr de vouloir supprimer cette Catégorie ${name}?`;
    const result = window.confirm(confirmMessage);
    if (result) {
      axios
        .delete(`${baseUrl}subCategory/delete_sub_Category/${id}`)
        .then((response) => {
          const newSelectedCoupons = selectedSubCat.filter((c) => c.id !== id);
          setSelectedSubCat(newSelectedCoupons);
          window.confirm(
            `Catégorie supprimer avec succées  ${name} reféechiser la page`
          );
        })
        .catch((error) => {
          console.error('Error :', error);
          window.confirm(error);
        });
    }
  };
  const availableCoupons = catInfo.filter(
    (subCat) => !selectedSubCat.some((c) => c.id === subCat._idc)
  );
  return (
    <div>
      <Button onClick={() => handleOpen(id)}>
        <Remove style={{ color: 'black' }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Header
            title=" Liste des Sous_Catégories"
            subtitle={'Sélectionner une sous_Catégorie pour les supprimer'}
          />

          <Formik>
            {({ values, handleChange }) => (
              <form>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    '& > div': {
                      gridColumn: 'span 4',
                    },
                  }}
                >
                  <FormControl variant="filled" fullWidth>
                    <InputLabel id="Sous_Catégories-label">
                      Sous Catégories
                    </InputLabel>

                    <Select
                      labelId="Sous_Catégories-label"
                      id="Sous_Catégories"
                      fullWidth
                      multiple
                      value={selectedSubCat}
                      onChange={(event) => {
                        setSelectedSubCat(event.target.value);
                      }}
                      sx={{ gridColumn: 'span 4' }}
                    >
                      {availableCoupons.map((cat) => (
                        <MenuItem
                          key={cat._idc}
                          value={{ id: cat._idc, name: cat.name_c }}
                        >
                          {cat.name_c}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexWrap="wrap"
                    sx={{ gridColumn: 'span 4', mt: 2 }}
                  >
                    {selectedSubCat.map((v) => (
                      <Box key={v.id} display="flex" alignItems="center">
                        <Typography variant="body1">{v.name}</Typography>
                        <IconButton onClick={() => handleDeleteSubCat(v)}>
                          <Delete />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px"></Box>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
