const express = require('express');
const multer = require('multer');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const port = 3000;

// Set up Multer to handle file uploads
const upload = multer({ dest: 'uploads/' });

// POST endpoint to remove background from image
app.post('/remove-background', upload.single('image'), (req, res) => {
  const imagePath = req.file.path;
  const outputPath = path.join('uploads', 'output.png'); // Output image path

  // Run rembg command using exec with full path to rembg or python -m rembg
  exec(`/Users/angelomarikit/rembg-node-backend/rembg-env/bin/rembg i -m birefnet-portrait -bgc 255 255 255 255 ${imagePath} ${outputPath}`, (err, stdout, stderr) => {
    if (err) {
      console.error('Error:', stderr);
      return res.status(500).send('Error during background removal');
    }
    res.sendFile(outputPath, { root: __dirname });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
