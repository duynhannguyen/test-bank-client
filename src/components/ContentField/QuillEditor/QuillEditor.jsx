// KaTeX dependency
import katex from 'katex';
window.katex = katex;
import 'katex/dist/katex.css';

// Quill dependency
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// MathQuill dependency
import './jquery';
import '@edtr-io/mathquill/build/mathquill.js';
import '@edtr-io/mathquill/build/mathquill.css';

// mathquill4quill include
import mathquill4quill from 'mathquill4quill';
import 'mathquill4quill/mathquill4quill.css';

// demo page
import { useEffect, useRef } from 'react';
import styles from './quill.module.css';
import clsx from 'clsx';

const CUSTOM_OPERATORS = [
  ['\\pm', '\\pm'],
  ['\\sqrt{x}', '\\sqrt'],
  ['\\sqrt[3]{x}', '\\sqrt[3]{}'],
  ['\\sqrt[n]{x}', '\\nthroot'],
  ['\\frac{x}{y}', '\\frac'],
  ['\\sum^{s}_{x}{d}', '\\sum'],
  ['\\prod^{s}_{x}{d}', '\\prod'],
  ['\\coprod^{s}_{x}{d}', '\\coprod'],
  ['\\int^{s}_{x}{d}', '\\int'],
  ['\\binom{n}{k}', '\\binom']
];

const QuillEditor = ({
  value,
  placeholder,
  isToolbarExtending,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  textarea,
  labelClicked
}) => {
  const reactQuillRef = useRef(null);
  const isCreated = useRef(false);

  useEffect(() => {
    if (isCreated.current) return;
    const enableMathQuillFormulaAuthoring = mathquill4quill({ Quill, katex });
    enableMathQuillFormulaAuthoring(reactQuillRef.current.editor, { operators: CUSTOM_OPERATORS });
    isCreated.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!labelClicked) return;
    if (reactQuillRef.current) reactQuillRef.current.focus();
  }, [labelClicked]);

  const toolbarOptions = [
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ align: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    ['formula', 'blockquote', 'code-block'],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean']
  ];

  return (
    <div
      className={clsx(styles.customEditor, styles.customToolbar, {
        [styles.hiddenToolbar]: !isToolbarExtending,
        [styles.showToolbar]: isToolbarExtending,
        [styles.asTextarea]: textarea
      })}
    >
      <ReactQuill
        ref={reactQuillRef}
        modules={{
          formula: true,
          toolbar: toolbarOptions
        }}
        theme='snow'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default QuillEditor;
