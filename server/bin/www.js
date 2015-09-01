#!/usr/bin/env node
var debug = require('debug')('my-project');
var app = require('../../server');

app.set('port', process.env.PORT || 9111);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
