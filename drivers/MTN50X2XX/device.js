'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

var startDimValue = -1;
var endDimValue = -1;
var isDimmingDown = false;

// MTN50X2XX, Radio push-button, 2-gang
class MTN50X2XX extends ZwaveDevice {

    // This device has no capabilities of its own.
    // It can not receive any specific commands.
    // It simply works as a sending device, that can send
    // - On/off commands
    // - Dim up/dim down commands

    async onAdded() {
        // This device has just been added by Homey
        this.log('Device: onAdded...');
    }

    async onDeleted() {
        // This device has just been deleted by Homey
        this.log('Device: onDeleted...');
    }

    SendCommand() {
    }

    async onMeshInit() {
        // Enable debugging
        this.enableDebug();

        // Print information about the device's available commands
        //this.printNode();
    }

    //**********************************************************************
    // onSettings
    //**********************************************************************
    async onSettings_xxx(oldSettings, newSettings, changedKeysArr) {
        super.onSettings(oldSettings, newSettings, changedKeysArr);
    }

}

module.exports = MTN50X2XX;
