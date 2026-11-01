export function errorHandler(error, _req, res, _next) {
  console.error(error);
  if (error.name === 'ZodError') return res.status(400).json({ message: 'Please check the submitted information.', issues: error.issues });
  if (error.code === 11000) return res.status(409).json({ message: 'This action has already been completed.' });
  res.status(error.status || 500).json({ message: error.status ? error.message : 'Something went wrong. Please try again.' });
}
