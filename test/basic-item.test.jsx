const React = require("react")
const basic_items = require("../dist/src/components/views/basic-items")
const renderer = require("react-test-renderer")
// import { ElementContainer } from "../src/components/views/basic-items"

it("correct single item ", () => {
    const singleItem = React.createElement("basic_items.SingleItem", { name: "name", value: 20 })
    expect(singleItem).toMatchSnapshot();
})

it("test single item ", () => {
    const singleItem2 = renderer.create(React.createElement("basic_items.SingleItem", { name: "age", value: 21 }))
    expect(singleItem2).toMatchSnapshot()
})
