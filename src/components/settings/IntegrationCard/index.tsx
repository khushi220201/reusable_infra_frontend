import React from 'react';
import { Button, Card, Image } from 'antd';
import styles from './index.module.scss';
import { IntegrationCardProps } from '../IntegrationCard/types';

export default function IntegrationCard(props: IntegrationCardProps) {
  return (
    <Card bordered={false} className={styles.integration__card}>
      <div className={`${props.type === 'notConnect' ? 'd-flex JCC' : ''}`}>
        <Image preview={false} src={props?.logo} />
      </div>
      {props.type === 'connect' && (
        <>
          <p className={styles.integration__card__company}>Company:</p>
          <p style={{ paddingBottom: '10px' }}>{props?.title}</p>
        </>
      )}
      {props.type === 'notConnect' && (
        <div>
          <Button
            type={'primary'}
            ghost={props?.ghost}
            className={styles.integration__btnConnect}
            onClick={props.onButtonClick}
            danger={props?.connect}>
            {props?.connect ? 'Disconnect' : props?.buttonText}
            
          </Button>
        </div>
      )}
    </Card>
  );
}
