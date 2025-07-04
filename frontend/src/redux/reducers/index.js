import { combineReducers } from 'redux';
import Auth from './auth';
import Alert from './alert';
import Courses from './course';
import Lessons from './lessonM';
import Progress from './progress';
export default combineReducers({
    Auth,
    Alert,
    Courses,
    Lessons,
    Progress
})