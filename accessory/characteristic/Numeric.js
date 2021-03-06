'use strict';

const {getState, setState} = require('../../util/Accessory');

const NUMERIC_CONFIG = {
    item: "item"
};

function addNumericSensorCharacteristic(service, characteristic, CONF_MAP, optional) {
    try {

        let [item] = this._getAndCheckItemType(CONF_MAP.item, ['Number']);

        this._log.debug(`Creating numeric sensor characteristic for ${this.name} with ${item}`);

        characteristic.on('get', getState.bind(this,
            item,
            parseFloat
        ));

        this._subscribeCharacteristic(characteristic,
            item,
            parseFloat
        );
    } catch(e) {
        let msg = `Not configuring numeric sensor characteristic for ${this.name}: ${e.message}`;
        service.removeCharacteristic(characteristic);
        if(optional) {
            this._log.debug(msg);
        } else {
            throw new Error(msg);
        }
    }
}

function addNumericActorCharacteristic(service, characteristic, CONF_MAP, optional) {
    try {

        let [item] = this._getAndCheckItemType(CONF_MAP.item, ['Number']);

        this._log.debug(`Creating numeric actor characteristic for ${this.name} with ${item}`);

        characteristic.on('set', setState.bind(this,
            item,
            parseFloat
        ));

        this._subscribeCharacteristic(characteristic,
            item,
            parseFloat
        );
    } catch(e) {
        let msg = `Not configuring numeric actor characteristic for ${this.name}: ${e.message}`;
        service.removeCharacteristic(characteristic);
        if(optional) {
            this._log.debug(msg);
        } else {
            throw new Error(msg);
        }
    }
}

function addNumericSensorActorCharacteristic(service, characteristic, CONF_MAP, optional) {
    try {

        let [item] = this._getAndCheckItemType(CONF_MAP.item, ['Number']);

        this._log.debug(`Creating numeric sensor/actor characteristic for ${this.name} with ${item}`);

        characteristic.on('set', setState.bind(this,
            item,
            parseFloat
        ))
        .on('get', getState.bind(this,
            item,
            parseFloat
        ));

        this._subscribeCharacteristic(characteristic,
            item,
            parseFloat
        );
    } catch(e) {
        let msg = `Not configuring numeric actor characteristic for ${this.name}: ${e.message}`;
        service.removeCharacteristic(characteristic);
        if(optional) {
            this._log.debug(msg);
        } else {
            throw new Error(msg);
        }
    }
}

function addCurrentRelativeHumidityCharacteristic(service) {
    addNumericSensorCharacteristic.bind(this)(service, service.getCharacteristic(this.Characteristic.CurrentRelativeHumidity), NUMERIC_CONFIG);
}

function addCurrentAmbientLightLevelCharacteristic(service) {
    addNumericSensorCharacteristic.bind(this)(service, service.getCharacteristic(this.Characteristic.CurrentAmbientLightLevel), NUMERIC_CONFIG);
}

function addCurrentTemperatureCharacteristic(service) {
    addNumericSensorCharacteristic.bind(this)(service, service.getCharacteristic(this.Characteristic.CurrentTemperature), NUMERIC_CONFIG);
}

function addAirQualityCharacteristic(service) {
    addNumericSensorCharacteristic.bind(this)(service, service.getCharacteristic(this.Characteristic.AirQuality), NUMERIC_CONFIG);
}


module.exports = {
    addCurrentRelativeHumidityCharacteristic,
    addCurrentAmbientLightLevelCharacteristic,
    addCurrentTemperatureCharacteristic,
    addNumericSensorCharacteristic,
    addNumericSensorActorCharacteristic,
    addAirQualityCharacteristic,
};
