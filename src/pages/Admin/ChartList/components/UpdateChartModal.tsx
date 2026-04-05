import { ModalForm, ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { message } from 'antd';
import React from 'react';
import { updateChart } from '@/services/ai/smartAnalysisController';

interface Props {
  oldData?: API.ChartVO;
  onCancel: () => void;
  onSubmit: (values?: API.ChartUpdateRequest) => void;
  visible: boolean;
}

/**
 * 更新图表 Modal
 * @param props
 * @constructor
 */
const UpdateChartModal: React.FC<Props> = (props) => {
  const { oldData, visible, onSubmit, onCancel } = props;
  const [form] = ProForm.useForm<API.ChartUpdateRequest>();

  // Reset form when modal opens
  React.useEffect(() => {
    if (visible && oldData) {
      form.setFieldsValue(oldData);
    }
  }, [visible, oldData, form]);

  if (!oldData) {
    return null;
  }

  return (
    <ModalForm<API.ChartUpdateRequest>
      title="更新图表信息"
      open={visible}
      form={form}
      onFinish={async (values) => {
        try {
          const res = await updateChart({
            ...values,
            id: oldData?.id as any,
          });
          if (res.code === 0) {
            message.success('更新成功');
            onSubmit?.(values);
            return true;
          } else {
            message.error(`更新失败: ${res.message}`);
          }
        } catch (error: any) {
          message.error(`更新报错: ${error.message}`);
        }
        return false;
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel?.(),
      }}
      submitter={{
        searchConfig: {
          submitText: '更新',
          resetText: '取消',
        },
      }}
    >
      <ProFormText
        name="name"
        label="图表名称"
        rules={[{ required: true, message: '请输入图表名称' }]}
        placeholder="请输入图表名称"
      />
      <ProFormTextArea name="goal" label="分析目标" placeholder="请输入分析目标" />
      <ProFormText name="chartType" label="图表类型" placeholder="请输入图表类型" />
    </ModalForm>
  );
};
export default UpdateChartModal;
