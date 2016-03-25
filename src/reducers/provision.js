import * as types from '../constants/ActionTypes';
import {Map} from 'immutable';

const initialState = Map();

export default function provisionName(state = initialState, action) {
  switch (action.type) {
    case types.SET_NAME:
    {
      return state.set('project_name', action.value);
    }
    default:
      return state;
  }
}
