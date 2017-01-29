import {SET_COOKIE_VALIDATION_KEY, SET_YII_GIT_REPO,SET_SHOW_YII,SET_REQUEST_ACTIVE_YII} from "../../constants/Roles";
import {Map} from "immutable";

const initialState = Map({
  cookie_validation_key: ""
});

export default function yii(state = initialState, action) {
  switch (action.type) {
    case SET_COOKIE_VALIDATION_KEY:
    {
      return state.set("cookie_validation_key", action.value.get("cookie_validation_key"));
    }
    case SET_YII_GIT_REPO:
    {
      return state.set("yii_git_repo", action.value.get("yii_git_repo"));
    }
    case SET_SHOW_YII:
    {
      return state.set("show_yii", action.value.get("show_yii"));
    }
    case SET_REQUEST_ACTIVE_YII:
    {
      return state.set("request_active_yii", action.value.get("request_active_yii"));
    }
    default:
      return state;
  }
}
