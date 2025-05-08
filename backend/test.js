const emailjs = require('@emailjs/nodejs');
emailjs.init('j2kluwE3xwjaaAAmx');
emailjs.send('service_k9wo20m', 'template_eexpuk8', { name: 'Test' })
  .then(console.log)
  .catch(console.error);