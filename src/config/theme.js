export const theme = {
  colors: {
    primary: '#8B0000', // Vermelho sangue
    secondary: '#1F2937', // Cinza escuro
    background: '#111827', // Preto azulado
    accent: '#4B0082', // Roxo escuro
    text: '#F9FAFB', // Branco suave
    textSecondary: '#6B7280', // Cinza claro
  },
  fonts: {
    title: 'Cinzel, serif',
    body: 'Inter, sans-serif',
  },
  backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80',
  particlesConfig: {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: '#4B0082' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: false },
      move: { enable: true, speed: 2, direction: 'none', random: true }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { 
        onhover: { enable: true, mode: 'repulse' }, 
        onclick: { enable: true, mode: 'push' } 
      },
      modes: { 
        repulse: { distance: 100, duration: 0.4 }, 
        push: { particles_nb: 4 } 
      }
    },
    retina_detect: true
  }
}; 