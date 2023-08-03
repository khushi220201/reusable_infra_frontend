import { FC } from 'react';
import styles from './login.module.scss';
import { Row, Col, Image } from 'antd';
import { LoginLayoutInterface } from './types';

// login login forgot password page
const loginLayout: FC<LoginLayoutInterface> = (props) => {
	const { children } = props;
	return (
		<div className={styles['login']}>
			<Row
				className={styles['login__wrapper']}
				justify={'space-between'}
				align={'middle'}
			>
				<Col className={styles['login__layout']} span={11}>
					<Image
						className={styles['login__layout--image']}
						src="/assets/images/login-image.png"
						preview={false}
						alt="group"
					/>
				</Col>
				<Col className={styles['login__details']} span={13}>
					<div className={styles['login__details--logo']}>
						<Image
							src="/assets/images/animal_planet_logo.png"
							preview={false}
							alt="group"
						/>
					</div>
					<div className={styles['login__details--body']}>
						{children}
					</div>
				</Col>
				
			</Row>
		</div>
	);
};

export default loginLayout;
