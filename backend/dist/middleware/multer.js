import multer from 'multer';
//this intializes multer  , tells it to automatically ave uploaded files to a foldr uploads relative to the root,each uploaded file gets a random file name for safety
const upload = multer({ dest: 'uploads/' });
export default upload;
//exports the middleware  to be used across routes
//mports the multer library, which is a middleware used in Express.js to handle multipart/form-data — commonly used for file uploads (like images, PDFs, etc.).
//Multer will help us parse the uploaded file and store it on the server.
