// import React from "react"
// import { AppState } from "../dist/src/components/ApplicationState"
// import { MxObject, Element, Container } from "./example/integrating-test"
// import { mount, shallow } from "enzyme"

// describe("Communication between two components", () => {
//     let appData;
//     let layout;
//     beforeAll(() => {
//         appData = new AppState();
//         layout = <Container appData={appData} />
//     })
//     test("highlight when click", () => {
//         const wrapper = mount(layout)
//         expect(wrapper.find("div#1234")).toHaveLength(1)
//         wrapper.find("div#1234").simulate("click")
//         expect(appData.SelectedId).toBe("1234")
//         expect(wrapper.find('Element').props().isHightlight).toBeTruthy()
//         // expect(wrapper.find("div#1234").props().isHightlight).toBeTruthy()
//         // .props().isHightlight).toBeTruthy()
//     })
// })