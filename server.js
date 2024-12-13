const app = require('./app');
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Swerver is running on http://localhost:${PORT}`);
});