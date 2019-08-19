'use strict';

const Homey = require('homey');

//----------------------------------------------------------------------
// MTN50X1XX
//----------------------------------------------------------------------
class MTN50X1XX extends Homey.Driver {

    onInit() {
        this.log('MTN50X1XX: driver.js: init...');
        super.onInit();
   }

}

module.exports = MTN50X1XX;
