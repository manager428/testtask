var express = require('express');
var router = express.Router();
var authRouter = require('./auth.route');
var userRouter = require('./users.route');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

const defaultRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/users',
    route: userRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
