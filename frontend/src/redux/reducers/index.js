import { combineReducers } from 'redux';
import Auth from './auth';
import Alert from './alert';
import Profile from './profile';
import Reviews from './reviews';
import rl from './rl';
export default combineReducers({
    Auth,
    Alert,
    Profile,
    Reviews,
    rl
})