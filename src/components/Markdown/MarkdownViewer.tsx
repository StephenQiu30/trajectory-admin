import { MarkdownEditor } from '@ant-design/md-editor';
import React from 'react';

interface Props {
  value?: string;
}

/**
 * Markdown 展示组件
 *
 * @param props
 * @constructor
 */
const MarkdownViewer: React.FC<Props> = (props) => {
  const { value = '' } = props;

  return <MarkdownEditor initValue={value} readonly={true} toc={true} />;
};

export default MarkdownViewer;
