import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.text}>Oops! The page you are looking for does not exist.</p>
      <Link to="/" style={styles.link}>Go back home</Link>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: "8rem",
    margin: 0,
    color: "#ff6b6b",
  },
  text: {
    fontSize: "1.5rem",
    margin: "20px 0",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#1e90ff",
    padding: "10px 20px",
    borderRadius: "5px",
    transition: "0.3s",
  },
};

export default NotFound;
