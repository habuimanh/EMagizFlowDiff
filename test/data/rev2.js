export const rev2 = {
    "name": "test.swa.offramp",
    "version": "1.0.2",
    "components": [
        {
            "$$metaData": {
                "objectType": "EMagiz_HornetQ.HornetQUserCredentialsConnectionFactoryAdapter",
                "guid": "80783318315985259",
                "componentType": "Support object",
                "label": "support.bus-connection-plain",
                "x": 1000,
                "y": 50,
                "flippedHorizontally": false
            },
            "_class": "org.springframework.jms.connection.UserCredentialsConnectionFactoryAdapter",
            "_id": "test.swa.offramp.support.bus-connection-plain",
            "targetConnectionFactory": {
                "$$metaData": {
                    "objectType": "EMagiz_HornetQ.HornetQConnectionFactory",
                    "guid": "80220368362563948"
                },
                "_class": "org.hornetq.jms.client.HornetQJMSConnectionFactory",
                "_destroy_method": "close",
                "constructor_arg_1": [
                    {
                        "$$metaData": {
                            "objectType": "EMagiz_HornetQ.NettyConnectorTransportConfiguration",
                            "guid": "83035118129672209"
                        },
                        "_class": "com.emagiz.components.hornetq.NettyConnectorTransportConfiguration",
                        "host": "${swatest.jms01.host}",
                        "httpEnabled": "false",
                        "httpRequiresSessionId": "false",
                        "keyStorePassword": "4H9qlSf-w?-6_QPgOV6eddBDH2D@8uTN*+E3EZ03FJ",
                        "keyStorePath": "resources/00-019312_swatest-client-keystore.jks",
                        "port": "${swatest.jms01.port}",
                        "sslEnabled": "true",
                        "tcpNoDelay": "true",
                        "trustStorePassword": "tAiCoGVQdfl~jn4Wbe!g8Bbhsz6T0m4HDpxy",
                        "trustStorePath": "resources/00-019313_swatest-client-truststore.jks",
                        "useNio": "false",
                        "useNioGlobalWorkerPool": "false",
                        "useServlet": "false"
                    }
                ],
                "autoGroup": "false",
                "blockOnAcknowledge": "false",
                "blockOnDurableSend": "true",
                "blockOnNonDurableSend": "false",
                "cacheLargeMessagesClient": "false",
                "compressLargeMessage": "false",
                "confirmationWindowSize": "1048576",
                "constructor_arg_0": "false",
                "consumerMaxRate": "2",
                "consumerWindowSize": "0",
                "failoverOnInitialConnection": "false",
                "maxRetryInterval": "4000",
                "preAcknowledge": "false",
                "producerMaxRate": "2",
                "producerWindowSize": "0",
                "reconnectAttempts": "4",
                "retryInterval": "500",
                "retryIntervalMultiplier": "2.00000000",
                "useGlobalPools": "true"
            },
            "password": "${swatest.jms.password}",
            "username": "${swatest.jms.username}"
        },
        {
            "$$metaData": {
                "objectType": "EMagiz_Core.CONTEXT_property_placeholder",
                "guid": "21392098230036141",
                "componentType": "Support object",
                "label": "Property placeholder",
                "x": 1000,
                "y": 200,
                "flippedHorizontally": false
            },
            "_ignore_resource_not_found": "false",
            "_ignore_unresolvable": "false",
            "_local_override": "false"
        },
        {
            "$$metaData": {
                "objectType": "EMagiz_Core.SI_message_history",
                "guid": "58828270132551699",
                "componentType": "Support object",
                "label": "Message history",
                "x": 1000,
                "y": 275,
                "flippedHorizontally": false
            }
        },
        {
            "$$metaData": {
                "objectType": "EMagiz_Core.CachingConnectionFactory",
                "guid": "18577348462922782",
                "componentType": "Support object",
                "label": "support.bus-connection-caching",
                "x": 1000,
                "y": 125,
                "flippedHorizontally": false
            },
            "_class": "com.emagiz.components.jms.CachingConnectionFactory",
            "_id": "test.swa.offramp.support.bus-connection-caching",
            "targetConnectionFactoryRef": "80783318315985259",
            "cacheConsumers": "true",
            "cacheProducers": "true",
            "reconnectOnException": "true",
            "reconnectOnFailover": "false"
        },
        {
            "$$metaData": {
                "objectType": "EMagiz_Core.SI_channel",
                "guid": "54887620458625230",
                "componentType": "Channel"
            },
            "_id": "test.swa.offramp.channel.exception"
        },
        {
            "$$metaData": {
                "objectType": "EMagiz_Core.SI_channel",
                "guid": "54887620458625231",
                "componentType": "Channel"
            },
            "_id": "test.swa.offramp.channel.error"
        },
        {
            "$$metaData": {
                "objectType": "EMagiz_Core.ErrorToXmlTransformerInvoker",
                "guid": "24488322973852477",
                "componentType": "Transformer",
                "label": "transform.error",
                "x": 100,
                "y": 187,
                "flippedHorizontally": false
            },
            "_input_channel": "54887620458625230",
            "_output_channel": "54887620458625231",
            "_id": "test.swa.offramp.transform.error",
            "_method": "transform",
            "H": {
                "$$metaData": {
                    "objectType": "EMagiz_Core.ErrorToXmlTransformer",
                    "guid": "24206847997141822"
                },
                "_class": "com.emagiz.components.error.ErrorToXmlTransformer",
                "contextId": "0ea15371-2c87-4bea-898b-86c292d3ae0d",
                "omitPayload": "false",
                "omitStackTrace": "true",
                "restoreHeaders": "SERIALIZABLE"
            }
        },
        {
            "$$metaData": {
                "objectType": "EMagiz_Core.JMS_outbound_channel_adapter",
                "guid": "41095346599785585",
                "componentType": "Outbound channel adapter",
                "label": "send.error",
                "x": 240,
                "y": 187,
                "flippedHorizontally": false
            },
            "_channel": "54887620458625231",
            "_connection_factory": "18577348462922782",
            "_delivery_persistent": "true",
            "_destination_name": "async.swatest.error",
            "_explicit_qos_enabled": "false",
            "_extract_payload": "false",
            "_id": "test.swa.offramp.send.error",
            "_pub_sub_domain": "false"
        },
        {
            "$$metaData": {
                "objectType": "EMagiz_Core.SI_channel",
                "guid": "54887620458625232",
                "componentType": "Channel"
            },
            "_id": "test.swa.offramp.channel.cdm-unvalidated",
            "SI_interceptors": [
                {
                    "$$metaData": {
                        "objectType": "EMagiz_Core.SI_wire_tap",
                        "guid": "63050394783206037"
                    },
                    "_channel": "54887620458625235"
                }
            ]
        },
        {
            "$$metaData": {
                "objectType": "EMagiz_Core.JMS_message_driven_channel_adapter",
                "guid": "40813871623069858",
                "componentType": "Inbound channel adapter",
                "label": "receive.cdm",
                "x": 75,
                "y": 62,
                "flippedHorizontally": false
            },
            "_channel": "54887620458625232",
            "_connection_factory": "80783318315985259",
            "_error_channel": "54887620458625230",
            "_acknowledge": "transacted",
            "_destination_name": "async.test.swa.offramp",
            "_extract_payload": "true",
            "_id": "test.swa.offramp.receive.cdm",
            "_pub_sub_domain": "false",
            "_recovery_interval": "20000",
            "_subscription_durable": "false"
        },
        {
            "$$metaData": {
                "objectType": "EMagiz_Core.JMS_outbound_channel_adapter",
                "guid": "41095346599785586",
                "componentType": "Outbound channel adapter",
                "label": "send.destination",
                "x": 640,
                "y": 62,
                "flippedHorizontally": false
            },
            "_channel": "54887620458626329",
            "_connection_factory": "18577348462922782",
            "_delivery_persistent": "true",
            "_destination_name": "async.test.swa.exit",
            "_explicit_qos_enabled": "false",
            "_extract_payload": "false",
            "_id": "test.swa.offramp.send.destination",
            "_pub_sub_domain": "false"
        },
        {
            "$$metaData": {
                "objectType": "EMagiz_Core.SI_channel",
                "guid": "54887620458625235",
                "componentType": "Channel"
            },
            "_id": "test.swa.offramp.channel.wiretap"
        },
        {
            "$$metaData": {
                "objectType": "EMagiz_Core.SI_channel",
                "guid": "54887620458625236",
                "componentType": "Channel"
            },
            "_id": "test.swa.offramp.channel.file"
        },
        {
            "$$metaData": {
                "objectType": "EMagiz_Core.SI_transformer",
                "guid": "62768919806488093",
                "componentType": "Transformer",
                "label": "transform.attachment",
                "x": 500,
                "y": 187,
                "flippedHorizontally": false
            },
            "_input_channel": "54887620458625235",
            "_output_channel": "54887620458625236",
            "_expression": "headers.emagiz_ws_attachments[0].file",
            "_id": "test.swa.offramp.transform.attachment"
        },
        {
            "$$metaData": {
                "objectType": "EMagiz_Core.FILE_outbound_channel_adapter",
                "guid": "27866022694373985",
                "componentType": "Outbound channel adapter",
                "label": "send.file",
                "x": 640,
                "y": 187,
                "flippedHorizontally": false
            },
            "_channel": "54887620458625236",
            "_auto_create_directory": "true",
            "_delete_source_files": "false",
            "_directory": "${swa.dir}",
            "_filename_generator_expression": "'wiretap.png'",
            "_id": "test.swa.offramp.send.file",
            "_mode": "REPLACE"
        },
        {
            "$$metaData": {
                "objectType": "EMagiz_Core.SI_channel",
                "guid": "54887620458626329",
                "componentType": "Channel"
            },
            "_id": "test.swa.offramp.channel.with-header"
        },
        {
            "$$metaData": {
                "objectType": "EMagiz_Core.SI_header_enricher",
                "guid": "57420895248997916",
                "componentType": "Transformer",
                "label": "transform.add-header",
                "x": 500,
                "y": 62,
                "flippedHorizontally": false
            },
            "_input_channel": "54887620458625232",
            "_output_channel": "54887620458626329",
            "_id": "test.swa.offramp.transform.add-header",
            "_should_skip_nulls": "false",
            "M": [
                {
                    "$$metaData": {
                        "objectType": "EMagiz_Core.SI_header",
                        "guid": "57139420272287562"
                    },
                    "_name": "myHeader",
                    "_overwrite": "true",
                    "_value": "test"
                }
            ]
        }
    ]
}