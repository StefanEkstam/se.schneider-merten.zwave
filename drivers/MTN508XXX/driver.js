'use strict';

const Homey = require('homey');

//----------------------------------------------------------------------
// MTN508XXX
//----------------------------------------------------------------------
class MTN508XXX extends Homey.Driver {

    onInit() {
        this.log('MTN508XXX: driver.js: init...');
        super.onInit();
   }

}

module.exports = MTN508XXX;
