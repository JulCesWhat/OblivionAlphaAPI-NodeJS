require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pino = __webpack_require__(28);

var _pino2 = _interopRequireDefault(_pino);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var l = (0, _pino2.default)({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL
});

exports.default = l;

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = require("mongoose");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _dotenv = __webpack_require__(24);

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(3);

var _server = __webpack_require__(18);

var _server2 = _interopRequireDefault(_server);

var _routes = __webpack_require__(20);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _server2.default().router(_routes2.default).listen(process.env.PORT);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Controller = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _contact = __webpack_require__(8);

var _contact2 = _interopRequireDefault(_contact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = exports.Controller = function () {
    function Controller() {
        _classCallCheck(this, Controller);
    }

    _createClass(Controller, [{
        key: 'sendEmail',
        value: function sendEmail(req, res, next) {
            var contactMsg = req.body;

            if (!contactMsg.name || !contactMsg.message || !contactMsg.email) {
                var err = new Error('User can\'t be added because the body is empty.');
                err.status = 400;
                return next(err);
            }

            _contact2.default.sendEmail(contactMsg).then(function (email) {
                return res.json(email);
            }).catch(next);
        }
    }]);

    return Controller;
}();

exports.default = new Controller();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = __webpack_require__(1);

var express = _interopRequireWildcard(_express);

var _controller = __webpack_require__(6);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = express.Router().post('/', _controller2.default.sendEmail);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ContactService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodemailer = __webpack_require__(26);

var mailer = _interopRequireWildcard(_nodemailer);

var _logger = __webpack_require__(0);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContactService = exports.ContactService = function () {
    function ContactService() {
        _classCallCheck(this, ContactService);
    }

    _createClass(ContactService, [{
        key: 'sendEmail',
        value: function sendEmail(contactMsg) {
            // Use Smtp Protocol to send Email
            var smtpTransport = mailer.createTransport({
                service: 'Gmail',
                port: 465,
                secure: true, // use TLS
                auth: {
                    user: "WispersOfOblivion@gmail.com",
                    pass: "W1spers0f0blivion"
                }
            });

            var mail = {
                from: 'Oblivion Alpha FrontEnd <wispersofoblivion@gmail.com>',
                to: 'wispersofoblivion@gmail.com',
                subject: contactMsg.name + ' <' + contactMsg.email + '>',
                text: contactMsg.message
            };

            _logger2.default.info(this.constructor.name + '.sendEmail(' + contactMsg + ')');
            return new Promise(function (resolve, reject) {
                smtpTransport.sendMail(mail, function (error, response) {

                    smtpTransport.close();
                    if (error) {
                        //console.log(error)
                        reject(error);
                    } else {
                        //console.log("Message sent: " + response.message);
                        resolve(response);
                    }
                });
            });
        }

        /*                              THIS HAS PROBLEMS
            verifyEmail(contactMsg) {
                return new Promise((resolve, reject) => {
                    let emailGroup = contactMsg.emailGroup;
        
                    //Here we will store in the dB and send it to me :)
                    emailCheck(emailGroup.email)
                        .then((res) => {
                            if (res) {
                                resolve(contactMsg);
                            } else {
                            
                                //The email does not exist or could not be verified
                                const err = new Error('The entered email could not be verified.');
                                err.status = 500;
                                reject(err);
                            }
                        })
                        .catch((err) =>  {
                            if (err.message === 'refuse') {
                                // The MX server is refusing requests from your IP address.
                                //console.log((err.message))
                                reject(err);
                            } else {
                                //console.log(err.message);
                                // Decide what to do with other errors.
                                reject(err);
                            }
                        });
                });
            }
        */

    }]);

    return ContactService;
}();

exports.default = new ContactService();

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _examples = __webpack_require__(11);

var _examples2 = _interopRequireDefault(_examples);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = exports.Controller = function () {
  function Controller() {
    _classCallCheck(this, Controller);
  }

  _createClass(Controller, [{
    key: 'all',
    value: function all(req, res) {
      _examples2.default.all().then(function (r) {
        return res.json(r);
      });
    }
  }, {
    key: 'byId',
    value: function byId(req, res) {
      _examples2.default.byId(req.params.id).then(function (r) {
        if (r) res.json(r);else res.status(404).end();
      });
    }
  }, {
    key: 'create',
    value: function create(req, res) {
      _examples2.default.create(req.body.name).then(function (r) {
        return res.status(201).location('/api/v1/examples/' + r.id).json(r);
      });
    }
  }]);

  return Controller;
}();

exports.default = new Controller();

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = __webpack_require__(1);

var express = _interopRequireWildcard(_express);

var _controller = __webpack_require__(9);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = express.Router().post('/', _controller2.default.create).get('/', _controller2.default.all).get('/:id', _controller2.default.byId);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExamplesService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = __webpack_require__(0);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var id = 0;
var examples = [{ id: id++, name: 'example 0' }, { id: id++, name: 'example 1' }];

var ExamplesService = exports.ExamplesService = function () {
  function ExamplesService() {
    _classCallCheck(this, ExamplesService);
  }

  _createClass(ExamplesService, [{
    key: 'all',
    value: function all() {
      _logger2.default.info(this.constructor.name + '.all()');
      return Promise.resolve(examples);
    }
  }, {
    key: 'byId',
    value: function byId(id) {
      _logger2.default.info(this.constructor.name + '.byId(' + id + ')');
      return this.all().then(function (r) {
        return r[id];
      });
    }
  }, {
    key: 'create',
    value: function create(name) {
      var example = {
        id: id++,
        name: name
      };

      examples.push(example);
      _logger2.default.info(example, this.constructor.name + '.create(' + name + ')');

      return Promise.resolve(example);
    }
  }]);

  return ExamplesService;
}();

exports.default = new ExamplesService();

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Controller = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _newsGalore = __webpack_require__(14);

var _newsGalore2 = _interopRequireDefault(_newsGalore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = exports.Controller = function () {
    function Controller() {
        _classCallCheck(this, Controller);
    }

    _createClass(Controller, [{
        key: 'findArticle',
        value: function findArticle(req, res, next) {
            var categoryID = req.params.categoryID;
            var articleID = req.params.articleID;

            _newsGalore2.default.findArticle(categoryID, articleID).then(function (article) {
                return res.json(article);
            }).catch(next);
        }
    }, {
        key: 'findCategory',
        value: function findCategory(req, res, next) {
            var categoryID = req.params.categoryID;

            _newsGalore2.default.findCategory(categoryID).then(function (category) {
                return res.json(category);
            }).catch(next);
        }
    }, {
        key: 'findCategories',
        value: function findCategories(req, res, next) {
            _newsGalore2.default.findCategories().then(function (data) {
                return res.json({
                    Categories: data.category,
                    CategoryObjects: data.structuredNewsCategory
                });
            }).catch(next);
        }
    }, {
        key: 'saveArticle',
        value: function saveArticle(req, res, next) {}
    }, {
        key: 'saveCategory',
        value: function saveCategory(req, res, next) {}
    }]);

    return Controller;
}();

exports.default = new Controller();

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = __webpack_require__(1);

var express = _interopRequireWildcard(_express);

var _controller = __webpack_require__(12);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = express.Router().get('/:categoryID/:articleID', _controller2.default.findArticle).get('/:categoryID', _controller2.default.findCategory).get('/', _controller2.default.findCategories);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NewsGaloreService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = __webpack_require__(0);

var _logger2 = _interopRequireDefault(_logger);

var _INewsCategory = __webpack_require__(17);

var _INewsCategory2 = _interopRequireDefault(_INewsCategory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NewsGaloreService = exports.NewsGaloreService = function () {
    function NewsGaloreService() {
        _classCallCheck(this, NewsGaloreService);
    }

    _createClass(NewsGaloreService, [{
        key: 'findArticle',
        value: function findArticle(categoryID, articleID) {
            _logger2.default.info(this.constructor.name + '.findArticle(' + categoryID + ', ' + articleID + ')');
            return new Promise(function (resolve, reject) {
                _INewsCategory2.default.findById(categoryID, function (err, category) {
                    if (err) {
                        reject(err);
                    } else {
                        var article = category.NewsItems.id(articleID);

                        if (!article) {
                            return reject(new Error('Value could not be found. Most likely the articleID is invalid. :)'));
                        }

                        resolve(article);
                    }
                });
            });
        }
    }, {
        key: 'findCategory',
        value: function findCategory(categoryID) {
            _logger2.default.info(this.constructor.name + '.findCategory(' + categoryID + ')');
            return new Promise(function (resolve, reject) {

                if (categoryID === 'CategoryTitles') {

                    _INewsCategory2.default.find({}, function (err, NewsCategory) {
                        if (err) {
                            reject(err);
                        } else {

                            //Getting the categories of each major category in the db
                            var Categories = [];
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {
                                for (var _iterator = NewsCategory[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    var category = _step.value;

                                    var categoryItem = {
                                        Name: category.Category,
                                        _id: category._id
                                    };

                                    Categories.push(categoryItem);
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return) {
                                        _iterator.return();
                                    }
                                } finally {
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }

                            resolve({
                                categoryTitles: Categories
                            });
                        }
                    });
                } else if (categoryID === 'PopularData') {

                    _INewsCategory2.default.findOne({ 'Category': 'Politics' }, function (err, category) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(category);
                        }
                    });
                } else {

                    _INewsCategory2.default.findById(categoryID, function (err, category) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(category);
                        }
                    });
                }
            });
        }
    }, {
        key: 'findCategories',
        value: function findCategories() {
            _logger2.default.info(this.constructor.name + '.findCategories()');
            return new Promise(function (resolve, reject) {
                _INewsCategory2.default.find({}, function (err, NewsCategory) {
                    if (err) {
                        reject(err);
                    } else {

                        //Getting the categories of each major category in the db
                        var Categories = [];
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = NewsCategory[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var category = _step2.value;

                                Categories.push(category.Category);
                                //console.log(JSON.stringify(category))
                            }
                            //console.log(JSON.stringify(NewsCategory.length))

                            //I think that we need to create a method that will do this in a
                            //randomly fashion so that it can look cool.
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }

                        var structuredCategory = [];
                        var innerDoublePart = [];
                        console.log(NewsCategory.length + '  length');
                        for (var i = 0; i < NewsCategory.length; i++) {
                            if (i === 1) {
                                innerDoublePart.push(NewsCategory[i]);
                            } else if (i === 2) {
                                innerDoublePart.push(NewsCategory[i]);
                            } else if (i === 3) {
                                structuredCategory.push(innerDoublePart);
                                structuredCategory.push(NewsCategory[i]);
                            } else {
                                structuredCategory.push(NewsCategory[i]);
                            }
                        }

                        resolve({
                            newsCategory: NewsCategory,
                            structuredNewsCategory: structuredCategory,
                            category: Categories
                        });
                    }
                });
            });
        }
    }, {
        key: 'saveArticle',
        value: function saveArticle(categoryID, iNewsArticle) {
            new Promise(function (resolve, reject) {
                _INewsCategory2.default.findById(categoryID, function (err, category) {
                    if (err) {
                        reject(err);
                    } else {

                        console.log(iNewsArticle.category); // Did this so that the error can go away
                        var entry = new INewsArticle({});

                        category.INewsArticles.add(entry);

                        category.save(function (err, product, article) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(article);
                            }
                        });
                    }
                });
            });
        }
    }, {
        key: 'saveCategory',
        value: function saveCategory(iNewsCategory) {
            new Promise(function (resolve, reject) {
                var entry = new _INewsCategory2.default({
                    Type: iNewsCategory.Type,
                    INewsArticles: iNewsCategory.INewsArticles
                });

                entry.save(function (err, product) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(product);
                    }
                });
            });
        }
    }]);

    return NewsGaloreService;
}();

exports.default = new NewsGaloreService();

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Database = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Module dependencies


__webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mongoose = __webpack_require__(2),
    connectionString = 'mongodb://' + process.env.DBCONFIG_HOST + '/' + process.env.DBCONFIG_DATABASE;
mongoose.Promise = __webpack_require__(21);

var connection = null;

var Database = exports.Database = function () {
    function Database() {
        _classCallCheck(this, Database);
    }

    _createClass(Database, [{
        key: 'open',
        value: function open(callback) {
            mongoose.connect(connectionString);
            connection = mongoose.connection;
            //mongoose.Promise = global.Promise;

            mongoose.connection.on('error', function (err) {
                console.log('Error connecting to MongoDB: ' + err);
                callback(err, false);
            });

            mongoose.connection.once('open', function () {
                console.log('We have connected to mongodb');
                callback(null, true);
            });
        }

        // disconnect from database

    }, {
        key: 'close',
        value: function close() {
            connection.close(function () {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        }
    }]);

    return Database;
}();

exports.default = new Database();

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var mongoose = __webpack_require__(2),
    Schema = mongoose.Schema;

var INewsArticleSchema = new Schema();
INewsArticleSchema.add({
  //id                   : { type : Number, required: true },
  Category: { type: String, required: true, trim: true },
  Title: { type: String, required: true, trim: true },
  Image: { type: String, required: true, trim: true },
  Content: { type: String, required: true, trim: true },
  Time: { type: String, required: true, trim: true },
  Link: { type: String, required: true, trim: true },
  Company: { type: String, required: true, trim: true },
  RelatedArticles: [INewsArticleSchema]
});

module.exports = mongoose.model('INewsArticle', INewsArticleSchema);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var mongoose = __webpack_require__(2),
    Schema = mongoose.Schema,
    INewsArticle = __webpack_require__(16);

var INewsCategorySchema = new Schema({
  Category: { type: String, required: true, trim: true },
  NewsItems: [INewsArticle.schema],
  ArticlesCount: Number
});

module.exports = mongoose.model('INewsCategory', INewsCategorySchema, 'INewsCategories');

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _path = __webpack_require__(4);

var path = _interopRequireWildcard(_path);

var _bodyParser = __webpack_require__(22);

var bodyParser = _interopRequireWildcard(_bodyParser);

var _http = __webpack_require__(25);

var http = _interopRequireWildcard(_http);

var _os = __webpack_require__(27);

var os = _interopRequireWildcard(_os);

var _cookieParser = __webpack_require__(23);

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _swagger = __webpack_require__(19);

var _swagger2 = _interopRequireDefault(_swagger);

var _logger = __webpack_require__(0);

var _logger2 = _interopRequireDefault(_logger);

var _mongoDB = __webpack_require__(15);

var _mongoDB2 = _interopRequireDefault(_mongoDB);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = new _express2.default();

var ExpressServer = function () {
  function ExpressServer() {
    _classCallCheck(this, ExpressServer);

    var root = path.normalize(__dirname + '/../..');
    app.disable('x-powered-by');
    app.set('appPath', root + 'client');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use((0, _cookieParser2.default)(process.env.SESSION_SECRET));
    app.use(_express2.default.static(root + '/public'));

    this.initCustomMiddleware();
    this.initDataBase();
  }

  _createClass(ExpressServer, [{
    key: 'initCustomMiddleware',
    value: function initCustomMiddleware() {
      if (process.platform === 'win32') {
        __webpack_require__(29).createInterface({
          input: process.stdin,
          output: process.stdout
        }).on('SIGINT', function () {
          console.log('SIGINT: Closing MongoDB connection');
          _mongoDB2.default.close();
        });
      }

      process.on('SIGINT', function () {
        console.log('SIGINT: Closing MongoDB connection');
        _mongoDB2.default.close();
      });
    }
  }, {
    key: 'initDataBase',
    value: function initDataBase() {
      if (true) {
        _mongoDB2.default.open(function (err) {
          if (err) {
            process.exit(1);
          }
        });
      } else {
        //Here we will connect to DinomoDB or S3 from Amazon Web Services
      }
    }
  }, {
    key: 'router',
    value: function router(routes) {
      (0, _swagger2.default)(app, routes);
      return this;
    }
  }, {
    key: 'listen',
    value: function listen() {
      var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.env.PORT;

      var welcome = function welcome(port) {
        return function () {
          return _logger2.default.info('up and running in ' + ("development" || 'development') + ' @: ' + os.hostname() + ' on port: ' + port + '}');
        };
      };
      http.createServer(app).listen(port, welcome(port));
      return app;
    }
  }]);

  return ExpressServer;
}();

exports.default = ExpressServer;
/* WEBPACK VAR INJECTION */}.call(exports, "server\\common"))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app, routes) {
  (0, _swaggerExpressMiddleware2.default)(path.join(__dirname, 'Api.yaml'), app, function (err, middleware) {

    // Enable Express' case-sensitive and strict options
    // (so "/entities", "/Entities", and "/Entities/" are all different)
    app.enable('case sensitive routing');
    app.enable('strict routing');

    app.use(middleware.metadata());
    app.use(middleware.files({
      // Override the Express App's case-sensitive and strict-routing settings for the Files middleware.
      caseSensitive: false,
      strict: false
    }, {
      useBasePath: true,
      apiPath: process.env.SWAGGER_API_SPEC
      // Disable serving the "Api.yaml" file
      // rawFilesPath: false
    }));

    app.use(middleware.parseRequest({
      // Configure the cookie parser to use secure cookies
      cookie: {
        secret: process.env.SESSION_SECRET
      },
      // Don't allow JSON content over 100kb (default is 1mb)
      json: {
        limit: process.env.REQUEST_LIMIT
      }
    }));

    // These two middleware don't have any options (yet)
    app.use(middleware.CORS(), middleware.validateRequest());

    // Error handler to display the validation error as HTML
    app.use(function (err, req, res, next) {
      res.status(err.status);
      res.send('<h1>' + err.status + ' Error</h1>' + '<pre>' + err.message + '</pre>');
    });

    routes(app);
  });
};

var _swaggerExpressMiddleware = __webpack_require__(30);

var _swaggerExpressMiddleware2 = _interopRequireDefault(_swaggerExpressMiddleware);

var _path = __webpack_require__(4);

var path = _interopRequireWildcard(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* WEBPACK VAR INJECTION */}.call(exports, "server\\common\\swagger"))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routes;

var _router = __webpack_require__(7);

var _router2 = _interopRequireDefault(_router);

var _router3 = __webpack_require__(10);

var _router4 = _interopRequireDefault(_router3);

var _router5 = __webpack_require__(13);

var _router6 = _interopRequireDefault(_router5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

function routes(app) {
  app.use('/api/v1/contact', _router2.default);
  app.use('/api/v1/examples', _router4.default);
  app.use('/api/v1/newsGalore', _router6.default);

  // Will need to check this.
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use(function (err, req, res) {
    res.status(err.status || 500);

    res.json({
      dataContent: null,
      errorContent: {
        anyErrors: true,
        errors: [{
          errorMessage: err.message,
          errorStatus: err.status
        }]
      }
    });
  });
};

/***/ },
/* 21 */
/***/ function(module, exports) {

module.exports = require("bluebird");

/***/ },
/* 22 */
/***/ function(module, exports) {

module.exports = require("body-parser");

/***/ },
/* 23 */
/***/ function(module, exports) {

module.exports = require("cookie-parser");

/***/ },
/* 24 */
/***/ function(module, exports) {

module.exports = require("dotenv");

/***/ },
/* 25 */
/***/ function(module, exports) {

module.exports = require("http");

/***/ },
/* 26 */
/***/ function(module, exports) {

module.exports = require("nodemailer");

/***/ },
/* 27 */
/***/ function(module, exports) {

module.exports = require("os");

/***/ },
/* 28 */
/***/ function(module, exports) {

module.exports = require("pino");

/***/ },
/* 29 */
/***/ function(module, exports) {

module.exports = require("readline");

/***/ },
/* 30 */
/***/ function(module, exports) {

module.exports = require("swagger-express-middleware");

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }
/******/ ]);
//# sourceMappingURL=main.map