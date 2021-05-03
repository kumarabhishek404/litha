import React from 'react'

const RadioGroupComponent = (props) => {
  const {
    className = '',
    onChange,
    buttonGroupData
  } = props

  return (
    <>
      {
        buttonGroupData.map(group =>
          <div className="form-check form-check-inline">
            <input className={`form-check-input ${className}`} onChange={onChange} type="radio" name="inlineRadioOptions" id={group.value} value={group.value} />
            <label className="form-check-label" htmlFor={group.value}>{group.label || 'radio'}</label>
          </div>
        )
      }
    </>
  )
}

export default RadioGroupComponent;
