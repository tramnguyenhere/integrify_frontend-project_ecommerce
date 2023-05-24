import usersReducer, {
  createUser,
  emptyUsersReducer,
    sortByEmail,
  fetchAllUsers,
  updateUser,
  login,
} from '../../redux/reducers/usersReducer';
import { userRoleEnum } from '../../types/User';
import { user1, user2, user3 } from '../data/users';
import userServer from '../servers/userServer';
import store from '../shared/store';

beforeAll(() => {
  userServer.listen();
});

afterAll(() => {
  userServer.close();
});

beforeEach(() => {
  store.dispatch(emptyUsersReducer());
  store.dispatch(createUser(user1));
  store.dispatch(createUser(user2));
  store.dispatch(createUser(user3));
});

describe('usersReducer', () => {
  const initialState = {
    users: [],
    currentUser: undefined,
    loading: false,
    error: '',
  };

  test('Check initialState', () => {
    const state = usersReducer(undefined, { type: 'unknown' });
    expect(state).toEqual({
      users: [],
      loading: false,
      error: '',
    });
  });

  it('should handle createUser', () => {
    const action = createUser(user1);
    const newState = usersReducer(initialState, action);

    expect(newState.users).toHaveLength(1);
    expect(newState.users[0]).toEqual(user1);
  });

  it('should handle emptyUsersReducer', () => {
    const action = emptyUsersReducer();
    const newState = usersReducer(initialState, action);

    expect(newState.users).toHaveLength(0);
  });

  test('Check should fetch all users', async () => {
    //only can check the final result
    await store.dispatch(fetchAllUsers());
    expect(store.getState().usersReducer.users.length).toBe(4);
    expect(store.getState().usersReducer.loading).toBeFalsy();
    expect(store.getState().usersReducer.error).toBeFalsy(); //empty string is interpreted as falsy value if JS
  });
    
  test("Check should fetch users in pending state", () => {
    const state = usersReducer(undefined, fetchAllUsers.pending)
    expect(state).toEqual({ users: [], loading: true, error: '' })
})
    
  test("Check if existing user can login", async () => {
    await store.dispatch(login({
        email: "john@mail.com",
        password: "changeme"
    }))
    expect(store.getState().usersReducer.currentUser).toBeDefined()
})

  it('should handle sortByEmail (ascending)', () => {
    const users = [user3, user2, user1];

    const action = sortByEmail('asc');
    const newState = usersReducer({ ...initialState, users }, action);

    expect(newState.users).toEqual([user3, user1, user2]);
  });

  it('should handle sortByEmail (descending)', () => {
    const users = [user3, user2, user1];

    const action = sortByEmail('desc');
    const newState = usersReducer({ ...initialState, users }, action);

    expect(newState.users).toEqual([user2, user1, user3]);
  });
});
