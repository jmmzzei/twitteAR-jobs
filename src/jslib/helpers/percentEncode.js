"use strict";

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.regexp.replace");

const percentEncode = str => encodeURIComponent(str).replace(/[!*()']/g, char => '%' + char.charCodeAt(0).toString(16));