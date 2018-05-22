import { configure, mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import enzymeToJson from 'enzyme-to-json';

global.mount = mount;
global.render = render;
global.shallow = shallow;
global.toJson = enzymeToJson;

configure({ adapter: new Adapter() });
