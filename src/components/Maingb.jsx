import "bootstrap/dist/css/bootstrap.min.css";
function MainPage() {
  return (
    <div className="main-page">
      <nav className="navbar">
        <div className="container nav-container">
          <a href="#home" className="logo">
            Project Name
          </a>
          <ul className="nav-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
      <header className="hero">
        <div className="container hero-content">
          <h1 className="hero-title">Welcome</h1>
          <p className="hero-subtitle">
            This is a main page with a blue and white theme.
          </p>
          <button className="cta-button">Get Started</button>
        </div>
      </header>

      {/* 카드 섹션 */}
      <section className="features">
        <div className="container features-grid">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Feature One</h3>
              <p className="card-text">
                The user-friendly interface makes it easy to use.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Feature Two</h3>
              <p className="card-text">
                It operates smoothly with fast and stable performance.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Feature Three</h3>
              <p className="card-text">
                We provide secure functions for your safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="footer">
        <div className="container">
          <small>© 2025 Project Name. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;
