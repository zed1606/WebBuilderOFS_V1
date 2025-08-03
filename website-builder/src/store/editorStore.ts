import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  EditorComponent,
  ComponentType,
  DragItem,
  TextBlockProps,
  ImageProps,
  BaseComponentProps, // Added for updateComponentProps
  DeviceType, // Added for responsive state
} from '../types/editor';
import { SectionProps } from '../components/Elements/Section';
import { ContainerProps } from '../components/Elements/Container';
import { GridProps } from '../components/Elements/Grid';

// Helper to generate unique IDs
const generateId = () =>
  Date.now().toString() + Math.random().toString(36).substring(2, 9);

// Helper to create default props for new components
const getDefaultProps = (type: ComponentType): BaseComponentProps => {
  switch (type) {
    case ComponentType.TextBlock:
      return {
        text: 'New Text Block',
        fontSize: '16px',
        color: '#000000',
        textAlign: 'left',
      } as TextBlockProps;
    case ComponentType.Image:
      return {
        src: 'https://via.placeholder.com/150?text=New+Image',
        alt: 'New Image',
        width: '150px',
        height: 'auto',
      } as ImageProps;
    case ComponentType.Section:
      return {
        backgroundColor: 'transparent',
        padding: '20px 0',
      } as SectionProps;
    case ComponentType.Container:
      return {
        maxWidth: '1140px',
        backgroundColor: 'transparent',
        padding: '15px',
      } as ContainerProps;
    case ComponentType.Grid:
      return {
        columns: 2, // Default to 2 columns
        gap: '15px',
        backgroundColor: 'transparent',
        padding: '10px',
      } as GridProps;
    default:
      return {};
  }
};

interface EditorState {
  components: EditorComponent[];
  selectedComponentId: string | null;
  currentDevice: DeviceType; // New state for current device view
  pageTitle: string; // New state for SEO page title
  pageDescription: string; // New state for SEO meta description
  addComponent: (
    item: DragItem,
    parentId: string | null,
    index?: number,
  ) => void;
  moveComponent: (
    draggedId: string,
    targetId: string | null,
    newIndex?: number,
  ) => void;
  updateComponentProps: (
    componentId: string,
    props: Partial<BaseComponentProps>,
  ) => void;
  selectComponent: (componentId: string | null) => void;
  setCurrentDevice: (device: DeviceType) => void; // Action to change device
  setPageTitle: (title: string) => void; // Action to set page title
  setPageDescription: (description: string) => void; // Action to set page description
  // TODO: deleteComponent, duplicateComponent, etc.
}

// Recursive function to add a component
const addComponentRecursive = (
  components: EditorComponent[],
  newComponent: EditorComponent,
  parentId: string | null,
  index?: number,
): EditorComponent[] => {
  if (parentId === null) {
    // Add to root
    if (index !== undefined) {
      return [
        ...components.slice(0, index),
        newComponent,
        ...components.slice(index),
      ];
    }
    return [...components, newComponent];
  }

  return components.map((comp) => {
    if (comp.id === parentId) {
      const newChildren = comp.children ? [...comp.children] : [];
      if (index !== undefined) {
        newChildren.splice(index, 0, newComponent);
      } else {
        newChildren.push(newComponent);
      }
      return { ...comp, children: newChildren };
    }
    if (comp.children) {
      return {
        ...comp,
        children: addComponentRecursive(
          comp.children,
          newComponent,
          parentId,
          index,
        ),
      };
    }
    return comp;
  });
};

// Recursive function to find and update props
const updatePropsRecursive = (
  components: EditorComponent[],
  componentId: string,
  propsToUpdate: Partial<BaseComponentProps>,
): EditorComponent[] => {
  return components.map((comp) => {
    if (comp.id === componentId) {
      return { ...comp, props: { ...comp.props, ...propsToUpdate } };
    }
    if (comp.children) {
      return {
        ...comp,
        children: updatePropsRecursive(
          comp.children,
          componentId,
          propsToUpdate,
        ),
      };
    }
    return comp;
  });
};

export const useEditorStore = create<EditorState>()(
  devtools(
    (set) => ({
      components: (() => {
        const sectionId = generateId();
        const containerId = generateId();
        const textId = generateId();

        return [
          {
            id: sectionId,
            type: ComponentType.Section,
            props: getDefaultProps(ComponentType.Section) as SectionProps,
            parentId: null,
            children: [
              {
                id: containerId,
                type: ComponentType.Container,
                props: getDefaultProps(
                  ComponentType.Container,
                ) as ContainerProps,
                parentId: sectionId,
                children: [
                  {
                    id: textId,
                    type: ComponentType.TextBlock,
                    props: {
                      text: 'Welcome to the Editor!',
                      fontSize: '24px',
                      color: '#333',
                      textAlign: 'center',
                    } as TextBlockProps,
                    parentId: containerId,
                  },
                ],
              },
            ],
          },
        ];
      })(),
      selectedComponentId: null,
      currentDevice: DeviceType.Desktop, // Default to Desktop view
      pageTitle: 'My Awesome Page', // Default SEO title
      pageDescription: 'This is a description of my awesome page.', // Default SEO description

      addComponent: (item, parentId, index) =>
        set((state) => {
          const newComponent: EditorComponent = {
            id: generateId(),
            type: item.type,
            props: getDefaultProps(item.type),
            parentId,
            children:
              item.type === ComponentType.Section ||
              item.type === ComponentType.Container ||
              item.type === ComponentType.Grid
                ? []
                : undefined,
          };
          return {
            components: addComponentRecursive(
              state.components,
              newComponent,
              parentId,
              index,
            ),
          };
        }),

      moveComponent: (draggedId, targetParentId, newIndex) => {
        // This is a complex operation.
        // 1. Remove the component from its current location.
        // 2. Add it to the new location.
        // For Phase 1, we might simplify this or implement it more thoroughly later.
        // Placeholder logic:
        set((state) => {
          let componentToMove: EditorComponent | undefined;

          // Function to recursively find and remove
          const findAndRemove = (
            comps: EditorComponent[],
            id: string,
          ): EditorComponent[] => {
            return comps.reduce((acc, comp) => {
              if (comp.id === id) {
                componentToMove = comp;
                return acc;
              }
              if (comp.children) {
                const updatedChildren = findAndRemove(comp.children, id);
                if (updatedChildren.length !== comp.children.length) {
                  // If a child was removed, update this component's children
                  acc.push({ ...comp, children: updatedChildren });
                } else {
                  acc.push(comp);
                }
              } else {
                acc.push(comp);
              }
              return acc;
            }, [] as EditorComponent[]);
          };

          let updatedComponents = findAndRemove(state.components, draggedId);

          if (componentToMove) {
            componentToMove.parentId = targetParentId; // Update parentId
            updatedComponents = addComponentRecursive(
              updatedComponents,
              componentToMove,
              targetParentId,
              newIndex,
            );
          }

          return { components: updatedComponents };
        });
      },

      updateComponentProps: (componentId, props) =>
        set((state) => ({
          components: updatePropsRecursive(
            state.components,
            componentId,
            props,
          ),
        })),

      selectComponent: (componentId) =>
        set({ selectedComponentId: componentId }),

      setCurrentDevice: (device) => set({ currentDevice: device }),

      setPageTitle: (title) => set({ pageTitle: title }),

      setPageDescription: (description) =>
        set({ pageDescription: description }),
    }),
    { name: 'EditorStore' },
  ),
);
