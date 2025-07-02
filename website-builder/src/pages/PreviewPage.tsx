import React from 'react';
import styled from 'styled-components';
import { useEditorStore } from '../store/editorStore';
import ComponentRenderer from '../components/Editor/ComponentRenderer';
import GlobalStyle from '../styles/GlobalStyle'; // Important for consistent styling

const PreviewContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #fff; /* Or a background from a global theme later */
  padding: 0; /* Preview should not have its own padding usually */

  /* Potentially add device-specific frames or scaling here later */
`;

const PreviewPage: React.FC = () => {
  const { components } = useEditorStore((state) => ({
    components: state.components,
  }));

  // In a real preview, we'd want to strip out editor-specific stylings
  // or use a different set of "production" styles for components.
  // For now, ComponentRenderer renders them as they are.
  // We might need to pass a `isPreview={true}` prop to ComponentRenderer
  // and to individual elements if they need to behave/look different in preview.

  return (
    <>
      <GlobalStyle /> {/* Ensure global styles are applied in the preview context */}
      <PreviewContainer>
        {components.map((component) => (
          <ComponentRenderer key={`preview-${component.id}`} component={component} />
        ))}
        {components.length === 0 && (
          <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2em' }}>
            The canvas is empty. Add components in the editor to see them here.
          </div>
        )}
      </PreviewContainer>
    </>
  );
};

export default PreviewPage;
