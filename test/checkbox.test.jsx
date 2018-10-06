const { Checkbox } = require("../dist/src/components/views/checkbox")
const React = require("react")
const { shallow, mount } = require("enzyme")
const testUtils = require("react-dom/test-utils")
// const jest = require("jest")

test("click on checkbox", () => {
    const onClick = jest.fn();
    const checkbox = <Checkbox checked={true} label={test} onClick={onClick} />
    const wrapper = shallow(checkbox)
    expect(wrapper.state().test).toBeTruthy()
    expect(wrapper.find(".checkbox-wrapper")).toHaveLength(1)
    const div = wrapper.find('.checkbox-wrapper')
    div.simulate("click")
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(typeof wrapper.state()).toEqual("object")
    expect(wrapper.state().test).toEqual(false);
}) 