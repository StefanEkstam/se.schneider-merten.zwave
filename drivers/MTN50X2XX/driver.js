'use strict';

const Homey = require('homey');

//----------------------------------------------------------------------
// MTN50X2XX
//----------------------------------------------------------------------
class MTN50X2XX extends Homey.Driver {

    onInit() {
        this.log('MTN50X2XX: driver.js: init...');
        super.onInit();
    }

}

module.exports = MTN50X2XX;
