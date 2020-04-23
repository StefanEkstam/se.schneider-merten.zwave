'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

// MTN507501, Radio receiver, 1-gang switch
class MTN507501 extends ZwaveDevice {

    async onAdded() {
        // This device has just been added by Homey
        this.log('MTN507501: ZwaveDevice.onAdded...');
    }

    async onDeleted() {
        // This device has just been deleted by Homey
        this.log('MTN507501: ZwaveDevice.onDeleted...');
    }

    async onMeshInit() {
        // Enable debugging
        this.enableDebug();

        // Print information about the device's available commands
        this.printNode();
        
        // External On/off commands will be handled automatically by Homey
        this.registerCapability(
            'onoff',
            'SWITCH_BINARY'
        );
        /*
        this.registerCapability(
            'onoff',
            'SWITCH_MULTILEVEL', {
                'report': 'SWITCH_MULTILEVEL_SET'
            }
        );
        */
    }

    async onSettings(oldSettings, newSettings, changedKeysArr) {
        super.onSettings(oldSettings, newSettings, changedKeysArr);
    }

}

module.exports = MTN507501;
