import { MarkdownEditor as AntdMarkdownEditor } from '@ant-design/md-editor';
import React from 'react';

interface Props {
  value?: string;
  initValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  height?: number | string;
  readonly?: boolean;
  toc?: boolean;
}

/**
 * Markdown 编辑器组件
 *
 * @param props
 * @constructor
 */
const MarkdownEditor: React.FC<Props> = (props) => {
  const { value, initValue, onChange, placeholder, style, height = 400, readonly, toc } = props;

  return (
    <div style={{ ...style, height }}>
      <AntdMarkdownEditor
        initValue={value || initValue}
        onChange={onChange}
        placeholder={placeholder}
        readonly={readonly}
        toc={toc}
      />
    </div>
  );
};

export default MarkdownEditor;
