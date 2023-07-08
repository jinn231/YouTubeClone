exports.createError = (message, status) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    throw err;
}