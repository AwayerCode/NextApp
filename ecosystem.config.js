module.exports = {
    apps: [{
      name: 'nextapp',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        DATABASE_URL: 'postgresql://nextapp:your_password@localhost:5432/nextapp'
      },
      watch: false,
      max_memory_restart: '1G',
      error_file: 'logs/err.log',
      out_file: 'logs/out.log',
      time: true
    }]
  }