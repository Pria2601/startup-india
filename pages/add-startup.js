import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function AddStartup() {
  const [form, setForm] = useState({ heading: '', description: '', image: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/startups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/'); // Redirect back to home page
    } else {
      alert('Failed to add startup');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add Your Startup</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Startup Name"
          value={form.heading}
          onChange={(e) => setForm({ ...form, heading: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
