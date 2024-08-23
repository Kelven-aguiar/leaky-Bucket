interface User {
  id: string;
  name: string;
  queryTokens: number;
}

const users: Record<string, User> = {
  'user1': { id: 'user1', name: 'User One', queryTokens: 10 },
  'user2': { id: 'user2', name: 'User Two', queryTokens: 10 },
};

export { users, User };
