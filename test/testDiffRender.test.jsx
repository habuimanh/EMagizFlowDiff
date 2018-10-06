import React from "react"
import { AppState } from "../dist/src/components/ApplicationState"
import { mount, shallow } from "enzyme"
import { SupportObject } from "../dist/src/components/views/flowComponents/supportObject"
import { Layout } from "../dist/src/components/views/layout"
import { DiffItem, DiffList, DiffProperty } from "../dist/src/components/views/DiffList"
const rev1 = {
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
                "constructor_arg_0": "false",
                "failoverOnInitialConnection": "false",
                "maxRetryInterval": "4000",
                "preAcknowledge": "false",
                "reconnectAttempts": "4",
                "retryInterval": "500",
                "retryIntervalMultiplier": "2.00000000",
                "useGlobalPools": "true"
            },
            "password": "${swatest.jms.password}",
            "username": "${swatest.jms.username}"
        }
    ]
}
const rev2 = {
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
        }
    ]
}
describe("Communication between two components", () => {
    let appData;
    let div1, div2;
    beforeAll(() => {
        appData = new AppState();
        appData.loadRevisions(rev1, rev2)
        appData.compare();
        div2 = <Layout appState={appData} />
    })
    // test("components will render", () => {
    //     const wrapper2 = mount(div2);
    //     expect(wrapper2.find(SupportObject)).toHaveLength(2);
    // })
    test("diffRender", () => {
        const wrapper2 = mount(div2);
        //const diffProperty = wrapper2.find(DiffItem);
        //expect(diffProperty.props.diff.isDiff).toEqual(true);
        const a = wrapper2.find(DiffProperty);
        //expect(a.props().diff.isDiff).toEqual(true);
        expect(a).toHaveLength(5);
    })
    // test("loadData", () => {
    //     expect(appData._revision1.components).toEqual(rev1.components);
    //     expect(appData._revision2.components).toEqual(rev2.components);
    // })
})