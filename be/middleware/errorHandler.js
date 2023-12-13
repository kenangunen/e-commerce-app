module.export = (err, req, res) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
};
