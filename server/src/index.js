const { createConnection } = require('./db');
const app = require('./app');
const port = process.env.PORT || 5050;

createConnection().then(() =>
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  })
);
