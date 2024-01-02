const { errorTypeConstants } = require('../constants/errorConstants');

const checkExistence = (value, name, res) => {
  if (!value) {
    return res.status(404).json({ message: `${name} not found!` });
  }
};

const checkVersionError = (error, res, next) => {
  if (error.name === errorTypeConstants.VERSION_ERROR) {
    res.status(409).json({
      error: 'Document has been updated by another user. Please refresh the page and try again.'
    });
  } else {
    next(error);
  }
};

module.exports = { checkExistence, checkVersionError };
