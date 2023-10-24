import { Provider } from 'react-redux'
import store from './store'

import './index.css'

import App from './App'

const SnakeApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default SnakeApp
