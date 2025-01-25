import { useState } from "react";

export default function AddStartup() {
  const [form, setForm] = useState({
    heading: "",
    description: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/startups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      alert("Startup added successfully!");
      setForm({ heading: "", description: "", image: "" });
    } else {
      alert("Error adding startup.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add a New Startup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Heading:
          <input
            type="text"
            value={form.heading}
            onChange={(e) => setForm({ ...form, heading: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="url"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            required
          />
        </label>
        <br />
        <button type="submit">Add Startup</button>
      </form>
    </div>
  );
}
