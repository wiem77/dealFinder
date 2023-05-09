import React, { useState } from 'react';
import { Box, Select, MenuItem, IconButton } from '@mui/material';
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
export default function DeleteVfromStore({ style, data, id }) {
  console.log('dataV', data);

  const voucherInfo =
    data.name_V && data.name_V.length > 0
      ? data.name_V.map((voucher) => ({
          _idVoucher: voucher._id,
          name_V: voucher.name_V,
        }))
      : [];

  console.log('rffrefrefrf', voucherInfo);
  const [open, setOpen] = useState(false);
  const [vInfo, setVInfo] = useState();
  const [selectedCoupon, setSelectedCoupon] = useState([]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = async (id) => {
    setVInfo(id);
    setOpen(true);
    console.log(voucherInfo);
  };
  const handleDeleteStore = (voucher) => {
    const id = voucher.id;
    const name = voucher.name;
    const confirmMessage = `êtes-vous sûr de vouloir supprimer la Boutique ${name}?`;
    const result = window.confirm(confirmMessage);
    if (result) {
      axios
        .delete(`${baseUrl}vouchers/deleteVoucher/${id}`)
        .then((response) => {
          const newSelectedCoupons = selectedCoupon.filter(
            (v) => v.id !== voucher.id
          );
          setSelectedCoupon(newSelectedCoupons);
          window.confirm(
            `Coupon supprimer avec succées  ${name} reféechiser la page`
          );
        })
        .catch((error) => {
          console.error('Error deleting store:', error);
          window.confirm(error);
        });
    }
  };
  const availableCoupons = voucherInfo.filter(
    (voucher) => !selectedCoupon.some((c) => c.id === voucher._idVoucher)
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
            title=" Liste des Coupons"
            subtitle={'Sélectionner un coupon pour les supprimer' + ' - ' + id}
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
                  <Select
                    fullWidth
                    label="Coupon"
                    defaultValue="Coupon"
                    multiple
                    value={selectedCoupon}
                    onChange={(event) => {
                      setSelectedCoupon(event.target.value);
                    }}
                    sx={{ gridColumn: 'span 4' }}
                  >
                    {availableCoupons.map((voucher) => (
                      <MenuItem
                        key={voucher._idVoucher}
                        value={{ id: voucher._idVoucher, name: voucher.name_V }}
                      >
                        {voucher.name_V}
                      </MenuItem>
                    ))}
                  </Select>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexWrap="wrap"
                    sx={{ gridColumn: 'span 4', mt: 2 }}
                  >
                    {selectedCoupon.map((v) => (
                      <Box key={v.id} display="flex" alignItems="center">
                        <Typography variant="body1">{v.name}</Typography>
                        <IconButton onClick={() => handleDeleteStore(v)}>
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
