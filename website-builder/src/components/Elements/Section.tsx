import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '../../types/editor';

// Sections might have specific props later, e.g., background color, padding, etc.
export interface SectionProps extends BaseComponentProps {
  backgroundColor?: string;
  padding?: string; // e.g., '20px 0'
}

const StyledSection = styled.section<SectionProps>`
  width: 100%;
  padding: ${(props) => props.padding || '20px 0'};
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  min-height: 100px; /* Default minimum height to make it visible */
  border: 1px dashed #ccc; /* Temporary border to visualize */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content by default, can be overridden by children */
`;

const Section: React.FC<PropsWithChildren<SectionProps>> = ({
  children,
  ...props
}) => {
  return (
    <StyledSection {...props}>
      {children || 'Section: Drop content here'}
    </StyledSection>
  );
};

export default Section;
