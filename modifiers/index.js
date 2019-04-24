/**
 * Copyright (c) Weekendesk SAS.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const aggregate = require('./aggregate');
const filter = require('./filter');
const forwardedhost = require('./forwardedhost');
const routematch = require('./routematch');
const statuscode = require('./statuscode');
const waitfor = require('./waitfor');

module.exports = {
  aggregate,
  filter,
  forwardedhost,
  routematch,
  statuscode,
  waitfor,
};
