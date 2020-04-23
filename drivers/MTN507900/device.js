'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

var startDimValue = -1;
var endDimValue = -1;
var isDimmingDown = false;

// MTN507900, Radio receiver, 1-gang universal dimmer
class MTN507900 extends ZwaveDevice {

    async onAdded() {
        // This device has just been added by Homey
        this.log('Device: onAdded...');
    }

    async onDeleted() {
        // This device has just been deleted by Homey
        this.log('Device: onDeleted...');
    }

    async onMeshInit() {
        // Enable debugging
        this.enableDebug();

        // Print information about the device's available commands
        //this.printNode();
        
        // External On/off commands will be handled automatically by Homey
        this.registerCapability(
            'onoff',
            'SWITCH_MULTILEVEL', {
                'report': 'SWITCH_MULTILEVEL_SET'
            }
        );

        // External dimming commands will be handled automatically by Homey,
        // though not perfectly, since the remembered dim value will sometimes
        // be overwritten
        this.registerCapability(
            'dim',
            'SWITCH_MULTILEVEL', {
                'report': 'SWITCH_MULTILEVEL_SET'
            }
        );

        this.registerReportListener(
            'SWITCH_MULTILEVEL',
            'SWITCH_MULTILEVEL_REPORT', (rawReport, parsedReport) => {
                var value = rawReport['Value (Raw)'][0];
                var newDimValue = value === 99 ? 1 : value / 100;
                var newOnoffValue = newDimValue > 0;
                var oldDimValue = this.getCapabilityValue('dim');
                var oldOnoffValue = this.getCapabilityValue('onoff');

                if (newDimValue !== oldDimValue || newOnoffValue !== oldOnoffValue) {
                    this.setCapabilityValue('onoff', newOnoffValue);
                    this.setCapabilityValue('dim', newDimValue);
                }

                return true;
            }
        );

        //await this.configurationSet({ id: '196' }, 0);
    }

    async onSettings(oldSettings, newSettings, changedKeysArr) {
        super.onSettings(oldSettings, newSettings, changedKeysArr);

    }
}

module.exports = MTN507900;
