const { authenticateToken } = require('./../middlewares/auth.middleware');
module.exports = function (router) {
  router.get('/profile', authenticateToken, function (req, res) {
    const curerntUser = req.user;
    res.json({ success: true, user: curerntUser });
  });

  return router;
};
