'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

var startDimValue = -1;
var endDimValue = -1;
var isDimmingDown = false;

//**********************************************************************
//
// MTN507900
//
//**********************************************************************
class MTN507900 extends ZwaveDevice {

    //**********************************************************************
    // onAdded
    //**********************************************************************
    async onAdded() {
        // This device has just been added by Homey
        this.log('Device: onAdded...');
    }

    //**********************************************************************
    // onDeleted
    //**********************************************************************
    async onDeleted() {
        // This device has just been deleted by Homey
        this.log('Device: onDeleted...');
    }

    //**********************************************************************
    // onMeshInit
    //**********************************************************************
    async onMeshInit() {
this.log('Device: onMeshInit...');
        // Enable debugging
        this.enableDebug();

        // Print information about the device's available commands
        //this.printNode();
        
        //----------------------------------------------------------------------
        // onoff
        //----------------------------------------------------------------------
        // External On/off commands will be handled automatically by Homey
        this.registerCapability(
            'onoff',
            'SWITCH_MULTILEVEL', {
                'report': 'SWITCH_MULTILEVEL_SET'
            }
        );

        //----------------------------------------------------------------------
        // dim
        //----------------------------------------------------------------------
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
this.log("STEK onoff, dim, value: ", oldOnoffValue, oldDimValue, newDimValue);

                if (newDimValue !== oldDimValue || newOnoffValue !== oldOnoffValue) {
                    this.setCapabilityValue('onoff', newOnoffValue);
                    this.setCapabilityValue('dim', newDimValue);
                }

                return true;
            }
        );

        //await this.configurationSet({ id: '196' }, 0);
    }

    //**********************************************************************
    // onSettings
    //**********************************************************************
    async onSettings(oldSettings, newSettings, changedKeysArr) {
this.log('onSettings...');
        // Runs when the user has changed the device's settings in Homey.
        // changedKeysArr contains an array of keys that have been changed

        // If the settings must not be saved for whatever reason:
        // throw new Error('Your error message');

//this.log(oldSettingsObj, newSettingsObj, changedKeysArr);

        //var arrayLength = changedKeysArr.length;
//this.log(arrayLength);
        /*
        //----------------------------------------------------------------------
        // Send the changed settings values to the device
        //----------------------------------------------------------------------
        for (var i = 0; i < arrayLength; i++) {
            var key = changedKeysArr[i];
            var idx = Number(key);
            var newValue = newSettingsObj[key];

            this.configurationSet(
                {
                    "index": idx,
                    "size": 1,
                    "id": key,
                    "signed": false,
                    "useSettingParser": true
                },
                newValue
            )
                .catch(this.error);
        }
        */
        super.onSettings(oldSettings, newSettings, changedKeysArr);

this.log('...onSettings');
    }

    /*
    //**********************************************************************
    // ready
    //**********************************************************************
    ready(callback) {
this.log('Device: ready...');
    }
    */
}

module.exports = MTN507900;
