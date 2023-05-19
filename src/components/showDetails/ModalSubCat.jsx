import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Edit } from '@mui/icons-material';
import axios from 'axios';
import { baseUrl } from '../../config/config';
import { FormControl, InputLabel, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { Select, MenuItem } from '@mui/material';
import { useState } from 'react';

function ModalSubCat({ style, data, id, sub }) {
  console.log('dataModalSubcat', data);
  console.log('subShow', sub);
  const catInfo =
    sub && sub.length > 0
      ? sub.map((s) => ({
          _idc: s._id,
          name_c: s.subCategory_name,
        }))
      : [];

  const [open, setOpen] = useState(false);
  const [subCatInfo, setSubCatInfo] = useState();
  const handleClose = () => {
    setOpen(false);
  };
  console.log('subCatInfooooooooooo', subCatInfo);
  const handleOpen = async (id) => {
    setSubCatInfo(id);
    setOpen(true);
    console.log(subCatInfo);
  };
  return (
    <div>
      <Button onClick={() => handleOpen(id)}>
        <VisibilityIcon style={{ color: 'black' }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                      fullWidth
                      label="Sous_Catégories"
                      value=""
                      sx={{ gridColumn: 'span 4' }}
                    >
                      {catInfo.map((sub) => (
                        <MenuItem key={sub._idc} value="" disabled>
                          {sub.name_c}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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

export default ModalSubCat;
