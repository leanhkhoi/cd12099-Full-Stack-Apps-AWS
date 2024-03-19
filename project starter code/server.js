import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util.js';



  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get("/filteredimage", async (req, res) => {
    const imageUrl = req.query.image_url;

    if (!imageUrl) {
        return res.status(400).json({ error: 'Missing image_url parameter' });
    }

    try {
        const imagePath = await filterImageFromURL(imageUrl);

        // Here, you might apply some image filtering or processing logic
        // For simplicity, let's just pipe the image back as it is
        
        // Send the filtered image back to the client
        res.sendFile(imagePath);
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Failed to process image' });
    }
  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
