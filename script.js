// --- LÓGICA DEL BUSCADOR DE GOOGLE (LANDING) ---
function revealPortfolio() {
  const landing = document.getElementById('google-landing');
  landing.style.opacity = '0';
  
  setTimeout(() => {
    landing.style.visibility = 'hidden';
    landing.style.display = 'none';
  }, 600);
}

document.getElementById('btn-ver-portafolio').addEventListener('click', revealPortfolio);

document.getElementById('btn-suerte').addEventListener('click', function() {
  window.location.href = '#terminal-section';
  revealPortfolio();
});

document.getElementById('main-search').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    revealPortfolio();
  }
});


// --- LÓGICA DE LA TERMINAL INTERACTIVA ---
const tout = document.getElementById('tout');
const tinput = document.getElementById('tinput');
const hist = []; 
let hidx = -1;

const cmds = {
  help: () => [
    {t:'Comandos disponibles:', c:'y'}, {t:''},
    {t:'  whoami      → Datos de perfil'},
    {t:'  skills      → Stack tecnológico'},
    {t:'  projects    → Proyectos desarrollados'},
    {t:'  secret      → 🤫'},
    {t:'  clear       → Limpiar consola'}, {t:''},
  ],
  whoami: () => [
    {t:'Ana Bonilla', c:'y'},
    {t:'─────────────────────────────', c:'d'},
    {t:'Rol      : Desarrolladora en formación (Java Full Stack Jr)'},
    {t:'Estado   : Preparándome para entrevistas técnicas ✓', c:'g'},
    {t:'Inglés   : A2 (Enfoque sólido en lectura de código)'}, {t:''},
    {t:'Me gusta investigar como funcionan las cosas hasta que lo aprendo y lo domino.', c:'d'}, {t:''},
  ],
  skills: () => [
    {t:'$ cat skills.txt', c:'d'}, {t:''},
    {t:'  Backend    Java · POO ', c:'y'},
    {t:'  Frontend   CSS  · HTML · JavaScript', c:'p'},
    {t:'  Database   MySQL'},
    {t:'  Tools      Git · GitHub · Figma ', c:'d'}, {t:''},
  ],
  projects: () => [
    {t:'$ ls ./portfolio/', c:'d'}, {t:''},
    {t:'  01. Grid & Flex', c:'y'},
    {t:'      E-commerce de moda sustentable. Responsivo puro.', c:'d'}, {t:''},
    {t:'  02. Landing Page de Lujo', c:'y'},
    {t:'      Coordinación de 8 integrantes y más.', c:'d'}, {t:''},
  ],
  secret: () => [
    {t:'🔐 Archivos clasificados...', c:'p'}, {t:''},
    {t:'  — Mi lenguaje favorito: Java', c:'d'},
    {t:'  — Herramientas para desestresarme: Memes de programación', c:'d'},
  ]
};

function addLines(lines) {
  lines.forEach(l => {
    const d = document.createElement('div'); d.className = 'tln';
    const s = document.createElement('span');
    const map = {y:'to y', p:'to p', g:'to g', d:'to d', '':'to'};
    s.className = map[l.c ?? ''] ?? 'to';
    s.textContent = l.t;
    d.appendChild(s); tout.appendChild(d);
  });
}

function addCmd(cmd) {
  const d = document.createElement('div'); d.className = 'tln';
  d.innerHTML = `<span class="tp2">visitor@portfolio:~$</span><span class="tc"> ${cmd}</span>`;
  tout.appendChild(d);
}

function addErr(cmd) {
  const d = document.createElement('div'); d.className = 'tln';
  d.innerHTML = `<span style="color:#b87a82">comando no reconocido: ${cmd}. Escribe 'help'.</span>`;
  tout.appendChild(d);
  tout.appendChild(Object.assign(document.createElement('div'), {className:'tln', innerHTML:'&nbsp;'}));
}

tinput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const cmd = tinput.value.trim().toLowerCase();
    if (!cmd) return;
    hist.unshift(cmd); hidx = -1;
    addCmd(cmd); tinput.value = '';
    
    if (cmd === 'clear') { 
      tout.innerHTML = ''; 
    } else if (cmds[cmd]) { 
      addLines(cmds[cmd]()); 
    } else { 
      addErr(cmd); 
    }
    tout.scrollTop = tout.scrollHeight;
  }
  if (e.key === 'ArrowUp') { 
    hidx = Math.min(hidx+1, hist.length-1); 
    tinput.value = hist[hidx] || ''; 
  }
  if (e.key === 'ArrowDown') { 
    hidx = Math.max(hidx-1, -1); 
    tinput.value = hidx >= 0 ? hist[hidx] : ''; 
  }
});

document.querySelector('.t-win').addEventListener('click', () => tinput.focus());