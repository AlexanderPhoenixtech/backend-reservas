const express = require('express');
// const fetch = require('node-fetch');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/shopify-orders', async (req, res) => {
  const fetch = (await import('node-fetch')).default
  const { shopUrl, accessToken, query } = req.body;
  const shopifyUrl = `${shopUrl}/admin/api/2025-01/graphql.json`;

  try {
    const response = await fetch(shopifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(  error)
    res.status(500).json({ error: 'Error fetching from Shopify', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));