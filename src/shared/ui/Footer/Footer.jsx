import { Layout, Row, Col, Typography, Space } from 'antd';
import { InstagramOutlined, TwitterOutlined, GithubOutlined, FacebookOutlined } from '@ant-design/icons';
import styles from './Footer.module.css';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer = () => {
  return (
    <AntFooter className={styles.footer}>
      <div className={styles.container}>
        <Row gutter={[40, 40]} justify="space-between">
          {/* Sütun 1: Loqo və haqqında */}
          <Col xs={24} md={8}>
            <Title level={3} className={styles.title}>MY-SHOP</Title>
            <Text className={styles.description}>
              Ən son trendlər və keyfiyyətli məhsullarla xidmətinizdəyik. 
              Sizin üslubunuz, bizim məhsullarımız.
            </Text>
          </Col>

          {/* Sütun 2: Linklər */}
          <Col xs={12} md={4}>
            <Title level={5} className={styles.subtitle}>Shop</Title>
            <Space orientation="vertical">
              <Link href="/products" className={styles.link}>Bütün Məhsullar</Link>
              <Link href="#" className={styles.link}>Endirimdəkilər</Link>
              <Link href="#" className={styles.link}>Yeni gələnlər</Link>
            </Space>
          </Col>

          {/* Sütun 3: Dəstək */}
          <Col xs={12} md={4}>
            <Title level={5} className={styles.subtitle}>Dəstək</Title>
            <Space orientation="vertical">
              <Link href="#" className={styles.link}>Sifariş izləmə</Link>
              <Link href="#" className={styles.link}>Çatdırılma</Link>
              <Link href="#" className={styles.link}>Əlaqə</Link>
            </Space>
          </Col>

          {/* Sütun 4: Sosial Media */}
          <Col xs={24} md={6}>
            <Title level={5} className={styles.subtitle}>Bizi izləyin</Title>
            <Space size="large">
              <InstagramOutlined className={styles.icon} />
              <FacebookOutlined className={styles.icon} />
              <TwitterOutlined className={styles.icon} />
              <GithubOutlined className={styles.icon} />
            </Space>
          </Col>
        </Row>

        <div className={styles.bottomBar}>
          <Text className={styles.copyright}>© 2026 MY-SHOP. Bütün hüquqlar qorunur.</Text>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;