import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '../../types/editor';

export interface ContainerProps extends BaseComponentProps {
  maxWidth?: string; // e.g., '1200px'
  backgroundColor?: string;
  padding?: string;
}

const StyledContainer = styled.div<ContainerProps>`
  width: 100%;
  max-width: ${(props) => props.maxWidth || '1140px'}; /* Common max-width */
  margin: 0 auto; /* Center the container */
  padding: ${(props) => props.padding || '15px'};
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  min-height: 80px; /* Default minimum height */
  border: 1px dashed #ddd; /* Temporary border */
  display: flex;
  flex-direction: column; /* Default stacking for children */
`;

const Container: React.FC<PropsWithChildren<ContainerProps>> = ({
  children,
  ...props
}) => {
  return (
    <StyledContainer {...props}>
      {children || 'Container: Drop content here'}
    </StyledContainer>
  );
};

export default Container;
