import * as React from 'react';
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';

import { Formik } from 'formik';

import VisibilityIcon from '@mui/icons-material/Visibility';

import { Select, MenuItem } from '@mui/material';
import { useState } from 'react';
import Header from './Header';

function ShowStoreV({ style, data, id }) {
  // const voucherInfo = data.name_V.map((voucher) => ({
  //   _idVoucher: voucher._id,
  //   name_V: voucher.name_V,
  // }));
  const voucherInfo =
    data.name_V && data.name_V.length > 0
      ? data.name_V.map((voucher) => ({
          _idVoucher: voucher._id,
          name_V: voucher.name_V,
        }))
      : [];

  console.log('voucherInfo', voucherInfo);
  const initialValues = {
    _id: data._id,
    vouchers: voucherInfo.name_V,
  };
  console.log(voucherInfo.name_V);
  const [open, setOpen] = useState(false);
  const [subCatInfo, setSubCatInfo] = useState();

  const [selectedCoupon, setSelectedCoupon] = useState(null);
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
      <IconButton onClick={() => handleOpen(id)}>
        <VisibilityIcon style={{ color: 'black' }} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            overflow: 'auto',
            padding: '20px',
            maxHeight: '500px',
          }}
        >
          <Header
            title=" Liste des Coupons"
            subtitle={'Boutique' + ' - ' + data.store_name}
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
                  <FormControl variant="filled" fullWidth>
                    <InputLabel id="coupons-select-label">
                      Liste des Coupons
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="coupons-select-label"
                      label="vouchers"
                      onChange={(e) => {
                        const selectedVoucher = voucherInfo.find(
                          (voucher) => voucher.name_V === e.target.value
                        );
                        setSelectedCoupon(selectedVoucher);
                        handleChange(e);
                      }}
                      sx={{ gridColumn: 'span 4' }}
                    >
                      {voucherInfo.map((voucher) => (
                        <MenuItem
                          key={voucher._idVoucher}
                          value={voucher.name_V}
                        >
                          {voucher.name_V}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {selectedCoupon && (
                    <>
                      <p
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          margin: 0,
                          textDecoration: 'underline',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Coupon sélectionner
                      </p>
                      <Typography
                        variant="body1"
                        sx={{
                          backgroundColor: 'grey',
                          padding: '10px',
                          borderRadius: '5px',
                          gridColumn: 'span 4',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '1em',
                            fontWeight: 'bold',
                            textDecoration: 'underline',
                          }}
                        >
                          {selectedCoupon.name_V}
                        </span>
                        <br />
                        <span>
                          <span style={{ fontWeight: 'bold' }}>
                            Nom_Coupon:
                          </span>{' '}
                          {selectedCoupon.name_V}
                        </span>
                        <br />
                        <span>
                          <span style={{ fontWeight: 'bold' }}>Id:</span>{' '}
                          {selectedCoupon._idVoucher}
                        </span>
                      </Typography>
                    </>
                  )}
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
