import React from 'react';
import styled from 'styled-components';
import { TextBlockProps } from '../../types/editor';

interface StyledTextProps {
  fontSize: string;
  color: string;
  textAlign: 'left' | 'center' | 'right' | 'justify';
}

const StyledText = styled.p<StyledTextProps>`
  font-size: ${(props) => props.fontSize || '16px'};
  color: ${(props) => props.color || '#000000'};
  text-align: ${(props) => props.textAlign || 'left'};
  padding: 5px; /* Basic padding */
  margin: 0; /* Reset default margin */
  white-space: pre-wrap; /* Preserve whitespace and newlines */
  word-break: break-word; /* Prevent long text from overflowing */
`;

const TextBlock: React.FC<TextBlockProps> = ({ text, fontSize, color, textAlign }) => {
  return (
    <StyledText fontSize={fontSize} color={color} textAlign={textAlign}>
      {text || 'Default Text Block'}
    </StyledText>
  );
};

export default TextBlock;
