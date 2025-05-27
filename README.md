
# Naveen Pawar - Interactive Hacker Portfolio

Welcome to my personal portfolio, designed with a hacker-style interface! This project showcases my resume, skills, and a collection of utility tools.

**Live Demo:** [https://naveenpawarx.github.io/my_portfolio/](https://naveenpawarx.github.io/my_portfolio/)

## Description

This is a dynamic, single-page application built with React. It serves as an interactive resume and a playground for various web-based tools. The aesthetic is inspired by classic terminal interfaces, aiming for a unique and engaging user experience.

## Features

*   **Interactive Resume:** Detailed sections for summary, experience, skills, education, projects, and certifications, presented in a "terminal window" style.
*   **OSINT Tool (Simulated):** A tool to simulate an Open Source Intelligence scan based on fictional inputs, generating a mock report locally.
*   **Hash Lookup Utility (Simulated):** Enter a hash to query simulated public databases.
*   **Base Converter:** Convert numbers between Binary, Octal, Decimal, and Hexadecimal.
*   **Image EXIF Viewer (Simulated):** Upload an image to view its basic information and simulated EXIF metadata.
*   **Breach Check (Simulated):** Check fictional email addresses, phone numbers, or usernames against a mock breach database.
*   **Secure Drop/Contact Form:** A themed contact form that prepares a `mailto:` link.
*   **NP-OS (Simulated OS):** A fun, interactive simulated operating system environment with basic commands.
*   Responsive design with a hacker-themed aesthetic.

## Technologies Used

*   **React 19:** For building the user interface (loaded via CDN through `esm.sh`).
*   **React Router DOM v7:** For client-side routing (loaded via CDN through `esm.sh`).
*   **TypeScript:** For type safety and improved developer experience (transpiled on-the-fly by `esm.sh`).
*   **Tailwind CSS:** For styling the application (loaded via CDN).
*   **`esm.sh`:** Used as a CDN to serve React, React Router, and also to transpile `.tsx` files directly from the GitHub repository for the live deployment.
*   **HTML5 & CSS3:** Base structure and custom styling.
*   **Git & GitHub:** For version control and hosting.
*   **GitHub Pages:** For deploying the live application.

## Running Locally

Since this project is built as a static site with dependencies loaded via CDNs and modules handled by `esm.sh` (especially for the live version), the simplest way to "run" it locally is to open the `index.html` file in a modern web browser.

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone https://github.com/naveenpawarx/my_portfolio.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd my_portfolio
    ```
3.  **Open `index.html`:**
    Right-click on the `index.html` file and choose "Open with" your preferred web browser.

**Note on Local Module Loading:**
Modern browsers have security restrictions when loading ES modules directly from the local file system (`file:///` protocol). While `index.html` is configured to load the main script from `esm.sh` (fetching from GitHub), which generally works, some browsers might still have issues with other local module aspects if you were to try and change `esm.sh/gh/...` paths to local relative paths for development.

For the most accurate local experience mirroring the deployment, or if you encounter issues with `file:///` module loading, you can use a simple local HTTP server. Many tools can do this, for example, if you have Python installed:
```bash
# In your project root directory (my_portfolio)
python -m http.server
```
Then open `http://localhost:8000` (or whatever port it indicates) in your browser.

However, for quick viewing, directly opening `index.html` should generally work due to the `esm.sh/gh/...` path for the main script.

## Deployment

This project is automatically deployed using **GitHub Pages**.
Any push to the `main` branch (or `master`, depending on your default branch) will trigger a new deployment. The site is then served from the `/docs` folder or the root of the `main` branch as configured in the repository settings.

The live version uses `esm.sh` to fetch and transpile the `index.tsx` file (and its imported `.tsx` modules) directly from the GitHub repository.

## Project Structure (Key Files)

```
my_portfolio/
├── index.html            # Main HTML entry point, includes importmap and loads index.tsx
├── index.tsx             # Main React application bootstrap
├── App.tsx               # Root React component, defines routing
├── constants.ts          # Site-wide constants (resume data, nav links, styles)
├── types.ts              # TypeScript type definitions
├── metadata.json         # Basic app metadata
├── components/           # Reusable React components (Navbar, Footer, TerminalWindow, etc.)
├── pages/                # Page-level components for different routes
└── README.md             # This file
```

## Author

**Naveen Pawar**

---

*This portfolio was created by Naveen Pawar to showcase skills and projects in an interactive format.*
