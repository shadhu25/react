import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ordered, restocked } from '../features/cake/cakeSlice'
export default function CakeView() {
  const dispatch = useDispatch()
  const noOfCake = useSelector(state => state.cake.noOfCake)
  return (
    <>
      <p>noOfCake: {noOfCake}</p>
      <button onClick={() => dispatch(ordered())}>order</button>
      <button onClick={() => dispatch(restocked(3))}>restocked</button>
    </>
  )
}
