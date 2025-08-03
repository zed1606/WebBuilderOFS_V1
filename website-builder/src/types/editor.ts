// Defines the types of components that can be dragged onto the canvas
export enum ComponentType {
  Section = 'SECTION',
  Container = 'CONTAINER',
  Grid = 'GRID',
  TextBlock = 'TEXT_BLOCK',
  Image = 'IMAGE',
  // Add other component types here
}

// Base interface for all component props
export interface BaseComponentProps {
  [key: string]: unknown; // Allows for arbitrary props
}

// Specific props for a TextBlock
export interface TextBlockProps extends BaseComponentProps {
  text: string;
  fontSize: string;
  color: string;
  textAlign: 'left' | 'center' | 'right' | 'justify';
}

// Specific props for an Image
export interface ImageProps extends BaseComponentProps {
  src: string;
  alt: string;
  width?: string; // e.g., '100px', '50%'
  height?: string; // e.g., '100px', 'auto'
}

// Generic structure for a draggable component instance on the canvas
export interface EditorComponent {
  id: string; // Unique identifier for this instance
  type: ComponentType; // Type of the component (e.g., TextBlock, Image)
  props: BaseComponentProps; // Props specific to this component type
  children?: EditorComponent[]; // For container-like components
  parentId?: string | null; // ID of the parent component, null for root elements
}

// Item type for react-dnd
export const ItemTypes = {
  EDITOR_COMPONENT: 'editorComponent', // Represents a component being dragged from palette or within canvas
  CANVAS_ELEMENT: 'canvasElement', // Represents an existing element on the canvas being moved
};

// Interface for the item being dragged by react-dnd
export interface DragItem {
  id?: string; // ID of an existing component on canvas (if dragging from canvas)
  type: ComponentType; // Type of component (either from palette or existing)
  isNew?: boolean; // True if dragging a new component from the palette
  // You might add more fields here later, like default props for new components
}

// Props for components that can accept dropped children
export interface DroppableComponentProps {
  parentId: string | null; // ID of the parent where the new component will be added
  onDrop: (item: DragItem, parentId: string | null, index?: number) => void;
  // Index is optional, for ordered drops within a container
}

// Responsive Design Types
export enum DeviceType {
  Desktop = 'DESKTOP',
  Tablet = 'TABLET',
  Mobile = 'MOBILE',
}

export const DeviceWidths: Record<DeviceType, string> = {
  [DeviceType.Desktop]: '100%', // Represents full width of the container
  [DeviceType.Tablet]: '768px',
  [DeviceType.Mobile]: '375px', // Common mobile width (e.g., iPhone X)
};
