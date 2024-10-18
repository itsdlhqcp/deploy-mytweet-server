const express = require('express');
// const fetch = require('node-fetch');
// const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load .env variables
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// env var
const REACT_APP_TWITTER_CLIENT_ID ='MmsxeUVOTGtwQ2pmT0FCc29RMVA6MTpjaQ'
const REACT_APP_TWITTER_CLIENT_SECRET='CkrFcqbYo5KX1ZGtUyAjI8OskDcjNEIibYdFA5FfB9qlO_7kMD'

// Twitter OAuth credentials (stored in environment variables)
const TWITTER_CLIENT_ID = REACT_APP_TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = REACT_APP_TWITTER_CLIENT_SECRET;
const CALLBACK_URL = 'https://my-tweet-eight.vercel.app/signin'; // Replace

// Endpoint to exchange authorization code for access token
app.post('/api/twitter/token', async (req, res) => {
    const { code } = req.body;
  
    const body = new URLSearchParams({
      code,
      grant_type: 'authorization_code',
      client_id: TWITTER_CLIENT_ID,
      client_secret: TWITTER_CLIENT_SECRET,
      redirect_uri: CALLBACK_URL,
      code_verifier: 'challenge', // Same as in your frontend
    });

    try {
        const response = await fetch('https://api.twitter.com/2/oauth2/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: body.toString(),
        });
    
        const data = await response.json();
        res.json(data); // Send the token data back to the client
      } catch (error) {
        console.error('Error exchanging token:', error);
        res.status(500).json({ error: 'Failed to exchange token' });
      }
    });
    
    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('I am good')
    });