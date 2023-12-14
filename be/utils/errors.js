const notFoundError = (value, name) => {
    if (!value) {
        const error = new Error(`${name} not found!`);
        error.status = 404;
        throw error;
    }
}

module.exports = { notFoundError };