import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const CLEANURI_API_URL = 'https://cleanuri.com/api/v1/shorten';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


//Initializing the server
app.listen(port , () => {
    console.log(`Server is listening on port ${port}`);
});


app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/", async(req,res) => {
    try {
        // Make a POST request to the CleanURI API to shorten the URL
        const inputURL = req.body.URL;
        const response = await axios.post(
            CLEANURI_API_URL,
            {url: inputURL},
            {
                headers: {
                  'Content-Type': 'application/json', // Set content type to JSON
                },
              }
        );
        const shortURL = response.data.result_url;

        //Renders the shortend URL
        res.render("index.ejs",  {shortUrl: shortURL});
    } catch (error) {
        console.error('Error shortening URL:', error.response?.data || error.message);
    }
});