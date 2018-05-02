import { me as device } from 'device';

/** @class DeviceInfo
* Has information about the device (watch)
*/
export class DeviceInfo {
  
  type = device.type;
  modelName = device.modelName;
  modelID = device.modelId;
  firmwareVersion = device.firmwareVersion;
  squareButtonIconSize = 0;
    
  /**
   * Create a DeviceInfo
  */
  constructor() {      
    if (device.modelName === "Versa") {
      this.screenHeight = 300;
      this.screenWidth = 300;
    } else {
      // Default to the ionic
      this.screenHeight = 250;
      this.screenWidth = 348;         
    }
    this.squareButtonIconSize = this.screenHeight / 4;
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