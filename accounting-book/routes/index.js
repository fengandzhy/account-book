var express = require('express');
var router = express.Router();

/* accounting book list page. */
router.get('/account', function(req, res, next) {
  res.render('list', { title: 'Express' });

});

router.get('/account/create', function(req, res, next) {
  res.render('create', { title: 'Express' });
});

router.post('/account', (req, res) => {
  // res.render('create', { title: 'Express' });
  res.send('添加记录.');
});

module.exports = router;
