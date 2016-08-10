const express = require('express');
const PORT = process.env.PORT || 5000;
express().use(express.static(__dirname + '/build'))
  .listen(PORT, () => process.stdout.write('server is up on port:' + PORT));
