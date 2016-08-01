const express = require('express');
const PORT = process.env.PORT || 3000;
express().use(express.static(__dirname + '/build'))
  .listen(PORT, () => process.stdout.write('sever is up on port:' + PORT));
