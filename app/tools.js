/** @function listProperties
* Lists all of the properties for a given object.
*/
export function listProperties(object) {
 for(var key in object) {
   try{
     console.log('Key: ' + key + ' | value: ' + object[key]);
     // recursion breaks the simulator
     // if ( object[key] == '[object Object]') {
     //   listProperties(object[key], '    ' + key + '.');
     // }
   } catch (error) {
    // Some values throw an error when trying to access them.
    console.log('Key: ' + key + ' | Error: ' + error.message);
   }
  }   
}