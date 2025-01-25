import Link from 'next/link';

export default function StartupDetails({ startup }) {
  if (!startup) {
    return <p>Startup not found.</p>;
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h1 style={styles.heading}>{startup.heading}</h1>
        <img
          src={startup.image}
          alt={startup.heading}
          style={styles.image}
        />
        <p style={styles.description}>{startup.description}</p>
        <Link href="/">
          <button style={styles.backButton}>Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
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

  const startup = startups.find((item) => item.id.toString() === params.id);

  return {
    props: { startup: startup || null },
  };
}

const styles = {
  pageContainer: {
    backgroundColor: '#FFFAF0',
    padding: '40px',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '30px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '80%',
    maxWidth: '800px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '36px',
    color: '#138808',
    marginBottom: '15px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  image: {
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  description: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '30px',
    lineHeight: '1.5',
  },
  backButton: {
    padding: '12px 20px',
    backgroundColor: '#FF9933',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
};
