'use strict';

module.exports = function (req, res, next) {
  res.json({
    health: 'Available',
    uptime: Math.round(process.uptime())
  });
};
