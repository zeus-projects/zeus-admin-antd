import { addRole, fetchRolePage } from '@/services/ant-design-pro/system';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';

const Table: React.FC = () => {
  const intl = useIntl();
  const [messageApi, contextHolder] = message.useMessage();
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const [currentRow, setCurrentRow] = useState<API.RoleListItem>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);

  const columns: ProColumns<API.RoleListItem>[] = [
    {
      title: <FormattedMessage id="pages.system.role.name" defaultMessage="Role name" />,
      dataIndex: 'name',
      tooltip: '角色名称不能重复',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.system.role.status" defaultMessage="Status" />,
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: <FormattedMessage id="common.status.normal" />,
          status: 'Success',
        },
        1: {
          text: <FormattedMessage id="common.status.disabled" />,
          status: 'Error',
        },
      },
    },
  ];

  const handleAdd = async (formData: API.RoleListItem) => {
    const hide = messageApi.loading('loading...');
    if (formData) {
      await addRole(formData);
      hide();
      messageApi.success('Added successfully');
      if (formRef.current) {
        formRef.current?.resetFields();
      }
      setAddModalOpen(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    } else {
      messageApi.error('Adding failed, please try again!');
    }
  };

  return (
    <PageContainer>
      {contextHolder}
      <ProTable<API.RoleListItem>
        headerTitle={intl.formatMessage({
          id: 'pages.system.role.title',
          defaultMessage: '角色管理',
        })}
        rowKey="key"
        actionRef={actionRef}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setAddModalOpen(true);
            }}
          >
            <PlusOutlined />{' '}
            <FormattedMessage id="pages.system.role.action.add" defaultMessage="New" />
          </Button>,
        ]}
        columns={columns}
        request={fetchRolePage}
        pagination={{
          defaultPageSize: 10,
        }}
      />
      <ModalForm
        formRef={formRef}
        title={intl.formatMessage({
          id: 'pages.system.role.action.add',
          defaultMessage: 'Add Role',
        })}
        width="400px"
        open={isAddModalOpen}
        onOpenChange={setAddModalOpen}
        onFinish={async (formData) => {
          await handleAdd(formData as API.RoleListItem);
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label={intl.formatMessage({
            id: 'pages.system.role.name',
            defaultMessage: 'Name',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
        />
        <ProFormSelect
          width="md"
          name="status"
          label={intl.formatMessage({
            id: 'pages.system.role.status',
            defaultMessage: 'Status',
          })}
          options={[
            {
              value: 0,
              label: '正常',
            },
            {
              value: 1,
              label: '禁用',
            },
          ]}
        />
      </ModalForm>
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RoleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RoleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default Table;
