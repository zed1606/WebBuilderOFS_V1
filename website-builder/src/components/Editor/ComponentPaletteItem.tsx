import React from 'react';
import { useDrag } from 'react-dnd';
import { ComponentType, ItemTypes, DragItem } from '../../types/editor';
import styled from 'styled-components';

const PaletteItemContainer = styled.div`
  padding: 8px 12px;
  margin-bottom: 8px;
  background-color: #ffffff;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  cursor: grab;
  font-size: 0.9rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f0f0f0;
  }

  &.is-dragging {
    opacity: 0.5;
    background-color: #e0e0e0;
  }
`;

interface ComponentPaletteItemProps {
  type: ComponentType;
  label: string;
}

const ComponentPaletteItem: React.FC<ComponentPaletteItemProps> = ({
  type,
  label,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.EDITOR_COMPONENT, // This is what drop targets will accept
    item: { type, isNew: true } as DragItem, // The data payload for the dragged item
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <PaletteItemContainer
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={drag as any}
      className={isDragging ? 'is-dragging' : ''}
    >
      {label}
    </PaletteItemContainer>
  );
};

export default ComponentPaletteItem;
