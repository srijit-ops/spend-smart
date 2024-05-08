import React from 'react'
import CustomModal from '../common/CustomModal'

function AddExpenseModal({open, onCloseModal, title}) {
  return (
    <CustomModal
        open={open}
        onCloseModal={onCloseModal}
        title={title}
      >
        form
      </CustomModal>
  )
}

export default AddExpenseModal