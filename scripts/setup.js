const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Create virtual environment
  execSync('python3 -m venv venv');
  
  // Activate virtual environment and install dependencies
  const activateCmd = process.platform === 'win32' ? 
    'venv\\Scripts\\activate' : 
    'source venv/bin/activate';
    
  execSync(`${activateCmd} && python3 -m pip install -r requirements.txt`, {
    shell: true,
    stdio: 'inherit'
  });

  console.log('Python environment setup complete!');
} catch (error) {
  console.error('Setup failed:', error.message);
  process.exit(1);
}