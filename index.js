const express = require('express');
const cors = require('cors');
const filmsRoutes = require('./routes/films');
const peopleRoutes = require('./routes/people');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use('/api/films', filmsRoutes);
app.use('/api/people', peopleRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
