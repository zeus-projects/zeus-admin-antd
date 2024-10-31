import { addUser, fetchUserPage } from '@/services/ant-design-pro/system';
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
  const [currentRow, setCurrentRow] = useState<API.UserListItem>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);

  const columns: ProColumns<API.UserListItem>[] = [
    {
      title: <FormattedMessage id="pages.system.dict.key" defaultMessage="Dict Key" />,
      dataIndex: 'key',
      tooltip: <FormattedMessage id="pages.system.dict.key.tooltip" />,
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
      title: <FormattedMessage id="pages.system.dict.name" />,
      dataIndex: 'name',
      tooltip: intl.formatMessage({ id: 'pages.system.dict.name.tooltip' }),
    },
  ];

  const handleAdd = async (formData: API.UserListItem) => {
    const hide = messageApi.loading('loading...');
    if (formData) {
      await addUser(formData);
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
      <ProTable<API.UserListItem>
        headerTitle={intl.formatMessage({ id: 'pages.system.dict.title' })}
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
            <FormattedMessage id="pages.system.dict.action.add" defaultMessage="New" />
          </Button>,
        ]}
        columns={columns}
        request={fetchUserPage}
        pagination={{
          defaultPageSize: 10,
        }}
      />
      <ModalForm
        formRef={formRef}
        title={intl.formatMessage({
          id: 'pages.system.user.action.add',
          defaultMessage: 'Add User',
        })}
        width="400px"
        open={isAddModalOpen}
        onOpenChange={setAddModalOpen}
        onFinish={async (formData) => {
          await handleAdd(formData as API.UserListItem);
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label={intl.formatMessage({
            id: 'pages.system.user.username',
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
            id: 'pages.system.user.status',
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
        {currentRow?.username && (
          <ProDescriptions<API.UserListItem>
            column={2}
            title={currentRow?.username}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.username,
            }}
            columns={columns as ProDescriptionsItemProps<API.UserListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default Table;
