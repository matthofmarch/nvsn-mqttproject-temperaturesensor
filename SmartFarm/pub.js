var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://52.157.91.193')
var topic = 'sensors/hrazdera/ts1'
var topicH = 'sensors/hrazdera/hs1'

        client.on('connect', ()=>{
            setInterval(()=>{
                var sensor = require("node-dht-sensor");
                sensor.read(22, 4, function(err, temperature, humidity){
                    if (!err){
                        var message= {
                            type: "temperature",
                            value: temperature,
                            unit: "°C",
                        }
                        var messageHumidity= {
                            type: "humidity",
                            value: humidity,
                            unit: "%"
                        }
                        client.publish(topic, JSON.stringify(message))
                        client.publish(topicH, JSON.stringify(messageHumidity))
                        console.log('Message sent!', message)
                        console.log('Message sent!', messageHumidity)
                    }
                })
            }, 1000)
    })