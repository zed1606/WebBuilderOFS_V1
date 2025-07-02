import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EditorLayout from './components/Editor/EditorLayout';
import PreviewPage from './pages/PreviewPage';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <GlobalStyle />
      <Router>
        {/* Basic navigation for toggling - can be improved or moved into EditorHeader */}
        {/* <nav style={{ padding: '10px', background: '#eee', textAlign: 'center' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Editor</Link>
          <Link to="/preview" target="_blank" rel="noopener noreferrer">Preview (New Tab)</Link>
        </nav> */}
        <Routes>
          <Route path="/" element={<EditorLayout />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
