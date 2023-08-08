import React from 'react';
import { Button, Card, Image } from 'antd';
import styles from './index.module.scss';
import { IntegrationCardProps } from '../IntegrationCard/types';

export default function IntegrationCard(props: IntegrationCardProps) {
  return (
    <Card bordered={false} className={styles.integration__card}>
      <Image preview={false} src={props?.logo} />
      <p className={styles.integration__card__company}>Company:</p>
      <p style={{ paddingBottom: '10px' }}>{props?.title}</p>
      <Button
        type={'primary'}
        ghost={props?.ghost}
        onClick={props.onButtonClick}
        danger={props?.buttonText === 'Disconnect'}>
        {props?.buttonText}
      </Button>
    </Card>
  );
}
