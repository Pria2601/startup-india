import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const filePath = path.join(process.cwd(), 'data', 'startups.json');
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const startups = JSON.parse(data);

      const newStartup = {
        id: startups.length + 1, // Assign a unique ID
        ...req.body,
        likes: 0, // Initialize likes to 0
      };

      startups.push(newStartup);

      fs.writeFileSync(filePath, JSON.stringify(startups, null, 2)); // Save to file

      res.status(200).json({ startups });
    } catch (error) {
      console.error('Error writing to startups.json:', error.message);
      res.status(500).json({ message: 'Error saving startup.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
