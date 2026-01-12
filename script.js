(function () {
  const screen = document.getElementById("screen");
  const state = {
    user: "bhanusaini",
    host: "iitm",
    path: "~",
    history: [],
    historyIndex: -1,
    data: null, // To store fetched JSON data
  };

  // Fetch data on init
  fetch("./assets/projects.json")
    .then((res) => res.json())
    .then((data) => {
      state.data = data;
    })
    .catch((err) => {
      console.error("Failed to load project data:", err);
      print("Error loading data. Some commands may not work.", "red");
    });

  function renderAboutMe() {
    print(
      "┌─────────────────────────── ABOUT ───────────────────────────┐",
      ""
    );
    print(
      '│ Name: <span class="accent">Bhanu Pratap Saini</span>                                    │',
      ""
    );
    print(
      '│ Role: <span class="accent">Web Developer | Data Analyst | Game Dev</span>              │',
      ""
    );
    print(
      '│ Location: <span class="accent">India (IIT Madras)</span>                              │',
      ""
    );
    print(
      "└─────────────────────────────────────────────────────────────┘",
      ""
    );

    printBranch("Information", [
      {
        name: "About",
        descriptions: [
          'Passionate <span class="yellow">Web Developer</span> and Aspiring <span class="yellow">Gen AI Engineer</span>',
          'Currently pursuing <span class="yellow">Data Science at IIT Madras</span>',
          "Building modern, interactive web apps and exploring AI frontiers",
        ],
      },
      {
        name: "Tech Stack",
        descriptions: [
          'Web: <span class="yellow">HTML, CSS, JavaScript, TypeScript, React, Next.js, TailwindCSS</span>',
          'Backend: <span class="yellow">Node.js, Flask, Python, PostgreSQL</span>',
          'Data: <span class="yellow">pandas, numpy, Streamlit, Plotly, Tableau</span>',
          'Game Dev: <span class="yellow">HTML5 Canvas, Three.js, JavaScript</span>',
          'Tools: <span class="yellow">Git, GSAP, Figma, VS Code</span>',
        ],
      },
      {
        name: "Interests",
        descriptions: [
          'Creating the <span class="yellow">best possible UI/UX</span> even for technical products',
          'Building <span class="yellow">AI-powered applications</span> and data dashboards',
          'Crafting <span class="yellow">immersive browser games</span>',
        ],
      },
      {
        name: "Working Principles",
        descriptions: [
          'User-first - build features that <span class="yellow">benefit users, not just developers</span>',
          'Clean code - write <span class="yellow">maintainable and readable code</span>',
          'Continuous learning - always <span class="yellow">exploring new technologies</span>',
        ],
      },
      {
        name: "Contact",
        descriptions: [
          'Email: <span class="accent">bhanupsaini2024@gmail.com</span>',
          'LinkedIn: <a href="https://www.linkedin.com/in/bhanu-saini-3bb251391" target="_blank" class="accent">Bhanu Saini</a>',
          'GitHub: <a href="https://github.com/bhanu2006-24" target="_blank" class="accent">bhanu2006-24</a>',
        ],
      },
    ]);
  }

  function promptText() {
    return `<span class="prompt glow">${state.user}@${state.host}</span>:<span class="accent">${state.path}</span>$`;
  }

  function focusCmd() {
    const cmd = document.getElementById("cmd");
    if (cmd) {
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(cmd);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
      cmd.focus();
    }
  }

  function appendPrompt() {
    const wrap = document.createElement("div");
    wrap.className = "line prompt-line";
    wrap.innerHTML = `
      <div>${promptText()}</div>
      <div id="cmd" contenteditable="true" spellcheck="false"></div>
    `;
    screen.appendChild(wrap);
    screen.scrollTop = screen.scrollHeight;
    focusCmd();
  }

  function print(text, cls) {
    const div = document.createElement("div");
    div.className = "line" + (cls ? " " + cls : "");
    div.innerHTML = text;
    screen.appendChild(div);
    screen.scrollTop = screen.scrollHeight;
  }

  function printBranch(title, items) {
    print(title + ":", "yellow");
    print("", "");
    items.forEach((obj) => {
      print(obj.name, "tree-branch");
      if (obj.descriptions) {
        obj.descriptions.forEach((d) => {
          print("- " + d, "tree-sub");
        });
      }
      else if (obj.items) {
          obj.items.forEach((d) => {
            const parts = d.split(':');
            if(parts.length > 1) {
                print(`- <span class="yellow">${parts[0]}:</span>${parts.slice(1).join(':')}`, "tree-sub");
            } else {
                print("- " + d, "tree-sub");
            }
          });
      }
      print("", "");
    });
  }

  function handleCommand(input) {
    const cmd = input.trim().toLowerCase();
    
    // Commands that don't depend on data
    if (cmd === "help") {
      print(
        [
          '<span class="yellow">━━━━━━━━━━━━━━━━ AVAILABLE COMMANDS ━━━━━━━━━━━━━━━━</span>',
          "",
          '<span class="accent">Navigation</span>',
          "  help             Show all commands",
          "  about            Info about Bhanu Pratap Saini",
          "  portfolio        Open specialized portfolios (LIVE)",
          "",
          '<span class="accent">Skills & Projects</span>',
          "  skills           List of technical skills",
          "  webdev           Web Development projects",
          "  data             Data Analysis & Science projects",
          "  games            Game Development projects",
          "",
          '<span class="accent">Info & Downloads</span>',
          "  edu              Show education info",
          "  resume           Download resumes (by domain)",
          "  links            Important links & socials",
          "",
          '<span class="accent">Utilities</span>',
          "  quote            Print a motivational quote",
          "  clear            Clear the screen",
          "",
          '<span class="yellow">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>',
        ].join("\n")
      );
      return;
    }
    
    if (cmd === "about") {
      renderAboutMe();
      return;
    }

    if (cmd === "links") {
        print('<span class="yellow">Important Links:</span>', "");
        print("", "");
        print(
          '  📧 Email: <a href="mailto:bhanupsaini2024@gmail.com" class="accent">bhanupsaini2024@gmail.com</a>',
          ""
        );
        print(
          '  💼 LinkedIn: <a href="https://www.linkedin.com/in/bhanu-saini-3bb251391" target="_blank" class="accent">Bhanu Saini</a>',
          ""
        );
        print(
          '  🐙 GitHub: <a href="https://github.com/bhanu2006-24" target="_blank" class="accent">bhanu2006-24</a>',
          ""
        );
        print(
          '  📊 Tableau: <a href="https://public.tableau.com/app/profile/bhanu.saini6988/vizzes" target="_blank" class="accent">Tableau Public</a>',
          ""
        );
        print(
          '  🖥️ OS Portfolio: <a href="https://bhanu2006-24.github.io/bhanu2006-24/" target="_blank" class="accent">Interactive Portfolio</a>',
          ""
        );
        return;
    }

    if (cmd === "quote") {
        const quotes = [
          '"The only way to do great work is to love what you do." – Steve Jobs',
          '"Code is like humor. When you have to explain it, it\'s bad." – Cory House',
          '"First, solve the problem. Then, write the code." – John Johnson',
          '"Building intelligent systems with data, code, and curiosity." – Bhanu Saini',
          '"The best way to predict the future is to create it." – Peter Drucker',
        ];
        print(quotes[Math.floor(Math.random() * quotes.length)], "muted");
        return;
    }

    if (cmd === "clear") {
        while (screen.firstChild) {
          screen.removeChild(screen.firstChild);
        }
        return;
    }

    if (cmd === "") return;

    // Check if data is loaded for other commands
    if (!state.data) {
        print("Data is still loading... please try again in a moment.", "red");
        return;
    }

    switch (cmd) {
      case "skills":
        printBranch("Technical Skills", state.data.skills);
        break;
      case "webdev":
        printBranch("Web Development Projects", state.data.webdev);
        break;
      case "data":
        printBranch("Data Analysis & Science Projects", state.data.data);
        break;
      case "games":
        printBranch("Game Development Projects", state.data.games);
        break;
      case "edu":
             print("Education:", "yellow");
             print("", "");
             state.data.edu.forEach((obj) => {
               print(obj.name, "tree-branch");
               obj.details.forEach((d) => {
                 print("- " + d, "tree-sub");
               });
               print("", "");
             });
        break;
      case "portfolio":
        print(
          '<span class="yellow">━━━━━━━━━━━━━━━━ LIVE PORTFOLIOS ━━━━━━━━━━━━━━━━</span>',
          ""
        );
        print("", "");
        state.data.portfolios.forEach(p => {
             // Basic emoji mapping
             let icon = "🔗";
             if(p.name.includes("Game")) icon = "🎮";
             else if(p.name.includes("Web")) icon = "🌐";
             else if(p.name.includes("Data")) icon = "📊";
             else if(p.name.includes("Scientist")) icon = "🔬";
             else if(p.name.includes("Creative")) icon = "🎨";
             else if(p.name.includes("OS")) icon = "🖥️";
             else if(p.name.includes("Resume")) icon = "📄";

            print(
                `  ${icon} <a href="${p.url}" target="_blank" class="accent">${p.name}</a> <span class="muted">→ ${p.id}</span>`,
                ""
            );
        })
        break;
      case "resume":
        print(
          '<span class="yellow">━━━━━━━━━━━━━ DOWNLOAD RESUMES ━━━━━━━━━━━━━</span>',
          ""
        );
        print("", "");
        // We can reuse the portfolio links or hardcode the specific resume links since they are files
        // But let's check if we have them in the JSON? We put them in "portfolios" with ID "Resume Hub"
        // Let's print the specific ones we know exist, or maybe I should have added them to JSON.
        // For now, I'll keep the direct links but they could be in JSON too.
        // Actually, let's just stick to the specific resume links as they are distinct files.
         print(
          '  📊 <a href="https://bhanu2006-24.github.io/Resume/analyst-resume.html" target="_blank" class="accent">Data Analyst Resume</a>',
          ""
        );
        print(
          '  🔬 <a href="https://bhanu2006-24.github.io/Resume/datascience-resume.html" target="_blank" class="accent">Data Scientist Resume</a>',
          ""
        );
        print(
          '  🌐 <a href="https://bhanu2006-24.github.io/Resume/webdev-resume.html" target="_blank" class="accent">Web Developer Resume</a>',
          ""
        );
        print(
          '  🎮 <a href="https://bhanu2006-24.github.io/Resume/game-resume.html" target="_blank" class="accent">Game Developer Resume</a>',
          ""
        );
        print("", "");
        print(
          '<span class="muted">Tip: Each resume can be edited and downloaded as PDF!</span>',
          ""
        );
        break;
      default:
        print(
          `command not found: <span class="red">${cmd}</span>. Type <span class="yellow">help</span> for available commands.`
        );
    }
  }

  function lockLine(lineEl) {
    const input = lineEl.querySelector("#cmd");
    if (!input) return;
    const value = input.textContent;
    const frozen = document.createElement("div");
    frozen.className = "line";
    frozen.innerHTML = `${promptText()} ${escapeHtml(value)}`;
    lineEl.replaceWith(frozen);
    return value;
  }

  function escapeHtml(s) {
    return s.replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        }[c])
    );
  }

  screen.addEventListener("keydown", (e) => {
    const cmd = document.getElementById("cmd");
    if (!cmd) return;
    if (e.key === "Enter") {
      e.preventDefault();
      const line = cmd.closest(".prompt-line");
      const value = cmd.textContent;
      state.history.unshift(value);
      state.historyIndex = -1;
      const frozenValue = lockLine(line);
      handleCommand(frozenValue);
      appendPrompt();
    }
    // Arrow up for history
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        cmd.textContent = state.history[state.historyIndex];
        focusCmd();
      }
    }
    // Arrow down for history
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (state.historyIndex > 0) {
        state.historyIndex--;
        cmd.textContent = state.history[state.historyIndex];
        focusCmd();
      } else {
        state.historyIndex = -1;
        cmd.textContent = "";
      }
    }
  });

  screen.addEventListener("mousedown", () => setTimeout(focusCmd, 0));
  appendPrompt();
})();

  function renderAboutMe() {
    print(
      "┌─────────────────────────── ABOUT ───────────────────────────┐",
      ""
    );
    print(
      '│ Name: <span class="accent">Bhanu Pratap Saini</span>                                    │',
      ""
    );
    print(
      '│ Role: <span class="accent">Web Developer | Data Analyst | Game Dev</span>              │',
      ""
    );
    print(
      '│ Location: <span class="accent">India (IIT Madras)</span>                              │',
      ""
    );
    print(
      "└─────────────────────────────────────────────────────────────┘",
      ""
    );

    printBranch("Information", [
      {
        name: "About",
        descriptions: [
          'Passionate <span class="yellow">Web Developer</span> and Aspiring <span class="yellow">Gen AI Engineer</span>',
          'Currently pursuing <span class="yellow">Data Science at IIT Madras</span>',
          "Building modern, interactive web apps and exploring AI frontiers",
        ],
      },
      {
        name: "Tech Stack",
        descriptions: [
          'Web: <span class="yellow">HTML, CSS, JavaScript, TypeScript, React, Next.js, TailwindCSS</span>',
          'Backend: <span class="yellow">Node.js, Flask, Python, PostgreSQL</span>',
          'Data: <span class="yellow">pandas, numpy, Streamlit, Plotly, Tableau</span>',
          'Game Dev: <span class="yellow">HTML5 Canvas, Three.js, JavaScript</span>',
          'Tools: <span class="yellow">Git, GSAP, Figma, VS Code</span>',
        ],
      },
      {
        name: "Interests",
        descriptions: [
          'Creating the <span class="yellow">best possible UI/UX</span> even for technical products',
          'Building <span class="yellow">AI-powered applications</span> and data dashboards',
          'Crafting <span class="yellow">immersive browser games</span>',
        ],
      },
      {
        name: "Working Principles",
        descriptions: [
          'User-first - build features that <span class="yellow">benefit users, not just developers</span>',
          'Clean code - write <span class="yellow">maintainable and readable code</span>',
          'Continuous learning - always <span class="yellow">exploring new technologies</span>',
        ],
      },
      {
        name: "Contact",
        descriptions: [
          'Email: <span class="accent">bhanupsaini2024@gmail.com</span>',
          'LinkedIn: <a href="https://www.linkedin.com/in/bhanu-saini-3bb251391" target="_blank" class="accent">Bhanu Saini</a>',
          'GitHub: <a href="https://github.com/bhanu2006-24" target="_blank" class="accent">bhanu2006-24</a>',
        ],
      },
    ]);
  }

  function promptText() {
    return `<span class="prompt glow">${state.user}@${state.host}</span>:<span class="accent">${state.path}</span>$`;
  }

  function focusCmd() {
    const cmd = document.getElementById("cmd");
    if (cmd) {
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(cmd);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
      cmd.focus();
    }
  }

  function appendPrompt() {
    const wrap = document.createElement("div");
    wrap.className = "line prompt-line";
    wrap.innerHTML = `
      <div>${promptText()}</div>
      <div id="cmd" contenteditable="true" spellcheck="false"></div>
    `;
    screen.appendChild(wrap);
    screen.scrollTop = screen.scrollHeight;
    focusCmd();
  }

  function print(text, cls) {
    const div = document.createElement("div");
    div.className = "line" + (cls ? " " + cls : "");
    div.innerHTML = text;
    screen.appendChild(div);
    screen.scrollTop = screen.scrollHeight;
  }

  function printBranch(title, items) {
    print(title + ":", "yellow");
    print("", "");
    items.forEach((obj) => {
      print(obj.name, "tree-branch");
      obj.descriptions.forEach((d) => {
        print("- " + d, "tree-sub");
      });
      print("", "");
    });
  }

  function handleCommand(input) {
    const cmd = input.trim().toLowerCase();
    switch (cmd) {
      case "help":
        print(
          [
            '<span class="yellow">━━━━━━━━━━━━━━━━ AVAILABLE COMMANDS ━━━━━━━━━━━━━━━━</span>',
            "",
            '<span class="accent">Navigation</span>',
            "  help             Show all commands",
            "  about            Info about Bhanu Pratap Saini",
            "  portfolio        Open specialized portfolios (LIVE)",
            "",
            '<span class="accent">Skills & Projects</span>',
            "  skills           List of technical skills",
            "  webdev           Web Development projects",
            "  data             Data Analysis & Science projects",
            "  games            Game Development projects",
            "",
            '<span class="accent">Info & Downloads</span>',
            "  edu              Show education info",
            "  resume           Download resumes (by domain)",
            "  links            Important links & socials",
            "",
            '<span class="accent">Utilities</span>',
            "  quote            Print a motivational quote",
            "  clear            Clear the screen",
            "",
            '<span class="yellow">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>',
          ].join("\n")
        );
        break;
      case "about":
        renderAboutMe();
        break;
      case "skills":
        printBranch("Technical Skills", [
          {
            name: "Web Development",
            descriptions: [
              '<span class="yellow">Frontend:</span> HTML5, CSS3, JavaScript, TypeScript, React, Next.js',
              '<span class="yellow">Styling:</span> TailwindCSS, GSAP Animations, Three.js',
              '<span class="yellow">Backend:</span> Node.js, Flask, Python',
            ],
          },
          {
            name: "Data Analysis & Science",
            descriptions: [
              '<span class="yellow">Languages:</span> Python, SQL, PostgreSQL',
              '<span class="yellow">Libraries:</span> pandas, numpy, BeautifulSoup, Requests',
              '<span class="yellow">Visualization:</span> Streamlit, Plotly, Tableau, Matplotlib',
            ],
          },
          {
            name: "Game Development",
            descriptions: [
              '<span class="yellow">Technologies:</span> HTML5 Canvas, JavaScript, Three.js',
              '<span class="yellow">Genres:</span> RPG, Arcade, Top-down shooters, Maze games',
            ],
          },
          {
            name: "Tools & Platforms",
            descriptions: [
              '<span class="yellow">Version Control:</span> Git, GitHub',
              '<span class="yellow">Design:</span> Figma, Canva',
              '<span class="yellow">Deployment:</span> GitHub Pages, Vercel, Streamlit Cloud',
            ],
          },
        ]);
        break;
      case "webdev":
        printBranch("Web Development Projects", [
          {
            name: "GSOC Planner",
            descriptions: [
              "Frontend-first GSoC toolkit for discovering orgs and drafting proposals",
              'Tech: <span class="yellow">React, GitHub API, AI Assistant</span>',
              '<a href="https://github.com/bhanu2006-24/GSOC-planner" target="_blank" class="accent">View on GitHub →</a>',
            ],
          },
          {
            name: "GrooveWave",
            descriptions: [
              "SaaS music platform with React and data visualization",
              'Tech: <span class="yellow">React, SaaS, Data Viz</span>',
              '<a href="https://github.com/bhanu2006-24/groovewave" target="_blank" class="accent">View on GitHub →</a>',
            ],
          },
          {
            name: "Bhanu OS Portfolio",
            descriptions: [
              "MacOS Sequoia-inspired interactive portfolio with desktop-style UI",
              'Tech: <span class="yellow">React, TypeScript, macOS UI</span>',
              '<a href="https://bhanu2006-24.github.io/bhanu2006-24/" target="_blank" class="accent">View Live →</a>',
            ],
          },
          {
            name: "Krishna Books",
            descriptions: [
              "E-commerce bookstore website",
              'Tech: <span class="yellow">Web, E-commerce</span>',
              '<a href="https://github.com/bhanu2006-24/krishna-books" target="_blank" class="accent">View on GitHub →</a>',
            ],
          },
          {
            name: "RemoteNexus",
            descriptions: [
              "Remote work collaboration platform",
              'Tech: <span class="yellow">React, Node.js</span>',
              '<a href="https://github.com/bhanu2006-24/remotenexus" target="_blank" class="accent">View on GitHub →</a>',
            ],
          },
          {
            name: "MacBook Landing",
            descriptions: [
              "Apple MacBook Pro landing page clone with 3D laptop and GSAP animations",
              'Tech: <span class="yellow">React, Three.js, GSAP, TailwindCSS</span>',
              '<a href="https://github.com/bhanu2006-24/Macbook_Landing" target="_blank" class="accent">View on GitHub →</a>',
            ],
          },
          {
            name: "Krishna Templates",
            descriptions: [
              "Collection of 20+ responsive business website templates",
              'Tech: <span class="yellow">HTML, CSS, Responsive Design</span>',
              '<a href="https://github.com/bhanu2006-24/web_sample" target="_blank" class="accent">View Collection →</a>',
            ],
          },
          {
            name: "Atmosphere AI",
            descriptions: [
              "AI-powered weather analytics platform",
              'Tech: <span class="yellow">React, TypeScript, AI API</span>',
              '<a href="https://github.com/bhanu2006-24/atmosphere-ai" target="_blank" class="accent">View on GitHub →</a>',
            ],
          },
          {
            name: "NovaNews",
            descriptions: [
              "Premium news intelligence platform",
              'Tech: <span class="yellow">React 19, Vite, News API</span>',
              '<a href="https://github.com/bhanu2006-24/novanews" target="_blank" class="accent">View on GitHub →</a>',
            ],
          },
          {
            name: "Crypto Pulse",
            descriptions: [
              "Professional cryptocurrency analytics dashboard",
              'Tech: <span class="yellow">JavaScript, CoinGecko API</span>',
              '<a href="https://github.com/bhanu2006-24/crypto-pulse" target="_blank" class="accent">View on GitHub →</a>',
            ],
          },
        ]);
        break;
      case "data":
        printBranch("Data Analysis & Science Projects", [
          {
            name: "Crypto Analysis Suite",
            descriptions: [
              "Live cryptocurrency dashboard with CoinGecko API integration",
              'Tech: <span class="yellow">Python, Streamlit, Plotly</span>',
              '<a href="https://bs-crypto-analysis.streamlit.app" target="_blank" class="accent">Live Demo →</a> | <a href="https://github.com/bhanu2006-24/crypto-analysis" target="_blank" class="accent">GitHub →</a>',
            ],
          },
          {
            name: "IMDb Analytics Dashboard",
            descriptions: [
              "Interactive dashboard analyzing movies, cast, and genres",
              'Tech: <span class="yellow">Python, Plotly, Data Analysis</span>',
              '<a href="https://github.com/bhanu2006-24/imdb-analysis" target="_blank" class="accent">View on GitHub →</a>',
            ],
          },
          {
            name: "Steam Games Analytics",
            descriptions: [
              "End-to-end pipeline scraping Steam data with trend analysis",
              'Tech: <span class="yellow">Python, Scraping, Streamlit</span>',
              '<a href="https://github.com/bhanu2006-24/steam-analysis" target="_blank" class="accent">View on GitHub →</a>',
            ],
          },
          {
            name: "Trader Sentiment Analysis",
            descriptions: [
              "Bitcoin sentiment analysis correlating Fear & Greed Index with trader performance",
              'Tech: <span class="yellow">Python, Jupyter, Streamlit</span>',
              '<a href="https://github.com/bhanu2006-24/trader-sentiment-analysis" target="_blank" class="accent">View on GitHub →</a>',
            ],
          },
          {
            name: "Atmosphere AI",
            descriptions: [
              "AI-powered weather analytics platform",
              'Tech: <span class="yellow">AI, Web, Analytics</span>',
              '<a href="https://github.com/bhanu2006-24/atmosphere-ai" target="_blank" class="accent">View on GitHub →</a>',
            ],
          },
        ]);
        break;
      case "games":
        printBranch("Game Development Projects", [
          {
            name: "Antigravity Game",
            descriptions: [
              "Fast-paced top-down shooter with dash, dodge, and boss battles",
              'Tech: <span class="yellow">JavaScript, HTML5 Canvas, Arcade</span>',
              '<a href="https://github.com/bhanu2006-24/antigravity-game" target="_blank" class="accent">View on GitHub →</a>',
            ],
          },
          {
            name: "Neon Maze",
            descriptions: [
              "First-person 3D maze escape with cyberpunk neon visuals",
              'Tech: <span class="yellow">JavaScript, Three.js, Procedural Gen</span>',
              '<a href="https://github.com/bhanu2006-24/neon-maze" target="_blank" class="accent">View on GitHub →</a>',
            ],
          },
          {
            name: "Bomber Legends",
            descriptions: [
              "Classic arcade-style bomber game with power-ups",
              'Tech: <span class="yellow">React, TypeScript, Grid-based</span>',
              '<a href="https://github.com/bhanu2006-24/bomber-legends" target="_blank" class="accent">View on GitHub →</a>',
            ],
          },
          {
            name: "Echo Shooter",
            descriptions: [
              "Browser-based shooting game with canvas graphics",
              'Tech: <span class="yellow">JavaScript, Canvas</span>',
              '<a href="https://github.com/bhanu2006-24/Echo-shooter" target="_blank" class="accent">View on GitHub →</a>',
            ],
          },
          {
            name: "Portal Nexus",
            descriptions: [
              "RPG with procedural generation",
              'Tech: <span class="yellow">RPG, Procedural Gen</span>',
              '<a href="https://github.com/bhanu2006-24/portal-nexus" target="_blank" class="accent">View on GitHub →</a>',
            ],
          },
          {
            name: "Neon City: Undead Rising",
            descriptions: [
              "Cyberpunk RPG adventure game",
              'Tech: <span class="yellow">RPG, Cyberpunk</span>',
              '<a href="https://github.com/bhanu2006-24/neon-city" target="_blank" class="accent">View on GitHub →</a>',
            ],
          },
        ]);
        break;
      case "edu":
        printBranch("Education", [
          {
            name: "Indian Institute of Technology, Madras",
            descriptions: [
              'B.Sc. in <span class="yellow">Data Science</span> (2025-2028)',
              "One of India's premier institutions for engineering and data science",
              "Rigorous training in statistics, machine learning, and analytics",
            ],
          },
          {
            name: "Kendriya Vidyalaya No. 2, Jaipur",
            descriptions: [
              "Secondary Education",
              "Central government school with strong STEM preparation",
            ],
          },
        ]);
        break;
      case "portfolio":
        print(
          '<span class="yellow">━━━━━━━━━━━━━━━━ LIVE PORTFOLIOS ━━━━━━━━━━━━━━━━</span>',
          ""
        );
        print("", "");
        print(
          '  📊 <a href="https://bhanu-thedataanalyst.pages.dev/" target="_blank" class="accent">Data Analyst Portfolio</a> <span class="muted">→ bhanu-thedataanalyst.pages.dev</span>',
          ""
        );
        print(
          '  🔬 <a href="https://bhanu-thedatascientist.pages.dev/" target="_blank" class="accent">Data Scientist Portfolio</a> <span class="muted">→ bhanu-thedatascientist.pages.dev</span>',
          ""
        );
        print(
          '  🌐 <a href="https://bhanu-thewebdev.pages.dev/" target="_blank" class="accent">Web Developer Portfolio</a> <span class="muted">→ bhanu-thewebdev.pages.dev</span>',
          ""
        );
        print(
          '  🎮 <a href="https://bhanu-thegamedev.pages.dev/" target="_blank" class="accent">Game Developer Portfolio</a> <span class="muted">→ bhanu-thegamedev.pages.dev</span>',
          ""
        );
        print(
          '  🎨 <a href="https://bhanu-creative.pages.dev/" target="_blank" class="accent">Creative Developer Portfolio</a> <span class="muted">→ bhanu-creative.pages.dev</span>',
          ""
        );
        print("", "");
        print(
          '<span class="yellow">━━━━━━━━━━━━━━━━ OTHER PORTFOLIOS ━━━━━━━━━━━━━━━━</span>',
          ""
        );
        print("", "");
        print(
          '  🖥️ <a href="https://bhanu2006-24.github.io/bhanu2006-24/" target="_blank" class="accent">Interactive OS Portfolio</a> <span class="muted">→ MacOS-style desktop UI</span>',
          ""
        );
        print(
          '  📄 <a href="https://bhanu2006-24.github.io/Resume/" target="_blank" class="accent">Resume Hub</a> <span class="muted">→ Edit & download resumes</span>',
          ""
        );
        break;
      case "resume":
        print(
          '<span class="yellow">━━━━━━━━━━━━━ DOWNLOAD RESUMES ━━━━━━━━━━━━━</span>',
          ""
        );
        print("", "");
        print(
          '  📊 <a href="https://bhanu2006-24.github.io/Resume/analyst-resume.html" target="_blank" class="accent">Data Analyst Resume</a>',
          ""
        );
        print(
          '  🔬 <a href="https://bhanu2006-24.github.io/Resume/datascience-resume.html" target="_blank" class="accent">Data Scientist Resume</a>',
          ""
        );
        print(
          '  🌐 <a href="https://bhanu2006-24.github.io/Resume/webdev-resume.html" target="_blank" class="accent">Web Developer Resume</a>',
          ""
        );
        print(
          '  🎮 <a href="https://bhanu2006-24.github.io/Resume/game-resume.html" target="_blank" class="accent">Game Developer Resume</a>',
          ""
        );
        print("", "");
        print(
          '<span class="muted">Tip: Each resume can be edited and downloaded as PDF!</span>',
          ""
        );
        break;
      case "links":
        print('<span class="yellow">Important Links:</span>', "");
        print("", "");
        print(
          '  📧 Email: <a href="mailto:bhanupsaini2024@gmail.com" class="accent">bhanupsaini2024@gmail.com</a>',
          ""
        );
        print(
          '  💼 LinkedIn: <a href="https://www.linkedin.com/in/bhanu-saini-3bb251391" target="_blank" class="accent">Bhanu Saini</a>',
          ""
        );
        print(
          '  🐙 GitHub: <a href="https://github.com/bhanu2006-24" target="_blank" class="accent">bhanu2006-24</a>',
          ""
        );
        print(
          '  📊 Tableau: <a href="https://public.tableau.com/app/profile/bhanu.saini6988/vizzes" target="_blank" class="accent">Tableau Public</a>',
          ""
        );
        print(
          '  🖥️ OS Portfolio: <a href="https://bhanu2006-24.github.io/bhanu2006-24/" target="_blank" class="accent">Interactive Portfolio</a>',
          ""
        );
        break;
      case "quote":
        const quotes = [
          '"The only way to do great work is to love what you do." – Steve Jobs',
          '"Code is like humor. When you have to explain it, it\'s bad." – Cory House',
          '"First, solve the problem. Then, write the code." – John Johnson',
          '"Building intelligent systems with data, code, and curiosity." – Bhanu Saini',
          '"The best way to predict the future is to create it." – Peter Drucker',
        ];
        print(quotes[Math.floor(Math.random() * quotes.length)], "muted");
        break;
      case "clear":
        while (screen.firstChild) {
          screen.removeChild(screen.firstChild);
        }
        break;
      case "":
        break;
      default:
        print(
          `command not found: <span class="red">${cmd}</span>. Type <span class="yellow">help</span> for available commands.`
        );
    }
  }
