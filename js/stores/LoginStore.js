import LoginConstants from '../constants/LoginConstants';
import BaseStore from './BaseStore';

class LoginStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._user = null;
  }

  _registerToActions(action) {
    switch(action.actionType) {

      case LoginConstants.LOGIN_USER:
        this._user = action.user;
        this.emitChange();
        break;

      case LoginConstants.LOGOUT_USER:
        this._user = null;
        this.emitChange();
        break;
      default:
        break;
    }
  }

  get user() {
    return this._user;
  }

  isLoggedIn() {
    return !!this._user;
  }
}

export default new LoginStore();
