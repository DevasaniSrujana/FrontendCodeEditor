const express = require('express');
const simpleGit = require('simple-git');
const bodyParser = require('body-parser');

const app = express();
const git = simpleGit();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS (if React app is served from a different origin)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Endpoint to commit changes
app.post('/api/commit', async (req, res) => {
    const { editorName, value, language, message } = req.body;

    try {
        // Assuming you want to commit all changes in the repository
        await git.add('./*');
        await git.commit(`${message} (${editorName}, ${language})`);
        res.json({ success: true, message: 'Changes committed successfully' });
    } catch (error) {
        console.error('Error committing changes:', error);
        res.status(500).json({ success: false, message: 'Error committing changes' });
    }
});

// Start the server
const port = process.env.PORT || 5173;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
