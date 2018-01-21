import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer
});

export default rootReducer;

/*
*  set up a "root reducer" by combining our reducers to create one, comprehensive store.
*  */