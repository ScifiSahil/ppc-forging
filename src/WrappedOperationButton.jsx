// src/components/WrappedOperationButton.js
import React from 'react';
import { WithOperations } from 'cs-web-components-base';
import OperationButton from './OperationButton';

// Ye example ke liye 'CDB_Modify' operation diya hai, tumhare use case me 'My_Custom_Import' bhi ho sakta hai
const WrappedOperationButton = WithOperations(OperationButton, {
  operationNames: ['CDB_Modify'], // ← Change this to your actual operation name
});

export default WrappedOperationButton;
