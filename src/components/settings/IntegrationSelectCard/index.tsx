import React from 'react';
import { Card, Image } from 'antd';
import styles from './index.module.scss';
import { IntegrationCardProps } from 'components/settings/IntegrationSelectCard/types';

export default function IntegrationSelectCard(props: IntegrationCardProps) {
  return (
    <Card
      onClick={props.onButtonClick}
      bordered={false}
      className={`${styles.integration__card} eVC pointer`}
      style={props.select ? { border: '2px solid #1677ff' } : {}}>
      <Image preview={false} src={props?.logo} />
    </Card>
  );
}
