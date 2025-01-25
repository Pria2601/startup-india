import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'startups.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    const data = fs.readFileSync(filePath, 'utf8');
    res.status(200).json(JSON.parse(data));
  } else if (req.method === 'POST') {
    const { heading, description, image } = req.body;

    if (!heading || !description || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const startups = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const newStartup = { id: Date.now(), heading, description, image };
    startups.push(newStartup);

    fs.writeFileSync(filePath, JSON.stringify(startups, null, 2));
    res.status(201).json({ message: 'Startup added successfully', newStartup });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
