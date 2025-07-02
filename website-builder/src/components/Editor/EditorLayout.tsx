import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components'; // Import css
import { useEditorStore } from '../../store/editorStore';
import ComponentRenderer from './ComponentRenderer';
import { DragItem, ItemTypes, ComponentType, DeviceType, DeviceWidths } from '../../types/editor';
import { useDrop } from 'react-dnd';
import ComponentPaletteItem from './ComponentPaletteItem';
import PageSettingsPanel from './PageSettingsPanel'; // Import PageSettingsPanel
// Placeholder icons (replace with actual icons later)
const DesktopIcon = () => <>🖥️</>;
const TabletIcon = () => <>📱</>;
const MobileIcon = () => <>📱</>;

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const EditorHeader = styled.header`
  background-color: #f0f0f0;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  height: 60px; /* Fixed height for header */
`;

const HeaderTitle = styled.span`
  font-size: 1.2em;
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px; /* Space between control groups */
`;

const DeviceSwitcher = styled.div`
  display: flex;
  gap: 5px;
  padding: 4px;
  background-color: #e0e0e0;
  border-radius: 6px;
`;

interface DeviceButtonProps {
  isActive: boolean;
}

const DeviceButton = styled.button<DeviceButtonProps>`
  padding: 6px 10px;
  border: none;
  background-color: ${(props) => (props.isActive ? '#007bff' : 'transparent')};
  color: ${(props) => (props.isActive ? 'white' : '#333')};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9em;

  &:hover {
    background-color: ${(props) => (props.isActive ? '#0056b3' : '#d0d0d0')};
  }
`;


const HeaderActions = styled.div`
  /* Styles for actions container if needed */
`;

const PreviewButton = styled(Link)`
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: normal;

  &:hover {
    background-color: #0056b3;
  }
`;


const MainContent = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden; /* Prevents overall page scroll, individual panels will scroll */
`;

const Sidebar = styled.aside`
  width: 250px;
  background-color: #f8f8f8;
  border-right: 1px solid #ccc;
  padding: 10px;
  overflow-y: auto;
`;

const CanvasArea = styled.main`
  flex-grow: 1;
  background-color: #d8d8d8; /* Slightly darker background for canvas area */
  padding: 20px;
  overflow: auto; /* Changed to auto to handle both directions if necessary */
  display: flex; /* For centering the iframe-like canvas */
  justify-content: center; /* Center canvas horizontally */
  align-items: flex-start; /* Align canvas to top */
`;

interface CanvasFrameProps {
  width: string;
  // height could also be a prop if we want to simulate device heights
}

// This will act like an iframe for the content, scaled to the device width
const CanvasFrame = styled.div<CanvasFrameProps>`
  width: ${(props) => props.width};
  max-width: 100%; /* Ensure it doesn't overflow its container if width is % */
  min-height: 100%; /* Try to take full available height */
  background-color: #ffffff; /* The 'page' background */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  overflow-y: auto; /* If content overflows vertically */
  overflow-x: hidden; /* Horizontal overflow should be handled by responsiveness */
  margin: 0 auto; /* Center if canvas area is wider */
  /* transition for width changes can be added if desired */
  transition: width 0.3s ease-in-out;
`;


const CanvasDropZone = styled.div`
  min-height: 100%;
  width: 100%;
  &.is-over {
    background-color: #f0f8ff;
  }
`;


const PropertiesPanel = styled.aside`
  width: 300px;
  background-color: #f8f8f8;
  border-left: 1px solid #ccc;
  /* padding: 10px; // Padding will be handled by internal components */
  overflow-y: auto;
`;

const EditorLayout: React.FC = () => {
  const { components, addComponent, currentDevice, setCurrentDevice } = useEditorStore(
    (state) => ({
      components: state.components,
      addComponent: state.addComponent,
      currentDevice: state.currentDevice,
      setCurrentDevice: state.setCurrentDevice,
    })
  );

  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: ItemTypes.EDITOR_COMPONENT,
      drop: (item: DragItem, monitor) => {
        if (monitor.didDrop() && monitor.getTargetIds().length > 0) {
          return;
        }
        if (item.isNew) {
          addComponent(item, null);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [addComponent]
  );


  return (
    <EditorContainer>
      <EditorHeader>
        <HeaderTitle>Website Builder</HeaderTitle>
        <HeaderControls>
          <DeviceSwitcher>
            <DeviceButton
              onClick={() => setCurrentDevice(DeviceType.Desktop)}
              isActive={currentDevice === DeviceType.Desktop}
              title="Desktop View"
            >
              <DesktopIcon /> Desktop
            </DeviceButton>
            <DeviceButton
              onClick={() => setCurrentDevice(DeviceType.Tablet)}
              isActive={currentDevice === DeviceType.Tablet}
              title="Tablet View"
            >
              <TabletIcon /> Tablet
            </DeviceButton>
            <DeviceButton
              onClick={() => setCurrentDevice(DeviceType.Mobile)}
              isActive={currentDevice === DeviceType.Mobile}
              title="Mobile View"
            >
              <MobileIcon /> Mobile
            </DeviceButton>
          </DeviceSwitcher>
          <HeaderActions>
            <PreviewButton to="/preview" target="_blank" rel="noopener noreferrer">
              Preview
            </PreviewButton>
          </HeaderActions>
        </HeaderControls>
      </EditorHeader>
      <MainContent>
        <Sidebar>
          <h4>Components</h4>
          <ComponentPaletteItem type={ComponentType.Section} label="Section" />
          <ComponentPaletteItem type={ComponentType.Container} label="Container" />
          <ComponentPaletteItem type={ComponentType.Grid} label="Grid" />
          <ComponentPaletteItem type={ComponentType.TextBlock} label="Text Block" />
          <ComponentPaletteItem type={ComponentType.Image} label="Image" />
        </Sidebar>
        <CanvasArea>
          {/* The CanvasFrame simulates the device screen */}
          <CanvasFrame width={DeviceWidths[currentDevice]}>
            <CanvasDropZone ref={dropRef} className={isOver && canDrop ? 'is-over' : ''}>
              {components.length === 0 && <p>Drop components here to start building.</p>}
              {components.map((component) => (
                <ComponentRenderer key={component.id} component={component} />
              ))}
            </CanvasDropZone>
          </CanvasFrame>
        </CanvasArea>
        <PropertiesPanel>
          <PageSettingsPanel />
          {/* Other property editing UI will go here, e.g., for selected components */}
          <div style={{ padding: '10px', textAlign: 'center', color: '#777', marginTop: '20px' }}>
            Select a component to edit its properties.
          </div>
        </PropertiesPanel>
      </MainContent>
    </EditorContainer>
  );
};

export default EditorLayout;
