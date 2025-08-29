import React from 'react';
import { TestType, TEST_CONST } from '../types/test';

const TestComponent: React.FC = () => {
  return (
    <div>
      <p>Test Type: {TEST_CONST}</p>
      <p>Test Const: {TEST_CONST}</p>
    </div>
  );
};

export default TestComponent;
