import { useState } from 'react';
import Link from 'next/link';

export default function Home({ startups: initialStartups }) {
  const [startups, setStartups] = useState(initialStartups);
  const [newStartup, setNewStartup] = useState({
    heading: '',
    description: '',
    image: '',
  });

  const handleLike = async (id) => {
    try {
      const response = await fetch('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        const { startups: updatedStartups } = await response.json();
        setStartups(updatedStartups);
      } else {
        console.error('Error liking startup.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleAddStartup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStartup),
      });

      if (response.ok) {
        const { startups: updatedStartups } = await response.json();
        setStartups(updatedStartups);
        setNewStartup({ heading: '', description: '', image: '' });
      } else {
        console.error('Error adding startup.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}> Startup India</h1>
        <p style={styles.tagline}>Empowering Ideas on Republic Day 🎉</p>
      </header>

      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h2 style={styles.heroTitle}>Celebrate Republic Day with Innovation</h2>
          <p style={styles.heroSubtitle}>
            Let's honor the spirit of freedom and entrepreneurship. Add your startup ideas today!
          </p>
        </div>
      </section>

      <section style={styles.addSection}>
  <h2 style={styles.sectionTitle}>Add a New Startup</h2>
  <div style={styles.formContainer}>
    <form onSubmit={handleAddStartup} style={styles.form}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Startup Name</label>
        <input
          type="text"
          value={newStartup.heading}
          onChange={(e) => setNewStartup({ ...newStartup, heading: e.target.value })}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Description</label>
        <textarea
          value={newStartup.description}
          onChange={(e) => setNewStartup({ ...newStartup, description: e.target.value })}
          required
          style={styles.textarea}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Image URL</label>
        <input
          type="text"
          value={newStartup.image}
          onChange={(e) => setNewStartup({ ...newStartup, image: e.target.value })}
          required
          style={styles.input}
        />
      </div>
      <button type="submit" style={styles.addButton}>
        Add Startup
      </button>
    </form>
  </div>
</section>

      <section style={styles.startupSection}>
        <h2 style={styles.sectionTitle}>Our Startups</h2>
        {startups.length === 0 ? (
          <p style={styles.noStartups}>No startups found. Be the first to add one!</p>
        ) : (
          <div style={styles.startupGrid}>
            {startups.map((startup) => (
              <div key={startup.id} style={styles.startupCard}>
                <Link href={`/startup/${startup.id}`}>
                  <h3 style={styles.startupHeading}>{startup.heading}</h3>
                  <img
                    src={startup.image}
                    alt={startup.heading}
                    style={styles.startupImage}
                  />
                </Link>
                <p style={styles.startupDescription}>{startup.description}</p>
                <div>
                  <button onClick={() => handleLike(startup.id)} style={styles.likeButton}>
                    ❤️ Like
                  </button>
                  <span style={styles.likeCount}>{startup.likes} Likes</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export async function getServerSideProps() {
  const fs = require('fs');
  const path = require('path');

  const filePath = path.join(process.cwd(), 'data', 'startups.json');
  let startups = [];
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    startups = JSON.parse(data);
  } catch (error) {
    console.error('Error reading startups.json:', error.message);
  }

  return {
    props: { startups: startups || [] },
  };
}

const styles = {
  page: {
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(to bottom, #FF9933, #fff, #138808)',
    minHeight: '100vh',
    color: '#333',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#FF9933',
  },
  tagline: {
    fontSize: '20px',
    color: '#138808',
    marginTop: '5px',
  },
  heroSection: {
    backgroundColor: '#fff',
    padding: '40px 20px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '30px',
  },
  heroContent: {
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#FF9933',
  },
  heroSubtitle: {
    fontSize: '18px',
    color: '#333',
  },
  addSection: {
    backgroundColor: '#FFFAF0',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '30px',
    maxWidth: '600px',
    margin: '0 auto', // Centering the section
  },
  sectionTitle: {
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#138808',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px',
    resize: 'none',
    height: '100px',
  },
  addButton: {
    padding: '12px 20px',
    backgroundColor: '#FF9933',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
    transition: 'background-color 0.3s ease',
  },
  addButtonHover: {
    backgroundColor: '#e68628',
  },
  startupSection: {
    padding: '20px',
  },
  startupGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  startupCard: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  startupHeading: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#FF9933',
  },
  startupImage: {
    width: '100%',
    borderRadius: '10px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  startupDescription: {
    fontSize: '14px',
    color: '#333',
  },
  likeButton: {
    padding: '8px 12px',
    backgroundColor: '#138808',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginRight: '10px',
  },
  likeCount: {
    fontSize: '14px',
    color: '#333',
  },
};
