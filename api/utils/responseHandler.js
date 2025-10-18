export const successHandler = (res, statusCode, message, data) => {
    return res.status(statusCode).json({
        success: true,
        message: message,
        data: data
    })
}

export const errorHandler = (res, statusCode, message, data) => {
    return res.status(statusCode).json({
        success: false,
        message: message,
        data: data
    })
}