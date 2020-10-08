import { configureStore } from '@reduxjs/toolkit';

import todos from './todo.slice';

const store = configureStore({
  reducer: { todos },
});

export default store;
