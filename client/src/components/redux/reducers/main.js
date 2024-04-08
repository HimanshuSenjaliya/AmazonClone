import { getProductsReducer } from "./Productreducer"; 
import {combineReducers} from 'redux'


const rootReducers = combineReducers({
    getproductData : getProductsReducer
})

export default rootReducers