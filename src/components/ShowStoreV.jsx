import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';

import { Formik } from 'formik';

import VisibilityIcon from '@mui/icons-material/Visibility';

import { Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import Header from './Header';

function ShowStoreV({ style, data, id }) {
  const voucherInfo = data.name_V.map((voucher) => ({
    _idVoucher: voucher._id,
    name_V: voucher.name_V,
  }));
  console.log('voucherInfo', voucherInfo);
  const initialValues = {
    _id: data._id,
    vouchers: voucherInfo.name_V,
  };
  console.log(voucherInfo.name_V);
  const [open, setOpen] = useState(false);
  const [subCatInfo, setSubCatInfo] = useState();
  const handleClose = () => {
    setOpen(false);
  };
  const [editable, setEditable] = useState(false);

  const handleDescriptionClick = () => {
    setEditable(true);
  };
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
          <Header
            title=" Liste des Coupons"
            subtitle={'_idBoutique' + ' - ' + id}
          />
          <Formik initialValues={initialValues}>
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
                  <Select
                    fullWidth
                    label="vouchers"
                    defaultValue={voucherInfo[0].name_V}
                    sx={{ gridColumn: 'span 4' }}
                  >
                    {voucherInfo.map((voucher) => (
                      <MenuItem key={voucher._idVoucher} value={voucher.name_V}>
                        {voucher.name_V}
                      </MenuItem>
                    ))}
                  </Select>
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

export default ShowStoreV;
