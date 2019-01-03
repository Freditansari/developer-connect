SETUP REDUX:

1. install redux using npm i redux react-redux redux-thunk --save-dev

2. go to app.js and add this code :
   import {Provider} from 'react-redux'
   then wrap entire app.js in <Provider store ={store}> tag

~~3. still in app.js: ~~
~~const store = createStore(()=>[], {}, applyMiddleware());~~
~~import {createStore, applyMiddleware} from 'redux';~~

4. go to src folder, add store.js and add these:
   import {createStore, applyMiddleware} from 'redux';

const store = createStore(()=>[], {}, applyMiddleware());
export default store;

5. import think and apply middleware.
   import thunk from 'redux-thunk';
   const store = createStore(()=>[], {}, applyMiddleware(...middleware));

6. create reducers folder and add index.js in the folder.

import {combineReducers} from 'redux';
import authReducer from './authReducer';

export default combineReducers({
auth: authReducer
});

7. create authreducer.js in the reducers folder:
   const initialState = {
   isAuthenticated: false,
   user: {}
   };

export default function(state = initialState, action) {
switch (action.type) {
default:
return state;
}
}

8. import root reducer in store.js:
   import rootReducer from './reducers'

9. replace :
   from:
   const store = createStore(()=>[], {}, applyMiddleware(...middleware));

to:
const store = createStore(rootReducer, {}, applyMiddleware(...middleware));

10. add initial state in store.js:
    const initialState = {};
    then change from

const store = createStore(rootReducer, {}, applyMiddleware(...middleware));

to:
const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

11. OPTIONAL:
    note: there are some fix on this redux devtools extention if we're going on production. some browsers does not have the redux devtools installed so we have to add some logic to not use the said extentions

    Install redux dev tool extentions:
    from this:
    const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

        to :
        const store = createStore(

        rootReducer,
        initialState,
        compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
        );

Using Redux:

1. create actions folder in src
2. create authActions.js and types.js

3. add this line in types.js:
   export const TEST_DISPATCH= 'TEST_DISPATCH';

4. add this in authActions.js
   import {TEST_DISPATCH} from './types'

export const registeruser = (userData) => {
return {
type: TEST_DISPATCH,
payload: userData
}
}

5. go to authReducer.js:

import {TEST_DISPATCH} from '../actions/types'

add these into the switch:
case TEST_DISPATCH:
return{
...state,
user: action.payload
}

6.  go to Register.js:
    //redux compnents
    import { connect } from "react-redux";
    import { registerUser } from "../../actions/authActions";

7.  change this to line below :
    from:
    export default Register;

         to:
         export default connect(
         null,
         { registerUser }
         )(Register);

8.  after this you can start to access the state from redux.

9.  in order to access the redux state:
    const mapStateToProps = state => ({ auth: state.auth });
    which comes from root reducers( the index.js in reducers folder)

            then change this line :
            export default connect(
            null,
            { registerUser }
            )(Register);

            to :

            export default connect(
            mapStateToProps,
            { registerUser }
            )(Register);

        then you can use : 
        const {user} = this.props.auth;

        and access the user variable ie.{user ? user.name : null}
