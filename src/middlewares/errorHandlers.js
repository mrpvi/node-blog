export default (error, request, response, next) => {
    console.log(error)
    if (error.status === 404) {
      response.status(404).json({
        status: 404,
        message: 'Not Found'
      });
    } else {
      console.log(error.message, error.status);
  
      const statusCode = error.status ?? 500;
  
      response.status(statusCode).json({
        status: statusCode,
        message: error.message
      });
    }
    next();
  };