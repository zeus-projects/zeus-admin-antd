import { ModalForm, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { useRef, useState } from 'react';

export type FormValueType = Partial<API.DictListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.DictListItem>;
};
const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  const formRef = useRef<ProFormInstance>();
  const [isAddModalOpen, setAddModalOpen] = useState<boolean>(false);
  console.log(isAddModalOpen);
  return (
    <ModalForm
      formRef={formRef}
      initialValues={{
        key: props.values.key,
        name: props.values.name,
      }}
      title={intl.formatMessage({
        id: 'pages.system.dict.item.action.add',
        defaultMessage: 'Add Dict Item',
      })}
      width="400px"
      open={props.updateModalOpen}
      onOpenChange={setAddModalOpen}
      onFinish={async (formData) => {
        alert(JSON.stringify(formData));
      }}
    >
      <ProFormText
        width="md"
        name="key"
        label={intl.formatMessage({
          id: 'pages.system.dict.key',
          defaultMessage: 'Dict Key',
        })}
        readonly
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage
                id="pages.system.dict.key.tooltip"
                defaultMessage="Dict Key is required"
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
          defaultMessage: 'Dict Name',
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
  );
};
export default UpdateForm;
