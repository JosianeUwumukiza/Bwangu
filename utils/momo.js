// backend/utils/momo.js
const axios = require('axios');

const verifyMomoTransaction = async (transactionId, amount) => {
  try {
    const response = await axios.get(`${process.env.MTN_MOMO_BASE_URL}/transactions/${transactionId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.MTN_MOMO_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const { status, amount: transAmount } = response.data;

    if (status === 'SUCCESS' && transAmount === amount) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('MoMo Verification Error:', error.response.data);
    return false;
  }
};

const initiateMomoPayment = async (phoneNumber, amount, reference) => {
  try {
    const response = await axios.post(`${process.env.MTN_MOMO_BASE_URL}/payments`, {
      amount,
      currency: 'RWF',
      externalId: reference,
      payer: {
        partyIdType: 'MSISDN',
        partyId: phoneNumber
      },
      payerMessage: 'Payment for Ride',
      payeeNote: 'Ride Fare'
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.MTN_MOMO_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('MoMo Payment Initiation Error:', error.response.data);
    throw new Error('Payment initiation failed');
  }
};

module.exports = {
  verifyMomoTransaction,
  initiateMomoPayment
};
