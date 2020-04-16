var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://51.136.13.51')//mqtt server
var topic = 'sensors/hrazdera/ts1'//topic Temperatur
var topicH = 'sensors/hrazdera/hs1'//topic Temepartur

        client.on('connect', ()=>{ //verbindung
            setInterval(()=>{
                var sensor = require("node-dht-sensor");
                sensor.read(22, 4, function(err, temperature, humidity){
                    if (!err){ 
                        var message= {//Json Object
                            type: "temperature",
                            value: temperature,
                            unit: "°C",
                        }
                        var messageHumidity= {//Json Object
                            type: "humidity",
                            value: humidity,
                            unit: "%"
                        }
                        client.publish(topic, JSON.stringify(message))//senden
                        client.publish(topicH, JSON.stringify(messageHumidity))//senden
                        console.log('Message sent!', message)//Ausgabe fuer mich
                        console.log('Message sent!', messageHumidity)//Ausgabe fuer mich
                    }
                })
            }, 1000)//Jede Sekunde wird gemessen
    })