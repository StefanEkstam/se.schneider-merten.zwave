'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-zwavedriver').ZwaveDevice;

var startDimValue = -1;
var endDimValue = -1;
var isDimmingDown = false;

// MTN50X1XX, Radio push-button, 1-gang
class MTN50X1XX extends ZwaveDevice {

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
        this.log('Device: onNodeInit...');
        // Enable debugging
        this.enableDebug();

        // Print information about the device's available commands
        this.printNode();

        var node = this.node;

        node.CommandClass.COMMAND_CLASS_BASIC.on('report', (command, report) => {
            if (report.hasOwnProperty('Value (Raw)')) {
                let value = report['Value (Raw)'][0];
                this.log(value);

                /*
                let testStartTrigger = this.homey.flow.getTriggerCard(value === 0 ? 'off_button_pressed' : 'on_button_pressed');
                testStartTrigger.trigger()
                    .catch(this.error)
                    .then(this.log('...triggered'));
                */

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

/*
        this.registerReportListener(
            'SWITCH_MULTILEVEL',
            'SWITCH_MULTILEVEL_SET', (rawReport, parsedReport) => {
                if (parsedReport === 'undefined') {
                    return true;
                }
                
                var value = rawReport['Value (Raw)'][0];

                this.log("Value from SWITCH_MULTILEVEL_SET: ", value);
                if (value === 0 || value === 255) {
                    // On or off, do not change the dim value
                    return true;
                }

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
/*
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
*/
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

/*
        Homey.ManagerZwave.getNode(this)
            .then(node => {
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
    }

    //**********************************************************************
    // onSettings
    //**********************************************************************
    async onSettings_xxx(oldSettings, newSettings, changedKeysArr) {
        super.onSettings(oldSettings, newSettings, changedKeysArr);
    }

}

module.exports = MTN50X1XX;
