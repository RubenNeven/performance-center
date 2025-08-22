import {createReducer, on} from '@ngrx/store';
import {User} from '../shared/models/models';
import {login} from './auth.actions';

export const initialUser: User | null = null;


export const authReducer = createReducer<User | null>(
  initialUser,
  on(login, (state, {user}) => user)
);
