'use strict';

const Homey = require('homey');

// SchneiderMertenApp
class SchneiderMertenApp extends Homey.App {

	onInit() {
		this.log(`${Homey.manifest.id} running...`);
	}

}

module.exports = SchneiderMertenApp;
