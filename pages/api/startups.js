import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "startups.json");

export default function handler(req, res) {
  if (req.method === "GET") {
    const data = fs.readFileSync(filePath, "utf8");
    const startups = JSON.parse(data || "[]");
    res.status(200).json(startups);
  } else if (req.method === "POST") {
    const data = fs.readFileSync(filePath, "utf8");
    const startups = JSON.parse(data || "[]");

    const newStartup = req.body;
    newStartup.id = Date.now(); // Generate unique ID
    newStartup.likes = 0; // Initialize likes
    startups.push(newStartup);

    fs.writeFileSync(filePath, JSON.stringify(startups, null, 2));
    res.status(201).json({ message: "Startup added", startup: newStartup });
  } else if (req.method === "PATCH") {
    const data = fs.readFileSync(filePath, "utf8");
    const startups = JSON.parse(data || "[]");

    const { id, like } = req.body;
    const startupIndex = startups.findIndex((s) => s.id === id);

    if (startupIndex !== -1) {
      startups[startupIndex].likes += like ? 1 : -1;
      startups[startupIndex].likes = Math.max(0, startups[startupIndex].likes); // Prevent negative likes

      fs.writeFileSync(filePath, JSON.stringify(startups, null, 2));
      res.status(200).json({ message: "Startup updated", startup: startups[startupIndex] });
    } else {
      res.status(404).json({ message: "Startup not found" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
