import React from 'react';
import styled from 'styled-components';
import { useEditorStore } from '../../store/editorStore';

const SettingsContainer = styled.div`
  padding: 15px;
  border-bottom: 1px solid #ccc;
`;

const Title = styled.h4`
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.1em;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 0.9em;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9em;
  box-sizing: border-box; /* Ensures padding doesn't add to width */

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9em;
  min-height: 80px;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const PageSettingsPanel: React.FC = () => {
  const { pageTitle, pageDescription, setPageTitle, setPageDescription } = useEditorStore(
    (state) => ({
      pageTitle: state.pageTitle,
      pageDescription: state.pageDescription,
      setPageTitle: state.setPageTitle,
      setPageDescription: state.setPageDescription,
    })
  );

  return (
    <SettingsContainer>
      <Title>Page SEO Settings</Title>
      <FormGroup>
        <Label htmlFor="pageTitle">Page Title</Label>
        <Input
          id="pageTitle"
          type="text"
          value={pageTitle}
          onChange={(e) => setPageTitle(e.target.value)}
          placeholder="Enter page title"
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="pageDescription">Meta Description</Label>
        <Textarea
          id="pageDescription"
          value={pageDescription}
          onChange={(e) => setPageDescription(e.target.value)}
          placeholder="Enter meta description (max 160 characters recommended)"
          rows={4}
        />
      </FormGroup>
    </SettingsContainer>
  );
};

export default PageSettingsPanel;
