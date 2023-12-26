const notFoundError = (data, name) => {
    if (!data || data.length === 0) {
        const error = new Error(`${name} not found!`);
        error.status = 404;
        throw error;
    }
}

module.exports = { notFoundError };