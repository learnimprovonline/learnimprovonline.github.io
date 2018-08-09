import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import toJson from 'enzyme-to-json'

Enzyme.configure({ adapter: new Adapter() })
