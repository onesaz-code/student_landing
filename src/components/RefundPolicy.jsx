import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const RefundPolicy = () => (
  <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fa' }}>
    <Card sx={{ maxWidth: 480, width: '100%', borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h4" fontWeight={700} gutterBottom align="center">
          Refund Policy
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 2 }}>
          All payments made to ONESAZ are final and non-refundable.<br />
          Please review your order carefully before completing your purchase. If you have any questions or concerns, contact our support team prior to making payment.
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

export default RefundPolicy; 