var express = require('express');
var router = express.Router();

// controllers
const countryCtrl = require('../controller/getCountry');
const autoCompleteCtrl = require('../controller/autoComplete');
const dataCountCtrl = require('../controller/dataCount');
const accountListCtrl = require('../controller/accountList');
const getFilterDataCtrl = require('../controller/getFilteredData');
var db = require('../models/db');


// middlewares
const jwtHelper = require('../config/jwtHelper');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index.html', { title: '3 Tec Solutions', status: 'API Connected!!!' });
});


router.post('/filterData', jwtHelper.verifyJwtToken, getFilterDataCtrl.getFilterData);


// get employee range
router.get('/employeeSize', jwtHelper.verifyJwtToken, autoCompleteCtrl.getEmployeeSize);

// get country
router.get('/getcountry', jwtHelper.verifyJwtToken,countryCtrl.getC);

// get job function
router.get('/getJobFunction', jwtHelper.verifyJwtToken, autoCompleteCtrl.getFunction);

// get industry
router.post('/getIndustry', jwtHelper.verifyJwtToken, autoCompleteCtrl.getIndustry);

// get job level
router.get('/getJobLevel', jwtHelper.verifyJwtToken, autoCompleteCtrl.getJobLevel);

// get count 
router.post('/getCount', jwtHelper.verifyJwtToken, dataCountCtrl.getCount);

// For account list
router.post('/getAL', jwtHelper.verifyJwtToken, accountListCtrl.getAL);

// get count of mapped Account list
router.post('/getCountAL', jwtHelper.verifyJwtToken, accountListCtrl.getCountAL);


router.get('/apiTest', jwtHelper.verifyJwtToken, (req, res, next) => {
  sql = 'show tables';
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log('data :', rows)
    res.send(rows);
  });
});

module.exports = router;


// sql = 'select first_name, last_name, job_title ,company_name, website, email_address,contact.work_phone, contact.address_l1, contact.city, contact.State, contact.Zip_code, contact.Country, emp_range, LI_industry, vv_disposition, qa_reason, LI_link, LI_company_link from contact inner join company on contact.c_id = company.id inner join email on email.contact_id = contact.id inner join quality_check on quality_check.contact_id = contact.id WHERE ' + countryChack.where+ ' and ' +industryCheck.where + ' and ' + conditions.where + ` Limit ${req.body.limit}`;
