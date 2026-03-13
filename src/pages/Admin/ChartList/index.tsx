import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Tag, Tooltip, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { deleteChart, listChartVoByPage } from '@/services/ai/smartAnalysisController';
import { ChartStatusEnumDesc } from '@/enums/ChartStatusEnum';

/**
 * 图表管理列表
 * @constructor
 */
const ChartList: React.FC = () => {
    const actionRef = useRef<ActionType>();

    // Modal 状态管理
    const [currentRow, setCurrentRow] = useState<API.ChartVO>();
    const [selectedRowsState, setSelectedRows] = useState<API.ChartVO[]>([]);

    /**
     * 删除节点
     * @param row
     */
    const handleDelete = async (row: API.ChartVO) => {
        if (!row?.id) return;
        const hide = message.loading('正在删除');
        try {
            const res = await deleteChart({ id: row.id });
            if (res.code === 0) {
                message.success('删除成功');
                actionRef.current?.reload();
            } else {
                message.error(`删除失败: ${res.message}`);
            }
        } catch (error: any) {
            message.error(`删除报错: ${error.message}`);
        } finally {
            hide();
        }
    };

    /**
     * 批量删除节点
     * @param selectedRows
     */
    const handleBatchDelete = async (selectedRows: API.ChartVO[]) => {
        if (!selectedRows?.length) return;
        const hide = message.loading('正在删除');
        try {
            const res = await Promise.all(selectedRows.map((row) => deleteChart({ id: row.id! })));
            if (res.every((r) => r.code === 0)) {
                message.success('批量删除成功');
                actionRef.current?.reloadAndRest?.();
                setSelectedRows([]);
            } else {
                message.error('部分内容删除失败');
            }
        } catch (error: any) {
            message.error(`批量删除报错: ${error.message}`);
        } finally {
            hide();
        }
    };

    /**
     * 表格列定义
     */
    const columns: ProColumns<API.ChartVO>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            valueType: 'text',
            hideInForm: true,
            hideInTable: true,
            copyable: true,
            width: 120,
        },
        {
            title: '图表名称',
            dataIndex: 'name',
            valueType: 'text',
            ellipsis: true,
            copyable: true,
        },
        {
            title: '分析目标',
            dataIndex: 'goal',
            valueType: 'text',
            ellipsis: true,
        },
        {
            title: '图表类型',
            dataIndex: 'chartType',
            valueType: 'text',
        },
        {
            title: '状态',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: ChartStatusEnumDesc,
            width: 100,
            render: (text, record) => {
                if (record.status === 'failed') {
                    return (
                        <Tooltip title={record.execMessage}>
                            <Tag color="error">失败</Tag>
                        </Tooltip>
                    );
                }
                return text;
            },
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            valueType: 'dateTime',
            hideInForm: true,
            sorter: true,
            width: 160,
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            fixed: 'right',
            width: 120,
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="确定删除？"
                        description="删除后将无法恢复？"
                        onConfirm={() => handleDelete(record)}
                    >
                        <Typography.Link key="delete" type="danger">
                            删除
                        </Typography.Link>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <ProTable<API.ChartVO, API.ChartQueryRequest>
                headerTitle="图表管理"
                actionRef={actionRef}
                rowKey="id"
                search={{ labelWidth: 100 }}
                toolBarRender={() => [
                    selectedRowsState?.length > 0 && (
                        <Popconfirm
                            key="batchDelete"
                            title="确定批量删除？"
                            onConfirm={() => handleBatchDelete(selectedRowsState)}
                        >
                            <Button type="primary" danger>
                                批量删除
                            </Button>
                        </Popconfirm>
                    ),
                ]}
                request={async (params, sort, filter) => {
                    const sortField = Object.keys(sort)?.[0] || 'createTime';
                    const sortOrder = sort?.[sortField] ?? 'descend';

                    const { data, code } = await listChartVoByPage({
                        ...params,
                        ...filter,
                        sortField,
                        sortOrder,
                    } as API.ChartQueryRequest);

                    return {
                        success: code === 0,
                        data: data?.records || [],
                        total: Number(data?.total) || 0,
                    };
                }}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => setSelectedRows(selectedRows),
                }}
                scroll={{ x: 'max-content' }}
            />
        </>
    );
};

export default ChartList;
