import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { id } = req.body;

    const filePath = path.join(process.cwd(), 'data', 'startups.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const startups = JSON.parse(data);

    // Find the startup and increment its likes
    const startup = startups.find((s) => s.id === id);
    if (startup) {
      startup.likes += 1;
      fs.writeFileSync(filePath, JSON.stringify(startups, null, 2), 'utf8');
      return res.status(200).json({ success: true, startups });
    }

    return res.status(404).json({ success: false, message: 'Startup not found' });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
