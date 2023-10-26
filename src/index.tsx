import { Provider } from 'react-redux'
import store from './store'

import './index.css'

import App from './App'

const SnakeGame = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default SnakeGame
