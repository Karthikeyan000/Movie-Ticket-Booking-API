module.exports = {
    notFoundResponse: (message) => { // return error message as response if content notFound
      return {
        success: false,
        statusCode: 404,
        message: message,
      };
    },
    successResponse: (data) => { // successCode with data as response
      return {
        success: true,
        statusCode: 200,
        data: data,
      };
    },
    unAuthorizedResponse: (message) => { // unAuthorized Error for the incorrect credentials
      return {
        success: true,
        statusCode: 401,
        message: message,
      };
    },
    successResponseWithMessage: (data,message) => { // successCode with data as response with message
      return {
        success: true,
        statusCode: 200,
        message:message,
        data: data,
      };
    },
    badRequestResponse: (message) => { // return badRequest error message as response any unExpected error
        return {
          success: false,
          statusCode: 400,
          message: message,
        };
      },
      alreadyExistsResponse: (message) => { // return error message as response if alreadyExists in Database
        return {
          success: false,
          statusCode: 409,
          message: message,
        };
      },
      isRequiredResponse: (message) => { // return error message as response for any required field missing
        return {
          success: false,
          statusCode: 422,
          message: message,
        };
      },
  };
  