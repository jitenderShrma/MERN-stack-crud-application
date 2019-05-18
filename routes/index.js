const express = require('express');
const router = express.Router();
const Merchant = require('../models/Merchant');

// @route get '/merchant/'
// @desc to get all merchant
router.get('/', (req, res) => {
  Merchant.find()
    .sort('-created_date')
    .then(data => {
      if (data.length === 0) {
        return res.status(200).json({ nomerchantfound: 'No merchant found' })
      } else {
        return res.status(200).json(data);
      }
    })
    .catch(error => console.log(error));
});

// @route get '/merchant/by-id/:merchant_id'
// @desc to get merchant by id
router.get('/get-by-id/:merchant_id', (req, res) => {
  Merchant.findById(req.params.merchant_id)
    .then(data => {
      if (data === null) {
        return res.status(200).json({ nomerchantfound: 'No merchant found' })
      } else {
        return res.status(200).json(data);
      }
    })
    .catch(error => console.log(error));
});


// @route post '/merchant/'
// @desc to add merchant
router.post('/', (req, res) => {
  if (!req.body.name) {
    const errors = {
      name: 'name required'
    }
    return res.status(404).json(errors);
  } else {
    // save into db
    const newMerchant = {
      serial_number: Merchant.find().count() + 1,
      name: req.body.name,
      isActivated: req.body.isActivated,
      description: req.body.description
    }
    new Merchant(newMerchant).save()
      .then(() => res.status(200).json({ success: true }))
      .catch(error => res.status(404).json(error));
  }
});

// @route delete '/merchant/:merchant_id'
// @desc to delete merchant
router.delete('/:merchant_id', (req, res) => {
  Merchant.findByIdAndRemove(req.params.merchant_id)
    .then(() => res.status(200).json({ success: true }))
    .catch(error => console.log(error));
});

// @route post '/merchant/update/status/:merchant_id'
// @desc to make update 
router.post('/update/', (req, res) => {
  Merchant.findById(req.body.merchant_id)
    .then(merchant => {

      if (
        (merchant.description !== req.body.description) ||
        (merchant.isActivated !== req.body.isActivated)
      ) {
        merchant.changes_history.push(new Date());

      }
      merchant.isActivated = req.body.isActivated;
      merchant.description = req.body.description;

      //save to db
      Merchant(merchant).save()
        .then(() => res.status(200).json({ success: true }));
    })
    .catch(error => console.log(error));
});

// @route get '/merchant/by-status'
// @desc to post all merchant by status
router.post('/by-status', (req, res) => {
  if (req.body.status) {
    Merchant.find({ isActivated: req.body.status })
      .sort('-created_date')
      .then(data => {
        if (data.length === 0) {
          return res.status(200).json({ nomerchantfound: 'No merchant found' })
        } else {
          return res.status(200).json(data);
        }
      })
      .catch(error => console.log(error));
  } else {
    Merchant.find()
      .sort('-created_date')
      .then(data => {
        if (data.length === 0) {
          return res.status(200).json({ nomerchantfound: 'No merchant found' })
        } else {
          return res.status(200).json(data);
        }
      })
      .catch(error => console.log(error));
  }
});

// @route get '/merchant/by-name'
// @desc to post all merchant by name
router.post('/by-name', (req, res) => {
  Merchant.find({ "name": { $regex: `.*${req.body.name.toLowerCase()}.*` } })
    .sort('-created_date')
    .then(data => {
      if (data.length === 0) {
        return res.status(200).json({ nomerchantfound: 'No merchant found' })
      } else {
        return res.status(200).json(data);
      }
    })
    .catch(error => console.log(error));
});

module.exports = router;
