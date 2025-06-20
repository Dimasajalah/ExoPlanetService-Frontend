import React, { useState, useEffect } from "react";

const NasaData = () => {
  const [photoData, setPhotoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPhoto() {
      setLoading(true);
      setError(null);
      const apiKey = "XiSafrU5DQRwEf2j2SPbdK34W8IiGX56m7DzGFoR";
      try {
        const res = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
        );
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        setPhotoData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPhoto();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <p style={styles.loadingText}>Loading NASA Astronomy Picture of the Day...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <p style={styles.errorText}>Error: {error}</p>
      </div>
    );
  }

  if (!photoData) return null;

  return (
    <main style={styles.mainContainer} aria-label="NASA Astronomy Picture of the Day">
      <section style={styles.imageSection}>
        <img
          src={photoData.url}
          alt={photoData.title || "NASA Astronomy Picture"}
          style={styles.image}
          loading="lazy"
        />
      </section>

      <section style={styles.infoSection}>
        <h1 style={styles.title}>{photoData.title}</h1>
        <time dateTime={photoData.date} style={styles.date}>
          {photoData.date}
        </time>
        <p style={styles.description}>{photoData.explanation}</p>

        {photoData.hdurl && (
          <a
            href={photoData.hdurl}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.hdLink}
          >
            View HD Image
          </a>
        )}
      </section>
    </main>
  );
};

// Inline styles (you can move to CSS/SCSS)
const styles = {
  mainContainer: {
    maxWidth: 960,
    margin: "2rem auto",
    padding: "1rem",
    background:
      "linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
    color: "#222",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  imageSection: {
    textAlign: "center",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
    marginBottom: "1rem",
    transition: "opacity 0.6s ease-in-out",
  },
  infoSection: {
    padding: "1rem",
    lineHeight: 1.6,
  },
  title: {
    fontSize: "2rem",
    marginBottom: "0.25rem",
    color: "#043927",
  },
  date: {
    fontSize: "0.9rem",
    fontStyle: "italic",
    color: "#0a5a32",
    marginBottom: "1rem",
    display: "block",
  },
  description: {
    fontSize: "1.1rem",
    marginBottom: "1.5rem",
    color: "#1a2f1a",
  },
  hdLink: {
    display: "inline-block",
    padding: "0.5rem 1rem",
    backgroundColor: "#1b5e20",
    color: "#a5d6a7",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
  },
  loadingContainer: {
    textAlign: "center",
    padding: "2rem",
  },
  loadingText: {
    fontSize: "1.25rem",
    color: "#555",
  },
  errorContainer: {
    textAlign: "center",
    padding: "2rem",
    backgroundColor: "#ffe5e5",
    borderRadius: "12px",
    margin: "2rem auto",
    maxWidth: 600,
  },
  errorText: {
    color: "#b00020",
    fontWeight: "600",
  },
};

export default NasaData;

