import { addMenu, fetchMenuList } from '@/services/ant-design-pro/system';
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
  const [currentRow, setCurrentRow] = useState<API.MenuListItem>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);

  const columns: ProColumns<API.MenuListItem>[] = [
    {
      title: <FormattedMessage id="pages.system.menu.name" defaultMessage="Menu name" />,
      dataIndex: 'name',
      tooltip: '菜单名称不能重复',
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
      title: <FormattedMessage id="pages.system.menu.status" defaultMessage="Status" />,
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

  const handleAdd = async (formData: API.MenuListItem) => {
    const hide = messageApi.loading('loading...');
    if (formData) {
      await addMenu(formData);
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
      <ProTable<API.MenuListItem>
        headerTitle={intl.formatMessage({
          id: 'pages.system.menu.title',
          defaultMessage: '菜单列表',
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
            <FormattedMessage id="pages.system.menu.action.add" defaultMessage="New" />
          </Button>,
        ]}
        columns={columns}
        request={fetchMenuList}
      />
      <ModalForm
        formRef={formRef}
        title={intl.formatMessage({
          id: 'pages.system.menu.action.add',
          defaultMessage: 'Add Menu',
        })}
        width="400px"
        open={isAddModalOpen}
        onOpenChange={setAddModalOpen}
        onFinish={async (formData) => {
          await handleAdd(formData as API.MenuListItem);
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label={intl.formatMessage({
            id: 'pages.system.menu.name',
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
            id: 'pages.system.menu.status',
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
          <ProDescriptions<API.MenuListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.MenuListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default Table;
