import React from 'react';
import MarkdownEditor from './MarkdownEditor';

interface Props {
  value?: string;
  style?: React.CSSProperties;
  className?: string;
  height?: number | string;
}

/**
 * Markdown 展示组件
 *
 * @param props
 * @constructor
 */
const MarkdownViewer: React.FC<Props> = (props) => {
  const { value = '', style, className, height = 'auto' } = props;

  return (
    <div className={className} style={{ ...style }}>
      <MarkdownEditor
        initValue={value}
        readonly={true}
        toc={true}
        height={height}
      />
    </div>
  );
};

export default MarkdownViewer;
