import "@repo/ui/dist/index.css";
import { Provider } from "react-redux";

import App from "./App";
import "./index.css";
import store from "./store";

const SnakeGame = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default SnakeGame;
