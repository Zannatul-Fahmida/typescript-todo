import { Button, Flex, Input } from '@chakra-ui/react';
import React, { useCallback, useReducer, useRef, useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  text: string;
}
// Todo[]
type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

function App() {
  const [myState, setMyState] = useState<Todo>();
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
    }
  }, []);
  const newTodoRef = useRef<HTMLInputElement>(null);
  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });
      newTodoRef.current.value = "";
    }
  }, []);
  return (
    <div className="App">
      <Flex m='4'>
        <Input mr='2' placeholder='Todo item' ref={newTodoRef} />
        <Button colorScheme='blue' onClick={onAddTodo}>Add</Button>
      </Flex>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <Button ml='2' colorScheme='blue' onClick={() => dispatch({ type: "REMOVE", id: todo.id })}>
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}

export default App;
