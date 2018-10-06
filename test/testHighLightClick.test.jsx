import React from "react"
import { AppState } from "../dist/src/components/ApplicationState"
import { mount, shallow } from "enzyme"
import { rev1, rev2 } from "./data"
import { InboundChannelAdapter } from "../dist/src/components/views/flowComponents/inboundChannelAdapter"
import { Layout } from "../dist/src/components/views/layout"
let data = {
    channel: "54887620458625232",
    componentType: "Inbound channel adapter",
    errorChannel: "54887620458625230",
    flippedHorizontally: false,
    guid: "40813871623069858",
    label: "receive.cdm",
    objectType: "EMagiz_Core.JMS_message_driven_channel_adapter",
    point: {
        x: 75,
        y: 62
    },
    size: {
        height: 60,
        width: 60
    }
}
describe("Communication between two components", () => {
    let appData;
    let div1, div2;
    let click = jest.fn();
    beforeAll(() => {
        appData = new AppState();
        appData.loadRevisions(rev1, rev2)
        div2 = <Layout appState={appData} />
    })
    test("hightligh when click", () => {
        const wrapper2 = mount(div2);
        // let wrapper=wrapper2.find('#ha');
        // wrapper.simulate("click");
        // expect(appData.SelectedId).toEqual("40813871623069858");
        // expect(wrapper.find('circle').at(0).html()).toEqual('<circle cx="32" cy="32" r="30" x="0" y="0" fill="rgb(105, 183, 49)" style="stroke: #ffa500; stroke-width: 2;"></circle>'
        //);
    })
})