import React from 'react'
import { useFormikContext } from 'formik';

const Form_length = ({name,limit}) => {
    const {values}=useFormikContext();//object destructing
    const current_length=values[name]?.length || 0;
  return (
    <div className='text-right text-sm text-gray-600 mt-1'>
      {current_length}/{limit}
    </div>
  )
}

export default Form_length
