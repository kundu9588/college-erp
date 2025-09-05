/**
 * Standard response handler for API responses.
 *
 * @param {Response} res - Express response object
 * @param {Object} options - Options for response
 * @param {boolean} options.success - Whether the request was successful
 * @param {string} options.message - Response message
 * @param {any} options.data - Response payload data
 * @param {Object|null} options.error - Error details if any
 * @param {number} options.statusCode - HTTP status code (default 200)
 */
function sendResponse(
  res,
  { success = true, message = "", data = null, error = null, statusCode = 200 }
) {
  return res.status(statusCode).json({
    success,
    message,
    data,
    error,
  });
}

module.exports = {
  sendResponse,
};
