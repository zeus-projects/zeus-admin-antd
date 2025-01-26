import { addDict, fetchDictPage } from '@/services/ant-design-pro/system';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProColumns,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProFormInstance,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, Link, useIntl } from '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
// import UpdateForm from './components/UpdateForm';

const Table: React.FC = () => {
  const intl = useIntl();
  const [messageApi, contextHolder] = message.useMessage();
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const [currentRow, setCurrentRow] = useState<API.DictListItem>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);

  const columns: ProColumns<API.DictListItem>[] = [
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
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      width: 200,
      render: () => {
        return (
          <Link to={`/system/dict/item`}>
            <Button type="primary">
              <FormattedMessage id="pages.system.dict.action.item" />
            </Button>
          </Link>
        );
      },
    },
  ];

  const handleAdd = async (formData: API.DictListItem) => {
    const hide = messageApi.loading('loading...');
    if (formData) {
      await addDict(formData);
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
      <ProTable<API.DictListItem>
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
            <PlusOutlined />
            <FormattedMessage id="pages.system.dict.action.add" defaultMessage="New" />
          </Button>,
        ]}
        columns={columns}
        request={fetchDictPage}
        pagination={{
          defaultPageSize: 10,
        }}
      />
      <ModalForm
        formRef={formRef}
        title={intl.formatMessage({
          id: 'pages.system.dict.action.add',
          defaultMessage: 'Add Dict',
        })}
        width="400px"
        open={isAddModalOpen}
        onOpenChange={setAddModalOpen}
        onFinish={async (formData) => {
          await handleAdd(formData as API.DictListItem);
        }}
      >
        <ProFormText
          width="md"
          name="key"
          label={intl.formatMessage({
            id: 'pages.system.dict.key',
            defaultMessage: 'Key',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule key is required"
                />
              ),
            },
          ]}
        />
        <ProFormText
          width="md"
          name="name"
          label={intl.formatMessage({
            id: 'pages.system.dict.name',
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
          <ProDescriptions<API.DictListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.DictListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default Table;
