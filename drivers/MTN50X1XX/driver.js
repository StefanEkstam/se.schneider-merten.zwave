'use strict';

const Homey = require('homey');

class MTN50X1XX extends Homey.Driver {

    onInit() {
        this.log("MTN50X1XX driver: onInit...");
        super.onInit();

        this.onButtonPressed = this.homey.flow.getDeviceTriggerCard('on_button_pressed');
        this.offButtonPressed = this.homey.flow.getDeviceTriggerCard('off_button_pressed');
        this.raiseShutterButtonPressed = this.homey.flow.getDeviceTriggerCard('start_raising_shutter');
        this.lowerShutterButtonPressed = this.homey.flow.getDeviceTriggerCard('start_lowering_shutter');
        this.raiseOrLowerShutterButtonReleased = this.homey.flow.getDeviceTriggerCard('stop_moving_shutter');
    }

    triggerOnButtonPressed(device, tokens, state) {
        this.onButtonPressed.trigger(device, tokens, state)
            .then(this.log("Flow triggered!"))
            .catch(this.error);
    }

    triggerOffButtonPressed(device, tokens, state) {
        this.offButtonPressed.trigger(device, tokens, state)
            .then(this.log("Flow triggered!"))
            .catch(this.error);
    }

    triggerRaiseShutterButtonPressed(device, tokens, state) {
        this.raiseShutterButtonPressed.trigger(device, tokens, state)
            .then(this.log("Flow triggered!"))
            .catch(this.error);
    }

    triggerLowerShutterButtonPressed(device, tokens, state) {
        this.lowerShutterButtonPressed.trigger(device, tokens, state)
            .then(this.log("Flow triggered!"))
            .catch(this.error);
    }

    triggerRaiseOrLowerShutterButtonReleased(device, tokens, state) {
        this.raiseOrLowerShutterButtonReleased.trigger(device, tokens, state)
            .then(this.log("Flow triggered!"))
            .catch(this.error);
    }
}

module.exports = MTN50X1XX;
