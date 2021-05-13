require('dotenv/config');
const illnessURL = process.env.ILLNESSES_URL;
const hospitalURL = process.env.HOSPITALS_URL;
const localURL = process.env.LOCAL_URL; 

const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require("../db/patients");

//retrive data from the endpoints
const fetchData = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    return error;
  }
};

//get data and replace the link as API link
const getDataAndReplaceLink = async (type, req, res) => {
  try{
    const {limit, page} = req.query;

    let url = type === "illnesses" ? illnessURL:hospitalURL;

    if(limit && page > 0) {
      url = `${url}?limit=${limit}&page=${page}`;
    }

    let list = await fetchData(url);

    res.send(list);
  } catch(err) {
    res.send({
      error: `${err.message}`,
    });
  } 
};

/*************** APIs *****************/

//return illnesses list to front end
router.get('/illnesses', async(req, res) => {
  return getDataAndReplaceLink('illnesses', req, res);
})

//return hospitals list to front end
router.get('/hospitals', async(req, res) => {
  return getDataAndReplaceLink('hospitals', req, res);
})

//store patient information to database
router.post('/userinfo', async(req, res) => {
  const { username, illness_id, severity_level } = req.body.body;
  const patientInfo = {
    "username": username,
    "illness_id":illness_id,
    "severity_level":severity_level
  };

  try{
    //record patients information: username, illness_id, severity_level 
    const results = await db.savePatientInfo(patientInfo);
    res.status(200).json({id:results[0]});
  } catch(err) {
    res.send({
      error: `${err.message}`,
    });
  } 
})

module.exports = router;