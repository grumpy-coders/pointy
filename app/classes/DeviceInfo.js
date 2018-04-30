import { me as device } from 'device';

/** @class DeviceInfo
* Has information about the device (watch)
*/
export class DeviceInfo {
  
  type = device.type;
  modelName = device.modelName;
  modelID = device.modelId;
  firmwareVersion = device.firmwareVersion;
    
  /**
   * Create a DeviceInfo
  */
  constructor() {
    if (!device.screen) device.screen = { width: 348, height: 250 };
    this.screenHeight = device.screen.height;
    this.screenWidth = device.screen.width;
  }

  /**
   * Gets the last time the device was synced
   * @return {datetime} Returns void.
  */
   lastSynced() { return device.lastSyncTime; }

  /**
   * Gets a string version of the object.
   * @return {string} String version of the object.
  */
  toString() { return "modelName: " + this.modelName + " | firmwareVersion: " + this.firmwareVersion; }

};