const fs = require('fs/promises');
const path = require('path');

const logger = async (req, res, next) => {
  const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  console.log(`Received Request: ${req.method} on ${req.url}`);
  
  try {
    const logFilePath = path.join(__dirname, '..', 'server.log');
    await fs.appendFile(logFilePath, logMessage);
  } catch (error) {
    console.error('Failed to write to log file:', error);
  }
  
  next();
};

module.exports = logger;
