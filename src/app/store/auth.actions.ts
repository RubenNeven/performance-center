import {createAction, props} from '@ngrx/store';
import {User} from '../shared/models/models';

export const login = createAction(
  '[Auth] Login',
  props<{user: User}>()
)

export const logout = createAction(
  '[Auth] Logout'
)
