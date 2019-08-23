'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

var startDimValue = -1;
var endDimValue = -1;
var isDimmingDown = false;

//**********************************************************************
//
// MTN508XXX
//
//**********************************************************************
class MTN508XXX extends ZwaveDevice {

    // This device has no capabilities of its own.
    // It can not receive any specific commands.
    // It simply works as a sending device, that can send
    // - On/off commands
    // - Dim up/dim down commands

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
    SendCommand() {
    }

    //**********************************************************************
    // onMeshInit
    //**********************************************************************
    async onMeshInit() {
this.log('Device: onMeshInit...');
        // Enable debugging
        this.enableDebug();

        // Print information about the device's available commands
        this.printNode();

        //----------------------------------------------------------------------
        // Initialize the settings on the device
        // This is only necessary if the settings have been altered from the defaults
        //----------------------------------------------------------------------
        //const settings = this.getSettings();
//this.log(settings);
        //var changedKeysArr = ['196'];
        //this.onSettings(settings, settings, changedKeysArr);

/*
this.log('triggerCapabilityListener...');
        this.triggerCapabilityListener('measure_temperature', 35);
*/
/*
this.log('STEK: configurationGet...');
        var xxx = await this.configurationGet(
            {
                "index": 196
            }
        );
        this.log(xxx);
*/
        /*
        await this.configurationSet(
            {
                "index": 196,
                "size": 1,
                "id": "196",
                "signed": false,
                "useSettingParser": true
            },
            200
        );
*/

        //await this.configurationSet({ id: '0' }, 1);

/*
        var xxx = await this.configurationGet(
            {
                "index": 196
            }
        );
        this.log(xxx);
*/

        var node = this.node;
/*
this.log('getNode...');
        Homey.ManagerZwave.getNode(this)
            .catch(node => {
                this.log("STEK: Error, first catch!");
                //this.error
            })
            .then(node => {
*/
                //this.log("STEK: Log, first!");

                /*
                // Fastnar i Catch, "undefined"
                node.CommandClass.COMMAND_CLASS_BASIC.BASIC_GET({
                })
                    .catch(x => {
                        this.log("STEK: Error, second catch (BG)!");
                        this.error;
                    })
                    .then(x => {
                        this.log("STEK: Log, second (BG)!");
                        this.log(x);
                        this.log("----------");
                    });
                */
        /*
        node.CommandClass.COMMAND_CLASS_VERSION.VERSION_GET({
        })
            .then(x => {
                this.log("STEK: Log, second (VG)!");
                this.log(x);
                this.log("----------");
            })
            .catch(x => {
                this.log("STEK: Error, second catch (VG)!");
                this.error;
            });

        node.CommandClass.COMMAND_CLASS_CONFIGURATION.CONFIGURATION_GET({
        })
            .then(x => {
                this.log("STEK: Log, second (VG)!");
                this.log(x);
                this.log("----------");
            })
            .catch(x => {
                this.log("STEK: Error, second catch (VG)!");
                this.error;
            });

        node.CommandClass.COMMAND_CLASS_MANUFACTURER_SPECIFIC.MANUFACTURER_SPECIFIC_GET({
        })
            .then(x => {
                this.log("STEK: Log, second (MSG)!");
                this.log(x);
                this.log("----------");
            })
            .catch(x => {
                this.log("STEK: Error, second catch (MSG)!");
                this.error;
            });
        */

        node.CommandClass.COMMAND_CLASS_ASSOCIATION.ASSOCIATION_GET({
        })
            .then(x => {
                this.log("STEK: Log, second (AG)!");
                this.log(x);
                this.log("----------");
            })
            .catch(x => {
                this.log("STEK: Error, second catch (AG)!");
                this.error;
            });

        node.CommandClass.COMMAND_CLASS_MULTI_INSTANCE_ASSOCIATION.MULTI_INSTANCE_ASSOCIATION_GET({
        })
            .then(x => {
                this.log("STEK: Log, second (MIAG)!");
                this.log(x);
                this.log("----------");
            })
            .catch(x => {
                this.log("STEK: Error, second catch (MIAG)!");
                this.error;
            });

this.log('...getNode');
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

module.exports = MTN508XXX;
