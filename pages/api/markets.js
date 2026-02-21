export default async function handler(req, res) {
  try {
    const response = await fetch('https://gamma-api.polymarket.com/markets', {
      headers: {
        'Accept': 'application/json',
      }
    });
    
    const data = await response.json();
    
    const activeMarkets = data
      .filter(m => m.active === true && m.closed === false && m.archived === false)
      .slice(0, 50);
    
    res.status(200).json(activeMarkets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch markets' });
  }
}
