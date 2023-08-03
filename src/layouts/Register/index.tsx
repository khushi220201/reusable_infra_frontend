import { FC } from 'react';
import styles from './register.module.scss';
import { Row, Col, Image } from 'antd';
import { RegisterLayoutInterface } from './types';

// register register forgot password page
const regitserLayout: FC<RegisterLayoutInterface> = (props) => {
	const { children } = props;
	return (
		<div className={styles['register']}>
			<Row
				className={styles['register__wrapper']}
				justify={'space-between'}
				align={'middle'}
			>
				<Col className={styles['register__layout']} span={11}>
					<Image
						className={styles['register__layout--image']}
						src="/assets/images/register-image.png"
						preview={false}
						alt="group"
					/>
				</Col>
				<Col className={styles['register__details']} span={13}>
					<div className={styles['register__details--logo']}>
						<img
							src="/assets/images/animal_planet_logo.png"
							
							alt="group"
						/>
					</div>
					<div className={styles['register__details--body']}>
						{children}
					</div>
				</Col>
				
			</Row>
		</div>
	);
};

export default regitserLayout;
