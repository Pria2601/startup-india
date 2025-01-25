import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    fetch("/api/startups")
      .then((res) => res.json())
      .then((data) => setStartups(data));
  }, []);

  const handleLikeDislike = async (id, like) => {
    const response = await fetch("/api/startups", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, like }),
    });

    if (response.ok) {
      const updatedStartup = await response.json();
      setStartups((prev) =>
        prev.map((startup) =>
          startup.id === id ? updatedStartup.startup : startup
        )
      );
    }
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Startup Showcase</h1>
        <p style={styles.headerSubtitle}>
          Explore amazing startups and celebrate innovation this Republic Day!
        </p>
        <Link href="/add-startup">
          <button style={styles.addStartupButton}>Add a New Startup</button>
        </Link>
      </header>

      {/* Startups List */}
      <div style={styles.startupsGrid}>
        {startups.map((startup) => (
          <div key={startup.id} style={styles.startupCard}>
            <img
              src={startup.image}
              alt={startup.heading}
              style={styles.startupImage}
            />
            <h2 style={styles.startupHeading}>{startup.heading}</h2>
            <p style={styles.startupDescription}>
              {startup.description.length > 100
                ? `${startup.description.slice(0, 100)}...`
                : startup.description}
            </p>
            <div style={styles.cardActions}>
              <div>
                <p style={styles.likesText}>
                  Likes: <strong>{startup.likes}</strong>
                </p>
                <button
                  style={styles.likeButton}
                  onClick={() => handleLikeDislike(startup.id, true)}
                >
                  Like
                </button>
                <button
                  style={styles.dislikeButton}
                  onClick={() => handleLikeDislike(startup.id, false)}
                >
                  Dislike
                </button>
              </div>
              <Link href={`/startup/${startup.id}`}>
                <button style={styles.viewDetailsButton}>View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Styles Object
const styles = {
  container: {
    backgroundColor: "#f8f8f8",
    padding: "20px",
    fontFamily: "'Roboto', sans-serif",
  },
  header: {
    textAlign: "center",
    backgroundColor: "#ff9933", // Orange color
    color: "white",
    padding: "20px 0",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  headerTitle: {
    margin: 0,
    fontSize: "28px",
  },
  headerSubtitle: {
    marginTop: "10px",
    fontSize: "16px",
  },
  addStartupButton: {
    padding: "10px 20px",
    backgroundColor: "#128807", // Green color
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  startupsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  startupCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "15px",
  },
  startupImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  startupHeading: {
    margin: "0 0 10px",
    fontSize: "20px",
  },
  startupDescription: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  likesText: {
    margin: 0,
    fontSize: "14px",
  },
  likeButton: {
    marginRight: "5px",
    backgroundColor: "#ff9933",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    padding: "5px 10px",
  },
  dislikeButton: {
    backgroundColor: "#128807",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    padding: "5px 10px",
  },
  viewDetailsButton: {
    backgroundColor: "#000080", // Navy blue
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    padding: "5px 10px",
  },
};

