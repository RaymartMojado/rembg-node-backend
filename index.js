const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Set up Multer to handle file uploads
const upload = multer({ dest: 'uploads/' });

// POST endpoint to remove background
app.post('/remove-background', upload.single('image'), async (req, res) => {
  const imagePath = req.file.path;

  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(imagePath));

    // Send the image to the running rembg FastAPI server
    const rembgResponse = await axios.post('http://127.0.0.1:7001/', form, {
      headers: form.getHeaders(),
      responseType: 'stream',
    });

    // Stream the response (processed image) back to the client
    res.setHeader('Content-Type', 'image/png');
    rembgResponse.data.pipe(res);
  } catch (error) {
    console.error('Error calling rembg server:', error.message);
    res.status(500).send('Error during background removal');
  } finally {
    // Clean up uploaded file
    fs.unlinkSync(imagePath);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Node.js server running at http://localhost:${port}`);
});
