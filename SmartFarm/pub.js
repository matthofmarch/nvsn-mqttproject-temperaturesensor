var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://52.157.91.193')
var topic = 'sensors/temperature/ts1'
var topicH = 'sensors/temperature/hs1'

        client.on('connect', ()=>{
            setInterval(()=>{
                var sensor = require("node-dht-sensor");
                sensor.read(22, 4, function(err, temperature, humidity){
                    if (!err){
                        var message= {
                            sensorName: "ts1",
                            double: temperature,
                            tempUnit: "°C",
                        }
                        var messageHumidity= {
                            sensorName: "hs1",
                            float: humidity,
                            tempUnit: "%"
                        }
                        client.publish(topic, JSON.stringify(message))
                        client.publish(topicH, JSON.stringify(messageHumidity))
                        console.log('Message sent!', message)
                        console.log('Message sent!', messageHumidity)
                    }
                })
            }, 1000)
    })