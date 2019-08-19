'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

var startDimValue = -1;
var endDimValue = -1;
var isDimmingDown = false;

//**********************************************************************
//
// MTN50X2XX
//
//**********************************************************************
class MTN50X2XX extends ZwaveDevice {

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
        //this.printNode();


        //----------------------------------------------------------------------
        // measure_battery
        //----------------------------------------------------------------------
        /*
        this.registerCapability(
            'measure_battery',
            'BATTERY'
        );
        */


/*        
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

/*
this.log("registerCapability onoff...");
        this.registerCapability(
            'onoff',
            'SWITCH_MULTILEVEL', {
                'report': 'SWITCH_MULTILEVEL_SET',
                'reportParserOverride': true,
                'reportParser': (report) => {
this.log("STEK, report: ", report);
/*
                    var luminance = 0;
                    if (report['Sensor Type'] === 'Luminance (version 1)') {
                        luminance = Number(report['Sensor Value (Parsed)']);
                    }
* /
return { 'Value': 255 };
                }
            }
        );
*/

/*
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

/*
        this.registerReportListener(
            'SWITCH_MULTILEVEL',
            'SWITCH_MULTILEVEL_SET', (rawReport, parsedReport) => {
                if (parsedReport === 'undefined') {
                    return true;
                }
                
this.log("========== SWITCH_MULTILEVEL_SET called...", rawReport, parsedReport);
                var value = rawReport['Value (Raw)'][0];

this.log("Value from SWITCH_MULTILEVEL_SET: ", value);
                if (value === 0 || value === 255) {
                    // On or off, do not change the dim value
                    return true;
                }
/*
                this.node.CommandClass.COMMAND_CLASS_SWITCH_MULTILEVEL.SWITCH_MULTILEVEL_GET({
                })
                    .then(x => {
                        this.log("STEK: Log, second (SMG)!");
                        var value = x['Value (Raw)'][0];
this.log("Value from SWITCH_MULTILEVEL_GET: ", value);
                        endDimValue = value / 63;
this.log("endDimValue: ", endDimValue);
                        //this.setCapabilityValue('dim', endDimValue);
                    })
                    .catch(x => {
                        this.error;
                    });
* /

                var endDimValue = -1;
                if (value === 0) {
                    endDimValue = 0;
                } else if (value === 255) {
                    endDimValue = 1;
                } else {
                    /*
                    endDimValue = startDimValue + value / 255;
                    if (isDimmingDown === true) {
                        endDimValue = startDimValue - value / 255;
                    }


                    var xxxyyy = this.getCapabilityValue('onoff');
                    this.log("STEK onoff value: ", xxxyyy);
                    var xxyyy = this.getCapabilityValue('dim');
                    this.log("STEK dim value: ", xxyyy);
                    * /
                    endDimValue = value / 100;
                }

                //endDimValue = x / 63;

                //}

                //this.setCapabilityValue('dim', endDimValue);

                return true;
            }
        );
*/

/*
        this.registerCapabilityListener(
            'onoff', (value, opts) => {
                this.log("STEK: rcl onoff...");
            }
        );

        this.registerCapabilityListener(
            'dim', (value, opts) => {
                this.log("STEK: rcl dim...");
            }
        );
*/


/*
        this.registerCapabilityListener('measure_temperature', (value, opts) => {
            return Promise.resolve();
        });
*/

        // Test: Set settings
/*
this.log('setSettings...');
        this.setSettings({
            3: false,
            "zw_wakeup_interval": 360,
            "zw_wakeup_enabled": true
        })
            .catch(this.error);
*/

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

                /*
                // Inget fel, men returnerar null
                node.CommandClass.COMMAND_CLASS_VERSION.VERSION_COMMAND_CLASS_GET({
                    "Value": true
                })
                    .catch(x => {
                        this.log("STEK: Error, second catch (CCG)!");
                        this.error;
                    })
                    .then(x => {
                        this.log("STEK: Log, second (CCG)!");
                        this.log(x);
                        this.log("----------");
                    });

                // Inget fel, men returnerar null
                node.CommandClass.COMMAND_CLASS_CONFIGURATION.CONFIGURATION_BULK_GET({
                    "Value": true
                })
                    .catch(x => {
                        this.log("STEK: Error, second catch (CBG)!");
                        this.error;
                    })
                    .then(x => {
                        this.log("STEK: Log, second (CBG)!");
                        this.log(x);
                        this.log("----------");
                    });
                */

                /*
                // Returnerar PROTECTION_REPORT (?)
                node.CommandClass.COMMAND_CLASS_PROTECTION.PROTECTION_GET({
                    "Value": true
                })
                    .catch(x => {
                        this.log("STEK: Error, second catch (PG)!");
                        this.error;
                    })
                    .then(x => {
                        this.log("STEK: Log, second (PG)!");
                        this.log(x);
                        this.log("----------");
                    });

                // Returnerar PROTECTION_SUPPORTED_REPORT (?)
                node.CommandClass.COMMAND_CLASS_PROTECTION.PROTECTION_SUPPORTED_GET({
                    "Value": true
                })
                    .catch(x => {
                        this.log("STEK: Error, second catch (PSG)!");
                        this.error;
                    })
                    .then(x => {
                        this.log("STEK: Log, second (PSG)!");
                        this.log(x);
                        this.log("----------");
                    });
                */

                /*
                // Returnerar "included in the all on/all off functionality", sedan timeout
                node.CommandClass.COMMAND_CLASS_SWITCH_ALL.SWITCH_ALL_GET({
                    "Value": 0
                })
                    .catch(x => {
                        this.log("STEK: Error, second catch (SAG)!");
                        this.error;
                    })
                    .then(x => {
                        this.log("STEK: Log, second (SAG)!");
                        this.log(x);
                        this.log("----------");
                    });
                */

                /*
                // TRANSMIT_COMPLETE_OK, sedan timeout
                node.CommandClass.COMMAND_CLASS_SWITCH_ALL.SWITCH_ALL_ON({
                    "Value": 0
                })
                    .catch(x => {
                        this.log("STEK: Error, second catch (SAOn)!");
                        this.error;
                    })
                    .then(x => {
                        this.log("STEK: Log, second (SAOn)!");
                        this.log(x);
                        this.log("----------");
                    });

                // TRANSMIT_COMPLETE_OK, sedan timeout
                node.CommandClass.COMMAND_CLASS_SWITCH_ALL.SWITCH_ALL_OFF({
                    "Value": 0
                })
                    .catch(x => {
                        this.log("STEK: Error, second catch (SAOff)!");
                        this.error;
                    })
                    .then(x => {
                        this.log("STEK: Log, second (SAOff)!");
                        this.log(x);
                        this.log("----------");
                    });

                // Inget fel, men returnerar null
                node.CommandClass.COMMAND_CLASS_CONFIGURATION.CONFIGURATION_GET({
                    "Value": 1
                })
                    .catch(x => {
                        this.log("STEK: Error, second catch (CG)!");
                        this.error;
                    })
                    .then(x => {
                        this.log("STEK: Log, second (CG)!");
                        this.log(x);
                        this.log("----------");
                    });

                // Inget fel, men returnerar null
                node.CommandClass.COMMAND_CLASS_MULTI_INSTANCE_ASSOCIATION.MULTI_INSTANCE_ASSOCIATION_GET({
                    "Value": 1
                })
                    .catch(x => {
                        this.log("STEK: Error, second catch (MIAG)!");
                        this.error;
                    })
                    .then(x => {
                        this.log("STEK: Log, second (MIAG)!");
                        this.log(x);
                        this.log("----------");
                    });

                // Fastnar i Catch, "undefined"
                node.CommandClass.COMMAND_CLASS_SWITCH_TOGGLE_MULTILEVEL.SWITCH_TOGGLE_MULTILEVEL_GET({
                    "Value": 1
                })
                    .catch(x => {
                        this.log("STEK: Error, second catch (STMG)!");
                        this.error;
                    })
                    .then(x => {
                        this.log("STEK: Log, second (STMG)!");
                        this.log(x);
                        this.log("----------");
                    });

                // Inget fel, men returnerar null
                node.CommandClass.COMMAND_CLASS_ASSOCIATION.ASSOCIATION_GET({
                    "Value": 1
                })
                    .catch(x => {
                        this.log("STEK: Error, second catch (AG)!");
                        this.error;
                    })
                    .then(x => {
                        this.log("STEK: Log, second (AG)!");
                        this.log(x);
                        this.log("----------");
                    });
                */

                /*
                // Fastnar i Catch, "undefined"
                node.CommandClass.COMMAND_CLASS_SWITCH_MULTILEVEL.SWITCH_MULTILEVEL_GET({
                })
                    .catch(x => {
                        this.log("STEK: Error, second catch (SMG)!");
                        this.error;
                    })
                    .then(x => {
                        this.log("STEK: Log, second (SMG)!");
                        this.log(x);
                        this.log("----------");
                    });
                */

                /*
                // OK
                node.CommandClass.COMMAND_CLASS_SWITCH_MULTILEVEL.SWITCH_MULTILEVEL_SET({
                    "Value": "on/enable"
                })
                    .then(x => {
                        this.log("STEK: Log, second (SMS)!");
                        this.log(x);
                        this.log("----------");
                    })
                    .catch(x => {
                        this.log("STEK: Error, second catch (SMS)!");
                        this.error;
                        this.log("??????????");
                    });
                */

                /*
                // Fastnar i Catch, "undefined"
                node.CommandClass.COMMAND_CLASS_SWITCH_TOGGLE_MULTILEVEL.SWITCH_TOGGLE_MULTILEVEL_GET({
                    "Value": 1
                })
                    .catch(x => {
                        this.log("STEK: Error, second catch (STMG)!");
                        this.error;
                    })
                    .then(x => {
                        this.log("STEK: Log, second (STMG)!");
                        this.log(x);
                        this.log("----------");
                    });
                */

                /*
                node.CommandClass.COMMAND_CLASS_SWITCH_MULTILEVEL.SWITCH_MULTILEVEL_SET({
                    "Value": 4
                })
                    .then(x => {
                        this.log("STEK: Log, second (SMS)!");
                        this.log(x);
                        this.log("----------");
                    })
                    .catch(x => {
                        this.log("STEK: Error, second catch (SMS)!");
                        this.error;
                        this.log("??????????");
                    });
                */
/*
            });
*/

        //this.setCapabilityValue('onoff', true);

/*
        Homey.ManagerZwave.getNode(this)
            .then(node => {
//this.log(node);
//this.log(node.CommandClass);
//this.log(node.CommandClass['COMMAND_CLASS_VERSION']);
this.log('STEK: Send commands...');
                //node.CommandClass['COMMAND_CLASS_BASIC'].BASIC_GET();
                //node.CommandClass['COMMAND_CLASS_VERSION'].VERSION_GET();
                //node.CommandClass['COMMAND_CLASS_MANUFACTURER_SPECIFIC'].MANUFACTURER_SPECIFIC_GET();
                node.CommandClass['COMMAND_CLASS_VERSION'].VERSION_COMMAND_CLASS_GET(0);
                node.CommandClass['COMMAND_CLASS_SWITCH_MULTILEVEL'].SWITCH_MULTILEVEL_SET(0);
                node.CommandClass['COMMAND_CLASS_SWITCH_ALL'].SWITCH_ALL_ON(0);
                node.CommandClass['COMMAND_CLASS_SWITCH_ALL'].SWITCH_ALL_OFF(0);
                node.CommandClass['COMMAND_CLASS_VERSION'].VERSION_GET(0);
                node.CommandClass['COMMAND_CLASS_CONFIGURATION'].CONFIGURATION_GET(0);
this.log('STEK: ...Send commands');
            }, node => {
                this.log('Rejected?');
            }
            );
*/


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

module.exports = MTN50X2XX;
