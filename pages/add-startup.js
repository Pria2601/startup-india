import { useState } from "react";
import Link from "next/link";

export default function AddStartup() {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  async function addStartup() {
    if (!heading || !description || !image) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    const newStartup = {
      heading,
      description,
      image,
      likes: 0, // Default likes
    };

    try {
      const res = await fetch("/api/startups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStartup),
      });

      if (res.ok) {
        alert("Startup added successfully!");
        setHeading("");
        setDescription("");
        setImage("");
      } else {
        alert("Failed to add the startup.");
      }
    } catch (error) {
      console.error("Error adding startup:", error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-white to-orange-500 p-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Add Your Startup
      </h1>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Heading</label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter startup name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter a short description"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter an image URL"
          />
        </div>
        <button
          onClick={addStartup}
          disabled={loading}
          className={`w-full py-2 px-4 text-white rounded ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding..." : "Add Startup"}
        </button>
        <Link href="/">
          <button className="w-full mt-4 py-2 px-4 text-white bg-gray-500 rounded hover:bg-gray-700">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
