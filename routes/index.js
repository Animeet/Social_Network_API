const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

function middleware(req, res) {
  return res.send('Wrong route!');
}
router.use(middleware);

module.exports = router;
