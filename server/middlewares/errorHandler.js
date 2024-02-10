export function errorHandler(error, req, res, next) {
  try {
    console.log("Express Global Error Handler: ", error);
    res.send(error);
  } catch (error) {}
}
