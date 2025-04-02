import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ordered, restocked } from '../features/icecream/icecreamSlice'

export default function IceCreamView() {
  const dispatch = useDispatch()
  const noOfIceCream = useSelector(state => state.iceCream.noOfIceCream)
  return (
    <>
      <p>noOfIceCream: {noOfIceCream}</p>
      <button onClick={() => dispatch(ordered())}>order</button>
      <button onClick={() => dispatch(restocked(3))}>restocked</button>
    </>
  )
}
