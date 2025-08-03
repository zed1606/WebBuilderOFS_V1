import React from 'react';
import {
  EditorComponent,
  ComponentType,
  TextBlockProps,
  ImageProps,
} from '../../types/editor';

// Import the actual components
import TextBlock from '../Elements/TextBlock';
import ImageComponent from '../Elements/Image';
import Section, { SectionProps } from '../Elements/Section';
import Container, { ContainerProps } from '../Elements/Container';
import Grid, { GridProps } from '../Elements/Grid';

interface ComponentRendererProps {
  component: EditorComponent;
  // We might need to pass down context or other props like onSelect, isSelected, etc. later
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({ component }) => {
  const renderChildren = () => {
    if (!component.children || component.children.length === 0) {
      // For some containers, display a placeholder if empty,
      // this will be refined when drag-and-drop for children is implemented.
      if (
        component.type === ComponentType.Section ||
        component.type === ComponentType.Container ||
        component.type === ComponentType.Grid
      ) {
        // The placeholder text is already part of the components themselves if no children are passed.
        // So, returning null here is fine, or the component's default placeholder will show.
        return null;
      }
      return null;
    }
    return component.children.map((child) => (
      <ComponentRenderer key={child.id} component={child} />
    ));
  };

  switch (component.type) {
    case ComponentType.TextBlock:
      return <TextBlock {...(component.props as TextBlockProps)} />;
    case ComponentType.Image:
      return <ImageComponent {...(component.props as ImageProps)} />;
    case ComponentType.Section:
      return (
        <Section {...(component.props as SectionProps)}>
          {renderChildren()}
        </Section>
      );
    case ComponentType.Container:
      return (
        <Container {...(component.props as ContainerProps)}>
          {renderChildren()}
        </Container>
      );
    case ComponentType.Grid:
      // Grid children rendering is a bit special.
      // If explicit children are defined in component.children, they are cells.
      // If not, the Grid component itself might render placeholder columns.
      // For now, this assumes children are EditorComponent instances meant to be rendered inside grid cells.
      // This will need refinement when we implement how children are added to grids.
      return (
        <Grid {...(component.props as GridProps)}>{renderChildren()}</Grid>
      );
    default:
      console.warn('Unknown component type:', component.type);
      return <div>Unknown component type: {component.type}</div>;
  }
};

export default ComponentRenderer;
