const PORTMAP = require("../config/port_mapping");

module.exports.portGenerator = (id) => {
    let port;
    console.log(PORTMAP);
    PORTMAP.forEach(portMap => {
        if(portMap.id === id) port = portMap.port;
    });
    return port;
}