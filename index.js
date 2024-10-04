const express = require('express');
const app = express();
const port = 3000;
const summarizeText = require('./summarize.js');

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Handle POST requests to the '/summarize' endpoint
app.post('/summarize', (req, res) => {
  const text = req.body.text_to_summarize;

  summarizeText(text)
    .then(response => {
      res.send(response); // Send the summary text as a response
    })
    .catch(error => {
      console.log('Error in API request:', error.message);
      res.status(500).send('Error summarizing text');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
