require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
  })
);
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'kidsbrain-server', time: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);

app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'internal server error' });
});

const port = Number(process.env.PORT) || 3001;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`KidsBrain server listening on http://localhost:${port}`);
  });
}

module.exports = app;
