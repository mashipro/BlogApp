import { createStore } from "redux";
import appReducer from './reducer/index.js'

export default createStore(appReducer)