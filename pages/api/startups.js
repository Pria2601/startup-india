let startups = [
    {
      id: 1737801332819,
      heading: "Tech Innovators",
      description: "A platform providing AI-powered tools to automate business processes.",
      image: "https://images.unsplash.com/photo-1536522971133-3b02a7e3ebc6",
      likes: 5,
    },
    // Add initial startup data here
  ];
  
  export default function handler(req, res) {
    if (req.method === "GET") {
      // Return all startups
      res.status(200).json(startups);
    } else if (req.method === "POST") {
      // Add a new startup
      const newStartup = req.body;
      newStartup.id = Date.now(); // Generate a unique ID
      startups.push(newStartup);
      res.status(201).json({ message: "Startup added successfully", startup: newStartup });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  }
  