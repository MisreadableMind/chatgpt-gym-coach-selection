const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;
const COACHES = {};

// Use the cors middleware to enable CORS
app.use(cors({
    origin: [
        `http://localhost:${PORT}`,
        'https://chat.openai.com'
    ]
}));

// Add a route to get all todos
app.get('/coaches', (req, res) => {
    res.json(COACHES);
});

// Add a route to get all todos for a specific user
app.get('/coaches/:username', (req, res) => {
    const { username } = req.params;
    const coaches = COACHES[username] || [];
    res.json(coaches);
});

// Add a route to add a todo for a specific user
app.post('/coaches/:username', (req, res) => {
    const { username } = req.params;
    const { todo } = req.body;
    coaches[username] = coaches[username] || [];
    coaches[username].push(todo);
    res.json({ status: 'success' });
});

// Add a route to delete a todo for a specific user
app.delete('/coaches/:username', (req, res) => {
    const { username } = req.params;
    const { user_id } = req.body;
    COACHES[username] = COACHES[username] || [];
    COACHES[username] = COACHES[username].filter((user) => user.user_id !== user_id);

    res.json({ status: 'success' });
});

// Add a route to serve the plugin logo
app.get('/logo.png', (req, res) => {
    const filename = 'logo.png';
    res.type('png').sendFile(filename);
});

// Add a route to serve the plugin manifest
app.get('/.well-known/ai-plugin.json', (req, res) => {
    const host = req.headers.host;
    const text = fs.readFileSync('manifest.json', 'utf8').replace('PLUGIN_HOSTNAME', `https://${host}`);
    res.type('json').send(text);
});

// Add a route to serve the OpenAPI spec
app.get('/openapi.yaml', (req, res) => {
    const host = req.headers.host;
    const text = fs.readFileSync('openapi.yaml', 'utf8').replace('PLUGIN_HOSTNAME', `https://${host}`);
    res.type('yaml').send(text);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
