//MQTT publisher mqtt://localhost:1234

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://52.157.91.193')
var topic = 'sensors/temperature/ts1'
var message = {
    sensorName: "ts1",
    value: 23.9,
    tempUnit: "°C"
}

client.on('connect', ()=>{
    setInterval(()=>{
        client.publish(topic, JSON.stringify(message))
        console.log('Message sent!', message)
    }, 5000)
})