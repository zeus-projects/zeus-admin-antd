import { addDictItem, fetchDictItemPage } from '@/services/ant-design-pro/system';
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
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';

const Table: React.FC = () => {
  const intl = useIntl();
  const [messageApi, contextHolder] = message.useMessage();
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const [currentRow, setCurrentRow] = useState<API.DictItemListItem>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);

  const columns: ProColumns<API.DictItemListItem>[] = [
    {
      title: <FormattedMessage id="pages.system.dict.key" defaultMessage="Dict Key" />,
      dataIndex: 'key',
      hideInForm: true,
      render: (dom, entity) => {
        return showDetail ? (
          <div>{dom}</div>
        ) : (
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
      title: <FormattedMessage id="pages.system.dict.item.label" />,
      dataIndex: 'label',
    },
    {
      title: <FormattedMessage id="pages.system.dict.item.value" />,
      dataIndex: 'value',
    },
  ];

  const handleAdd = async (formData: API.DictItemListItem) => {
    const hide = messageApi.loading('loading...');
    if (formData) {
      await addDictItem(formData);
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
      <ProTable<API.DictItemListItem>
        headerTitle={intl.formatMessage({ id: 'pages.system.dict.item.title' })}
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
            <FormattedMessage id="pages.system.dict.item.action.add" defaultMessage="New" />
          </Button>,
        ]}
        columns={columns}
        request={fetchDictItemPage}
        pagination={{
          defaultPageSize: 10,
        }}
      />
      <ModalForm
        formRef={formRef}
        title={intl.formatMessage({
          id: 'pages.system.dict.item.action.add',
          defaultMessage: 'Add Dict Item',
        })}
        width="400px"
        open={isAddModalOpen}
        onOpenChange={setAddModalOpen}
        onFinish={async (formData) => {
          await handleAdd(formData as API.DictItemListItem);
        }}
      >
        <ProFormText
          width="md"
          name="label"
          label={intl.formatMessage({
            id: 'pages.system.dict.item.label',
            defaultMessage: 'Label',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule label is required"
                />
              ),
            },
          ]}
        />
        <ProFormText
          width="md"
          name="value"
          label={intl.formatMessage({
            id: 'pages.system.dict.item.value',
            defaultMessage: 'Value',
          })}
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule value is required"
                />
              ),
            },
          ]}
        />
      </ModalForm>
      <Drawer
        width={400}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.value && (
          <ProDescriptions<API.DictItemListItem>
            column={1}
            title={currentRow?.label}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.value,
            }}
            columns={columns as ProDescriptionsItemProps<API.DictItemListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default Table;
