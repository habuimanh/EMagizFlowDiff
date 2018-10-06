'{
"name": "m.srouting.process",
    "version": "3.0.0",
        "components": [
            {
                "$$metaData": {
                    "objectType": "EMagiz_HornetQ.HornetQUserCredentialsConnectionFactoryAdapter",
                    "guid": 75998243711888423,
                    "componentType": "Support object",
                    "label": "support.bus-connection-plain",
                    "x": 1000,
                    "y": 50,
                    "flippedHorizontally": false
                },
                "targetConnectionFactory1": {
                    "$$metaData": {
                        "objectType": "EMagiz_HornetQ.HornetQConnectionFactory",
                        "guid": 73183493944781863
                    },
                    "constructor_arg_12": [
                        {
                            "$$metaData": {
                                "objectType": "EMagiz_HornetQ.NettyConnectorTransportConfiguration",
                                "guid": 89790517570710466
                            },
                            "_class": "com.emagiz.components.hornetq.NettyConnectorTransportConfiguration",
                            "host": "${m.jms01.host}",
                            "httpEnabled": false,
                            "httpRequiresSessionId": false,
                            "keyStorePassword": "p!XechPz-0SkzB_n6HddAC-ukFm9Njch21gQwU3C@",
                            "keyStorePath": "resources/00-001760_m-client-keystore.jks",
                            "port": "${m.jms01.port}",
                            "sslEnabled": true,
                            "tcpNoDelay": true,
                            "trustStorePassword": "TmK6TFi2vUo_R4I@SXxg439aoh6OuvosbbhOqn",
                            "trustStorePath": "resources/00-001761_m-client-truststore.jks",
                            "useNio": false,
                            "useNioGlobalWorkerPool": false,
                            "useServlet": false
                        }
                    ],
                    "_class": "org.hornetq.jms.client.HornetQJMSConnectionFactory",
                    "_destroy_method": "close",
                    "autoGroup": false,
                    "blockOnAcknowledge": false,
                    "blockOnDurableSend": true,
                    "blockOnNonDurableSend": false,
                    "cacheLargeMessagesClient": false,
                    "compressLargeMessage": false,
                    "constructor_arg_0": false,
                    "failoverOnInitialConnection": false,
                    "maxRetryInterval": 4000,
                    "preAcknowledge": false,
                    "reconnectAttempts": 4,
                    "retryInterval": 500,
                    "retryIntervalMultiplier": 2,
                    "useGlobalPools": true
                },
                "_class": "org.springframework.jms.connection.UserCredentialsConnectionFactoryAdapter",
                "_id": "m.srouting.process.support.bus-connection-plain",
                "password": "${m.jms.password}",
                "username": "${m.jms.username}"
            },
            {
                "$$metaData": {
                    "objectType": "EMagiz_Core.CONTEXT_property_placeholder",
                    "guid": 18577348462914598,
                    "componentType": "Support object",
                    "label": "Property placeholder",
                    "x": 1000,
                    "y": 200,
                    "flippedHorizontally": false
                },
                "_ignore_resource_not_found": false,
                "_ignore_unresolvable": false,
                "_local_override": false,
                "_id": "b"
            },
            {
                "$$metaData": {
                    "objectType": "EMagiz_Core.SI_message_history",
                    "guid": 203506408161814490,
                    "componentType": "Support object",
                    "label": "Message history",
                    "x": 1000,
                    "y": 275,
                    "flippedHorizontally": false
                },
                "_id": "a"
            },
            {
                "$$metaData": {
                    "objectType": "EMagiz_Core.CachingConnectionFactory",
                    "guid": 35184372088840003,
                    "componentType": "Support object",
                    "label": "support.bus-connection-caching",
                    "x": 1000,
                    "y": 125,
                    "flippedHorizontally": false
                },
                "targetConnectionFactoryRef": "m.srouting.process.support.bus-connection-plain",
                "_class": "com.emagiz.components.jms.CachingConnectionFactory",
                "_id": "m.srouting.process.support.bus-connection-caching",
                "cacheConsumers": true,
                "cacheProducers": true,
                "reconnectOnException": true,
                "reconnectOnFailover": false
            },
            {
                "$$metaData": {
                    "objectType": "EMagiz_Core.SI_channel",
                    "guid": 89227567617306160,
                    "componentType": "Channel"
                },
                "_id": "m.srouting.process.channel.exception"
            },
            {
                "$$metaData": {
                    "objectType": "EMagiz_Core.SI_channel",
                    "guid": 89227567617306161,
                    "componentType": "Channel"
                },
                "_id": "m.srouting.process.channel.error"
            },
            {
                "$$metaData": {
                    "objectType": "EMagiz_Core.ErrorToXmlTransformerInvoker",
                    "guid": 106397541196637170,
                    "componentType": "Transformer",
                    "label": "transform.error",
                    "x": 100,
                    "y": 337,
                    "flippedHorizontally": false
                },
                "H": {
                    "$$metaData": {
                        "objectType": "EMagiz_Core.ErrorToXmlTransformer",
                        "guid": 149181737656656882
                    },
                    "_class": "com.emagiz.components.error.ErrorToXmlTransformer",
                    "contextId": "886f3eb9-1685-41ef-8ca1-872b58d16338",
                    "omitPayload": false,
                    "omitStackTrace": true,
                    "restoreHeaders": "SERIALIZABLE"
                },
                "_input_channel__0": "m.srouting.process.channel.exception",
                "_output_channel__0": "m.srouting.process.channel.error",
                "_id": "m.srouting.process.transform.error",
                "_method": "transform"
            },
            {
                "$$metaData": {
                    "objectType": "EMagiz_Core.JMS_outbound_channel_adapter",
                    "guid": 96827391988479568,
                    "componentType": "Outbound channel adapter",
                    "label": "send.error",
                    "x": 275,
                    "y": 337,
                    "flippedHorizontally": false
                },
                "_channel__0": "m.srouting.process.channel.error",
                "_connection_factory1": "m.srouting.process.support.bus-connection-caching",
                "_delivery_persistent": true,
                "_destination_name": "async.m.error",
                "_explicit_qos_enabled": false,
                "_extract_payload": false,
                "_id": "m.srouting.process.send.error",
                "_pub_sub_domain": false
            },
            {
                "$$metaData": {
                    "objectType": "EMagiz_Core.SI_channel",
                    "guid": 89227567617306162,
                    "componentType": "Channel"
                },
                "_id": "m.srouting.process.channel.request"
            },
            {
                "$$metaData": {
                    "objectType": "EMagiz_Core.SI_channel",
                    "guid": 89227567617306163,
                    "componentType": "Channel"
                },
                "_id": "m.srouting.process.channel.response"
            },
            {
                "$$metaData": {
                    "objectType": "EMagiz_Core.JMS_inbound_gateway",
                    "guid": 47569271064103565,
                    "componentType": "Inbound gateway",
                    "label": "receive.request",
                    "x": 75,
                    "y": 75,
                    "flippedHorizontally": true
                },
                "_connection_factory6": "m.srouting.process.support.bus-connection-plain",
                "_error_channel__0": "m.srouting.process.channel.exception",
                "_reply_channel__0": "m.srouting.process.channel.response",
                "_request_channel__0": "m.srouting.process.channel.request",
                "_acknowledge": "auto",
                "_correlation_key": "JMSCorrelationID",
                "_default_reply_queue_name": "sync.m.routing.response",
                "_explicit_qos_enabled_for_replies": true,
                "_extract_reply_payload": true,
                "_extract_request_payload": true,
                "_id": "m.srouting.process.receive.request",
                "_recovery_interval": 20000,
                "_reply_delivery_persistent": false,
                "_reply_time_to_live": 20000,
                "_request_destination_name": "sync.m.routing.request",
                "_request_pub_sub_domain": false,
                "_subscription_durable": false
            },
            {
                "$$metaData": {
                    "objectType": "EMagiz_Core.SI_channel",
                    "guid": 89227567617306164,
                    "componentType": "Channel"
                },
                "_id": "m.srouting.process.channel.s1-syn"
            },
            {
                "$$metaData": {
                    "objectType": "EMagiz_Core.JMS_outbound_gateway",
                    "guid": 193654783976934029,
                    "componentType": "Outbound gateway",
                    "label": "send.s1-syn",
                    "x": 600,
                    "y": 52,
                    "flippedHorizontally": true
                },
                "ZD": {
                    "$$metaData": {
                        "objectType": "EMagiz_Core.JMS_reply_listener",
                        "guid": 182114309931796933
                    },
                    "_acknowledge": "auto",
                    "_recovery_interval": 20000
                },
                "_connection_factory7": "m.srouting.process.support.bus-connection-caching",
                "_reply_channel__0": "m.srouting.process.channel.response",
                "_request_channel__0": "m.srouting.process.channel.s1-syn",
                "_correlation_key": "JMSCorrelationID",
                "_delivery_persistent": false,
                "_explicit_qos_enabled": true,
                "_extract_reply_payload": true,
                "_extract_request_payload": true,
                "_id": "m.srouting.process.send.s1-syn",
                "_receive_timeout": 20000,
                "_reply_destination_name": "sync.s1.syn.offramp.response",
                "_reply_pub_sub_domain": false,
                "_request_destination_name": "sync.s1.syn.offramp.request",
                "_request_pub_sub_domain": false,
                "_time_to_live": 20000
            }
        ]
}
'