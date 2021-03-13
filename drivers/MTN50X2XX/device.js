'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-zwavedriver').ZwaveDevice;

var startDimValue = -1;
var endDimValue = -1;
var isDimmingDown = false;

// MTN50X2XX, Radio push-button, 2-gang
class MTN50X2XX extends ZwaveDevice {

    // This device has no capabilities of its own.
    // It can not receive any specific commands.
    // It simply works as a sending device, that can send
    // - On/off commands
    // - Dim up/dim down commands (only works when directly associated with a Scheider/Merten dimmer device)
    // - Window blind commands

    async onAdded() {
        // This device has just been added by Homey
        this.log('Device: onAdded...');
    }

    async onDeleted() {
        // This device has just been deleted by Homey
        this.log('Device: onDeleted...');
    }

    async onNodeInit() {
        this.log("device: onNodeInit...")
        // Enable debugging
        this.enableDebug();

        // Print information about the device's available commands
        this.printNode();

        var node = this.node;

        /*
        this.registerCapability('onoff', 'SWITCH_MULTILEVEL', {
            set: 'SWITCH_MULTILEVEL_SET',
            setParserV4(value, options) {
                return {
                    Value: (value) ? 'on/enable' : 'off/disable',
                    'Dimming Duration': 'Default',
                };
            },
        });
        */

        node.CommandClass.COMMAND_CLASS_BASIC.on('report', (command, report) => {
            if (report.hasOwnProperty('Value (Raw)')) {
                let value = report['Value (Raw)'][0];

                let device = this;
                let tokens = {};
                let state = {};

                if (value === 0) {
                    this.driver.triggerOffButtonPressed(device, tokens, state);
                }
                else {
                    this.driver.triggerOnButtonPressed(device, tokens, state);
                }
			}
        });

        node.CommandClass.COMMAND_CLASS_SWITCH_MULTILEVEL.on('report', (command, report) => {
            this.log('device: MULTILEVEL');
            this.log(command.name);
            /*
            if (report.hasOwnProperty('Value (Raw)')) {
                this.log(report['Value (Raw)'][0]);
                let testStartTrigger = this.homey.flow.getTriggerCard('test_start');
                testStartTrigger.trigger()
                    .catch(this.error)
                    .then(this.log);
            }
            */
        });

        node.CommandClass.COMMAND_CLASS_BASIC_WINDOW_COVERING.on('report', (command, report) => {
            this.log(command.name);
            let level = 0;
            if (report.hasOwnProperty('Level (Raw)')) {
                level = report['Level (Raw)'][0];
            }

            let device = this;
            let tokens = {};
            let state = {};

            switch (command.name) {
                case 'BASIC_WINDOW_COVERING_START_LEVEL_CHANGE':
                    if (level === 0) {
                        this.driver.triggerRaiseShutterButtonPressed(device, tokens, state);
                    }
                    else {
                        this.driver.triggerLowerShutterButtonPressed(device, tokens, state);
                    }
                    break;
                case 'BASIC_WINDOW_COVERING_STOP_LEVEL_CHANGE':
                    this.driver.triggerRaiseOrLowerShutterButtonReleased(device, tokens, state);
                    break;
            }
        });
    }

    //**********************************************************************
    // onSettings
    //**********************************************************************
    async onSettings_xxx(oldSettings, newSettings, changedKeysArr) {
        super.onSettings(oldSettings, newSettings, changedKeysArr);
    }
}

module.exports = MTN50X2XX;
