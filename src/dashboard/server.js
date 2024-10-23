function startServer() {
  const express = require('express');
  const fs = require('fs');
  const path = require('path');
  const app = express();

  const configPath = path.join(__dirname, '../../config.json');
  const indexPath = path.join(__dirname, 'index.html');

  app.use(express.json());
  app.use(express.static(path.join(__dirname)));

  app.get('/', (req, res) => {
    res.sendFile(indexPath);
  });

  app.get('/config.json', (req, res) => {
    fs.readFile(configPath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error reading config file');
      }
      res.send(data);
    });
  });

  app.post('/update-config', (req, res) => {
    fs.readFile(configPath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error reading config file');
      }

      const currentConfig = JSON.parse(data);
      const updatedConfig = {
        ...currentConfig,
        ...req.body,
      };

      fs.writeFile(configPath, JSON.stringify(updatedConfig, null, 2), 'utf8', (err) => {
        if (err) {
          return res.status(500).send('Error writing config file');
        }
        res.json({ message: 'Config updated successfully!' });
      });
    });
  });

  fs.readFile(configPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading config file:', err);
      return;
    }

    const config = JSON.parse(data);
    const port = config.port || 3000; 

    app.listen(port, () => {
      //console.log(`Server is running on port ${port}`);
    });
  });
}

module.exports = { startServer };
