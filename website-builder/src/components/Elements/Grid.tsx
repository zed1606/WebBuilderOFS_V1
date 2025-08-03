import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { BaseComponentProps } from '../../types/editor';

export interface GridProps extends BaseComponentProps {
  columns?: number; // e.g., 2 for a 2-column grid
  gap?: string; // e.g., '15px'
  backgroundColor?: string;
  padding?: string;
}

const StyledGrid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns || 1}, 1fr);
  gap: ${(props) => props.gap || '15px'};
  padding: ${(props) => props.padding || '10px'};
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  min-height: 70px; /* Default minimum height */
  border: 1px dashed #eee; /* Temporary border */

  /* Direct children (GridItems) will be the columns */
  & > * {
    border: 1px dotted #ccc; /* Border for grid items for visualization */
    padding: 10px;
    min-height: 50px; /* Min height for columns */
    display: flex; /* Allow dropping into grid cells */
    flex-direction: column; /* Stack items within a cell */
  }
`;
// We might need a GridItem component later if we want to control individual cell properties
// For now, direct children of Grid will act as cells.

const Grid: React.FC<PropsWithChildren<GridProps>> = ({
  children,
  ...props
}) => {
  // If no children, and columns are defined, we can render placeholder columns
  const renderContent = () => {
    if (children) return children;
    if (props.columns && props.columns > 0) {
      return Array.from({ length: props.columns }).map((_, i) => (
        <div key={i}>{`Column ${i + 1}`}</div>
      ));
    }
    return 'Grid: Drop content or configure columns';
  };

  return <StyledGrid {...props}>{renderContent()}</StyledGrid>;
};

export default Grid;
