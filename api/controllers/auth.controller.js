const { generateJWT } = require('./../utils/jwt');

module.exports = function (router) {
  router.post('/login', function (req, res) {
    const { user } = req.body;

    //ORM User model here....
    // const currentUser = User.findOne
    const currentUser = { email: user.email, id: 111, role: 'admin' };
    const token = generateJWT(currentUser);

    res.json({ success: true, token: token });
  });

  return router;
};
