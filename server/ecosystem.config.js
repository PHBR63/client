module.exports = {
  apps: [
    {
      name: 'ficha-paranormal-server',
      script: 'src/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 5000,
        MONGODB_URI: 'mongodb://localhost:27017/fichaparanormal',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
        MONGODB_URI: 'mongodb://mongo:27017/fichaparanormal',
      },
    },
  ],
}; 