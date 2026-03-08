import { ModalForm, ProFormTextArea } from '@ant-design/pro-components';
import { message } from 'antd';
import React from 'react';
import { updatePostComment } from '@/services/post/postCommentController';

interface Props {
  oldData?: API.PostCommentVO;
  onCancel: () => void;
  onSubmit: (values?: API.PostCommentUpdateRequest) => void;
  visible: boolean;
}

const UpdateCommentModal: React.FC<Props> = (props) => {
  const { oldData, visible, onSubmit, onCancel } = props;

  if (!oldData) {
    return null;
  }

  return (
    <ModalForm<API.PostCommentUpdateRequest>
      title={'更新评论'}
      open={visible}
      initialValues={{ content: oldData.content }}
      onFinish={async (values: API.PostCommentUpdateRequest) => {
        try {
          const res = await updatePostComment({
            ...values,
            id: oldData.id,
          });
          if (res.code === 0 && res.data) {
            message.success('更新成功');
            onSubmit?.(values);
            return true;
          }
        } catch (error: any) {
          message.error(`更新失败: ${error.message}`);
        }
        return false;
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          onCancel?.();
        },
      }}
      submitter={{
        searchConfig: {
          submitText: '更新评论',
          resetText: '取消',
        },
      }}
    >
      <ProFormTextArea
        name="content"
        label="评论内容"
        placeholder="请输入评论内容"
        rules={[{ required: true, message: '请输入评论内容' }]}
        fieldProps={{
          rows: 6,
        }}
      />
    </ModalForm>
  );
};

export default UpdateCommentModal;
