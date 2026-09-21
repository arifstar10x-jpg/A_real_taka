const crypto = require('crypto');

const ADSGRAM_SECRET_KEY = process.env.ADSGRAM_SECRET_KEY || 'YOUR_ADSGRAM_SECRET_KEY';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userid, reward, signature } = req.body;

    const hash = crypto
      .createHmac('sha256', ADSGRAM_SECRET_KEY)
      .update(`${userid}:${reward}`)
      .digest('hex');

    if (hash !== signature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    console.log(`Granting ${reward} coins to Telegram User ID: ${userid}`);
    
    return res.status(200).json({ status: 'success' });
  }

  res.status(405).json({ message: 'Method not allowed' });
}
