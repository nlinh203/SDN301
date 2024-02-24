import React from 'react'
import { Switch } from '../uiCore'

const SwitchForm = (props) => {
  const { id, watch = () => {}, setValue = () => {}, className, ...prop } = props
  return (
    <div className={`flex items-center p-2 w-full lg:w-6/12 ${className}`}>
      <Switch id={id} checked={Boolean(watch(id))} onChange={(e) => setValue(id, e.target.value)} {...prop} />
    </div>
  )
}

export default SwitchForm