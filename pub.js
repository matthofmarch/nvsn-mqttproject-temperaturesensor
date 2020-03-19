var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1234')
var topic = 'sensors/temperature/ts1'

        client.on('connect', ()=>{
            setInterval(()=>{
                var sensor = require("node-dht-sensor");
                sensor.read(22, 4, function(err, temperature, humidity){
                    if (!err){
                        var message= {
                            sensorName: "ts1",
                            double: temperature,
                            tempUnit: "°C",
                            float: humidity
                        }
                        client.publish(topic, JSON.stringify(message))
                        console.log('Message sent!', message)
                    }
                })
            }, 500)
    })