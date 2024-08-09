import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';

const Table: React.FC = () => {
  const intl = useIntl();
  return (
    <PageContainer
      content={intl.formatMessage({
        id: 'pages.system.user.title',
        defaultMessage: 'This page can only be viewed by admin',
      })}
    >

    </PageContainer>
  );
}

export default Table;
