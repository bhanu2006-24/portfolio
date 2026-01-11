(function () {
    const screen = document.getElementById('screen');
    const state = {
    user: 'quangbui',
    host: 'local',
    path: '~',
    history: [],
    historyIndex: -1
};

function renderAboutMe() {
    print('┌─────────────────────────── ABOUT ───────────────────────────┐', '');
    print('│ Name: <span class="accent">Quang Bui</span>                                             │', '');
    print('│ Role: <span class="accent">Curious builder and learner</span>                           │', '');
    print('│ Location: <span class="accent">Vienna, Austria          </span>                         │', '');
    print('└─────────────────────────────────────────────────────────────┘', '');

    printBranch('Information', [
        {
        name: 'Strengths',
        descriptions: [
            'Logical reasoning — able to think through problems with <span class="yellow">accuracy and ease</span>',
            'Calmness — <span class="yellow">never overwhelmed</span> by heavy task difficult or load (I take it as a challenge)',
            'Communication — communicate with team effectively to produce the <span class="yellow">best possible outcome</span>'
        ]
        },
        {
        name: 'Techstack',
        descriptions: [
            'Language: <span class="yellow">HTML, CSS, JavaScript, TypeScript, React, Python, and Java</span>',
            'Tools: <span class="yellow">Git, PyTorch, TensorFlow, Jira/Confluence</span>',
            'Creativity: <span class="yellow">Figma, Canva</span>'
        ]
        },
        {
        name: 'Interests',
        descriptions: [
            'Creating the <span class="yellow">best possible UI/UX</span> even for a technical product',
            'Automating life with <span class="yellow">AI agents</span>',
            '<span class="yellow">Teaching</span> through workshops, lessons, seminars, etc.'
        ]
        },
        {
        name: 'Working Principles',
        descriptions: [
            'MVP first - always prefer a usable product with <span class="yellow">minimum viable features</span> first',
            'Perfectionist - a single box not aligned and the UI will be <span class="yellow">fixed within seconds</span>',
            'Logic - decide features to build based on <span class="yellow">what will benefit users, not what will satisfy dev\'s eyes</span>'
        ]
        },
        {
        name: 'Contact',
        descriptions: [
            'Email: quang.gateway@gmail.com',
            'LinkedIn: <a href="https://www.linkedin.com/in/buiducquang/" target="_blank" class="accent">Duc Quang Bui</a>',
            'GitHub: <a href="https://github.com/duckyquang" target="_blank" class="accent">Duck Quang</a>'
        ]
        }
    ]);
    }


function promptText() {
    return `<span class="prompt glow">${state.user}@${state.host}</span>:<span class="accent">${state.path}</span>$`;
}

function focusCmd() {
    const cmd = document.getElementById('cmd');
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
    const wrap = document.createElement('div');
    wrap.className = 'line prompt-line';
    wrap.innerHTML = `
      <div>${promptText()}</div>
      <div id="cmd" contenteditable="true" spellcheck="false"></div>
    `;
    screen.appendChild(wrap);
    screen.scrollTop = screen.scrollHeight;
    focusCmd();
}

function print(text, cls) {
    const div = document.createElement('div');
    div.className = 'line' + (cls ? ' ' + cls : '');
    div.innerHTML = text;
    screen.appendChild(div);
    screen.scrollTop = screen.scrollHeight;
}

function printBranch(title, items) {
    print(title + ':', 'yellow');
    print('', '');
    items.forEach((obj) => {
        print(obj.name, 'tree-branch');
        obj.descriptions.forEach(d => {
            print('- ' + d, 'tree-sub');
        });
        print('', '');
    });
}

const CV_PATH = 'assets/QuangBui-CV.pdf';
const CV_FILENAME = 'QuangBui-CV.pdf';

function triggerDownload(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.rel = 'noopener';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    a.remove();
}

function handleCommand(input) {
    const cmd = input.trim().toLowerCase();
    switch (cmd) {
        case 'help':
            print(
            [
                '<span class="yellow">Available commands</span>',
                '  help             Show all commands',
                '  about            Info about Quang Bui',
                '  proj             List of projects',
                '  rs               List of researches',
                '  ecs              List of extracurriculars',
                '  aca              Show academic info',
                '  awards           List of notable awards',
                '  quote            Print a deep quote',
                '  download         Download CV',
            ].join('\n')
            );
            break;
        case 'download':
            print('Downloaded!', 'muted');
            triggerDownload(CV_PATH, CV_FILENAME);
            break;
        case 'about':
            renderAboutMe();
            break;
        case 'proj':
            printBranch('Projects', [
            { name: 'Rotten (2024 - 2025)', descriptions: [
                'An AI-based translator for teachers to <span class="yellow">translate educational content into brainrot</span>',
                'Trained the AI model with over <span class="yellow">300 brainrot terms and use cases</span>',
                'Built it as a part of the <a href="https://docs.google.com/document/d/1bwLQNPkNM9e9gQBsdeFPXFcPsPpu6jjfSB3ueGwxJIs/edit?usp=sharing" target="_blank" class="accent">IB MYP Personal Project</a>'
            ] },
            { name: 'Huzzlingo (2025 - Present)', descriptions: [
                '<span class="yellow">Duolingo for getting girls (huzz)</span>',
                '<span class="yellow">Trained the final boss AI model</span> to challenge users and return a Huzzlingo score',
                'Techstack: TypeScript, JSON, JavaScript, CSS, and HTML'
            ] },
            { name: 'BiPlus Learning (2025)', descriptions: [
                'Solo-built the <a href="https://learning.biplus.com.vn" target="_blank" class="accent"><span class="yellow">course listing website</span></a> for BiPlus Software Solutions JSC',
                'Techstack: TypeScript, JSON, Javascript, CSS, and HTML',
            ] },
            { name: 'Synthica (2025 - Present)', descriptions: [
                '<span class="yellow">Making research approachable for all.</span>',
            ] },
            ]);
            break;
        case 'rs':
            printBranch('Researches', [
            { name: 'Solutions for prompt injections in AI browsers', descriptions: [
                'Investigating on <span class="yellow">prompnt injections in AI browsers</span>',
                'Proposed the <span class="yellow">Multicmodal Context Firewall (MCF) framework</span> which ensures only harmless context to enter the process',
                'Aiming to submit to the ICML conference'
            ] },
            { name: 'Quantum vs. Classical Algorithms: Shortest Path Optimization Problem', descriptions: [
                'Comparing <span class="yellow">Djikstra\'s algorithm to quantum algorithms</span> with different amount of qubits',
                'Tech Stack: Python and <span class="yellow">Qiskit (IBM Quantum Coding Language)</span>',
                'Currently being peer reviewed'
            ] },
            ]);
            break;
        case 'ecs':
            printBranch('Extracurriculars', [
            { name: 'Coding Club President (2024 - Present)', descriptions: [
                'Planned a 30-lesson curriculum for 30+ members',
                'Produced alumni with products helping the school community (i.e. <span class="yellow">Class Scheduler</span>)',
                'Taught 20 beginners <span class="yellow">Python and Scratch</span> to introduce them to the basics of programming'
            ] },
            { name: 'TedX Speaker (2025)', descriptions: [
                'Topic: "<span class="yellow">How can we ethically abuse AI?</span>"',
                'Discussed about the uses of AI and how we can utilize it to benefit us',
                'Encouraged the school board to <span class="yellow">allow AI usage</span>'
            ] },
            { name: 'Basketball Player (2022 - Present)', descriptions: [
                'Varsity Player - won multiple 3x3 and 5x5 leagues as a starter',
                'Nationals Player - played at the <span class="yellow">national level</span> for the Hanoi Basketball Team',
                'Basketball Club Coordinator - organized <span class="yellow">free basketball summer camps</span> for children and raised awareness about basketball in the community'
            ] },
            ]);
            break;
        case 'aca':
            printBranch('Academics', [
            { name: 'American International School Vienna (2025 - 2027)', descriptions: [
                'GPA: <span class="yellow">3.8 UW</span>',
                'IB Diploma: N/A',
            ] },
            { name: 'The Dewey Schools (2023 - 2025)', descriptions: [
                'GPA: <span class="yellow">4.67 W</span>',
                'IB MYP Year 5: <span class="yellow">57/63</span<',
            ] },
            { name: 'Rigorous Courses', descriptions: [
                'AP: Computer Science A (<span class="yellow">5</span>), Precalculus (<span class="yellow">5</span>), Physics 1 (<span class="yellow">4</span>)',
                'SAT: First one this December',
            ] },
            ]);
            break;
        case 'awards':
            printBranch('Notable Awards', [
            { name: 'Mathematics', descriptions: [
                '<span class="yellow">Top 0.5% Contestant</span>, International Kangaroo Mathematics Competition, 2019 - 2024',
                '<span class="yellow">Silver Medal</span>, Asian Science and Mathematics Olympiad, 2019 - 2023',
                '<span class="yellow">Bronze Medal</span>, Thailand International Mathematics Olympiad, 2022'
            ] },
            { name: 'Robotics', descriptions: [
                '<span class="yellow">Gold Medal</span>, World Robot Contest Festival International Finals, 2024',
                '<span class="yellow">Bronze Medal</span>, Vietnam Robotics Open, 2024'
            ] },
            { name: 'Others', descriptions: [
                '<span class="yellow">Best Debater</span>, "Should Vietnam use nuclear energy?", 2025',
                '<span class="yellow">Outstanding Delegate</span>, Nguyen Sieu Model United Nations, 2024',
                '<span class="yellow">Top 3 & Youngest-ever Participant</span>, International Trade Challenge, 2022',
            ] },
            ]);
            break;
        case 'quote':
            print('"Nothing is impossible; literally, the word says I\'m possible" – Quang Bui, probably', 'muted');
            break;
        case '':
            break;
        default:
            print(`command not found: <span class="red">${cmd}</span>`);
    }
  }

    function lockLine(lineEl) {
        const input = lineEl.querySelector('#cmd');
        if (!input) return;
        const value = input.textContent;
        const frozen = document.createElement('div');
        frozen.className = 'line';
        frozen.innerHTML = `${promptText()} ${escapeHtml(value)}`;
        lineEl.replaceWith(frozen);
        return value;
    }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[c]));
  }

  screen.addEventListener('keydown', (e) => {
    const cmd = document.getElementById('cmd');
    if (!cmd) return;
    if (e.key === 'Enter') {
        e.preventDefault();
        const line = cmd.closest('.prompt-line');
        const value = cmd.textContent;
        state.history.unshift(value);
        state.historyIndex = -1;
        const frozenValue = lockLine(line);
        handleCommand(frozenValue);
        appendPrompt();
    }
  });

  screen.addEventListener('mousedown', () => setTimeout(focusCmd, 0));
  appendPrompt();
})();