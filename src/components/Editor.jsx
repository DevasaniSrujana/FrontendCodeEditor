import React, { useState, useEffect } from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
// Import your custom theme CSS
import './custom-codemirror-theme.css';

const Editor = (props) => {
    const { editorName, value, language, onChange } = props;
    const [editorValue, setEditorValue] = useState(value);

    // Function to save editor content to localStorage
    const saveToLocalStorage = (key, data) => {
        try {
            localStorage.setItem(key, data);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    };

    // Function to load editor content from localStorage
    const loadFromLocalStorage = (key) => {
        try {
            const storedValue = localStorage.getItem(key);
            if (storedValue !== null) {
                return storedValue;
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error);
        }
        return '';
    };

    // Load editor content from localStorage on component mount
    useEffect(() => {
        const storedValue = loadFromLocalStorage(editorName);
        if (storedValue) {
            setEditorValue(storedValue);
            onChange(storedValue); // Update parent component or state with loaded value
        }
    }, [editorName, onChange]);

    const handleChange = (editor, data, newValue) => {
        setEditorValue(newValue);
        onChange(newValue);

        // Save editor content to localStorage
        saveToLocalStorage(editorName, newValue);
    };

    return (
        <div>
            <div className="container">
                <div className="title">
                    {editorName}
                </div>
                <ControlledEditor
                    onBeforeChange={handleChange}
                    value={editorValue}
                    className="editor-panel custom-codemirror-theme" /* Apply custom theme class */
                    options={{
                        lineWrapper: true,
                        lint: true,
                        mode: language,
                        lineNumbers: true,
                        theme: 'default', // Use the default theme or remove this line to use the custom styles
                        foldGutter: true,
                        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                        autoCloseBrackets: true, // Automatically close brackets
                        matchBrackets: true, // Highlight matching brackets
                        indentUnit: 4, // Indentation size
                        smartIndent: true, // Enable smart indentation
                        tabSize: 4, // Tab size
                        indentWithTabs: false, // Indent with spaces
                    }}
                />
            </div>
        </div>
    );
};

export default Editor;
