import nc from 'next-connect';

export default nc({
  onError(error, req, res) {
    res.status(501).json({ error: `something went wrong ${error}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `method ${req.method} not allowed` });
  },
});
