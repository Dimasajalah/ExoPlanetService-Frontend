import React, { useEffect } from "react";
import "./style/style.css";
import "./js/main.js";
import "./js/api.js"
import "./js/utils.js"

function App() {
  useEffect(() => {
    // You can move your initialization logic here
    // Example: fetchApodData();
  }, []);

  return (
    <div className="container-col">
      {/* Modal */}
      <div className="modal-img" id="modal" style={{ display: "none" }}>
        <button className="main-btn -fill-up -close" id="close-modal" type="button" title="Close">
          &#10005;
        </button>
        <img className="media" id="modal-img" src="#" alt="#" />
      </div>

      {/* Header */}
      <header className="header-container">
        <nav className="nav">
          <a className="logo" href="./">apod</a>
          <ul className="menu">
            <li>
              <button className="link" id="random-header" type="button" title="Click to load a random picture">
                Random Picture
              </button>
            </li>
            <li>
              <a className="link" href="#about">About</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Section */}
      <main className="main-section -bg-img">
        <h1 className="section-title">
          <span className="highlight">A</span>stronomy <span className="highlight">P</span>icture <span className="highlight">o</span>f the <span className="highlight">D</span>ay
        </h1>

        <section className="wrapper-content">
          <figure className="figure">
            <figcaption>
              <strong>Day:</strong> <u id="date"></u>
            </figcaption>
            <img className="media" id="media-img" src="#" alt="#" title="Click to see the full image" />
            <iframe className="media" id="media-video" src="#" frameBorder="0" allowFullScreen style={{ display: "none" }}></iframe>
          </figure>

          <div className="main-content">
            <article className="content">
              <h3 className="title" id="title"></h3>
              <p className="explanation">
                <strong>Explanation:</strong>
                <span id="explanation"></span>
              </p>
              <p className="credits" style={{ display: "none" }}>
                <strong>Credits:</strong> <ins id="copy-owner"></ins>
              </p>
            </article>

            {/* Date Form */}
            <form className="main-form" style={{ display: "none" }}>
              <legend className="title">Enter a valid date to get a picture of that specific day.</legend>
              <fieldset className="field">
                <label className="label" htmlFor="input-date">
                  Enter a date:
                </label>
                <input className="input" id="input-date" type="date" name="date" min="1995-06-16" required />
                <button className="main-btn -full -fill-up" type="submit">
                  Send
                </button>
              </fieldset>
              <p className="error" id="error" style={{ display: "none" }}>Mensagem de erro</p>
            </form>

            {/* Buttons */}
            <div className="buttons">
              <button className="main-btn -full -fill-up" id="go-to-form" type="button">
                Choose a day
              </button>
              <a className="main-btn -full -fill-up" id="hdr-img" href="#" target="_blank" rel="external" title="Click here to see a higher quality image" style={{ display: "none" }}>
                See HDR image
              </a>
              <button className="main-btn -full -fill-up" id="back-btn" type="button" style={{ display: "none" }}>
                &larr; Back to current day
              </button>
              <button className="main-btn -full -fill-up" id="random" type="button" title="Click to choose a random picture" style={{ display: "none" }}>
                Random picture
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* About Section */}
      <section className="main-section" id="about">
        <h2 className="section-title">About</h2>
        <div className="wrapper-about">
          <p className="about">
            <strong>Discover the cosmos!</strong> Since <ins>June 16, 1995</ins>, each day of our fascinating universe is
            featured, along with a brief explanation written by a professional astronomer.
          </p>
          <p className="about -small -box">
            <strong className="title"><u className="title">About image permissions:</u></strong>
            All the images on the <strong>APOD</strong> page are credited to the owner or institution where they originated. Some of
            the images are copyrighted to use these pcitures publicly or commercially one must write to the owners for permission.
            For the copyrighted images, the copyright owner is identified in the APOD credit line (please see the copyright owener
            name afther the explanation). NASA images are in the public domain, official guidelines for their use can be found <a className="main-link" href="http://www.nasa.gov/audience/formedia/features/MP_Photo_Guidelines.html" target="_blank" rel="noopener external">here</a>.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-container">
        <p className="copyright">
          <a className="main-link" href="https://github.com/willy-r" target="_blank" rel="noreferrer noopener external">William Rodrigues</a>
          &copy; <span id="year"></span> - All rights reserved
        </p>
        <p className="credits">
          Website made for study purposes, inspired in the <a className="main-link" href="https://apod.nasa.gov/apod/astropix.html" target="_blank" rel="noopener external">original APOD website</a>, by <a className="main-link" href="https://api.nasa.gov/" target="_blank" rel="noopener external"><strong>NASA API</strong></a>.
        </p>
      </footer>
    </div>
  );
}

export default App;
