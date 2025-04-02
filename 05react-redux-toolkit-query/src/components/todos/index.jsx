import React, { useEffect } from 'react'
import TodoList from '../todo-list'
import apiSlice from '../../features/apiSlice'


export default function Todos() {
  // fetch data inside the provider
  const getTodoFn = apiSlice.usePrefetch('getTodo')
  useEffect(() => {
    getTodoFn(2)
  }, [])
  return (
    <TodoList/>
  )
}
