const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'dist/food-ordering-frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/food-ordering-frontend/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
