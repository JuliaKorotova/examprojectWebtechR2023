// const express = require('express');
// const app = express();
// const port = 3000;
// const cors = require('cors'); // добавили cors
// app.use(express.static('public'));
//
// app.get('/api/data', (req, res) => {
//     res.sendFile(__dirname + '/public/data.json');
// });
//
// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
//
// });

const express = require('express');
const cors = require('cors'); // добавили cors
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(cors()); // использовали cors

app.get('/api/data', (req, res) => {
    res.sendFile(__dirname + '/public/data.json');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
