const { authenticateToken, authorization } = require('./../middlewares/auth.middleware');

module.exports = function (router) {
  router.get('/', authenticateToken, authorization(['admin', 'partner']), async function (req, res) {
    res.json({ success: true });
  });

  router.post('/create', authenticateToken, authorization(['admin', 'partner']), async function (req, res) {
    res.json({ success: true });
  });

  router.get('/:id/edit', authenticateToken, authorization(['admin', 'partner']), async function (req, res) {
    res.json({ success: true });
  });

  router.post('/:id/update', authenticateToken, authorization(['admin', 'partner']), async function (req, res) {
    res.json({ success: true });
  });

  router.post('/:id/delete', authenticateToken, authorization(['admin', 'partner']), async function (req, res) {
    res.json({ success: true });
  });

  return router;
};
