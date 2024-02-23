// Importações necessárias
import styles from './Home.module.css';
import { NavWrapper } from '../../shared';
import { Nav } from 'react-bootstrap';

export function Home() {
  return (
    <div className={styles.homePage}>
      <NavWrapper>
        <Nav className="justify-content-center" activeKey="/home">
          <Nav.Item>
            <Nav.Link href="/characters" className={styles.navLink}>Characters</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/episodes" className={styles.navLink}>Episodes</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/locations" className={styles.navLink}>Locations</Nav.Link>
          </Nav.Item>
        </Nav>
      </NavWrapper>
      <div className={styles.heroSection}>
        <h1>Welcome to the Rick and Morty Universe</h1>
        <p>Explore characters, episodes, and locations.</p>
      </div>
      <div className={styles.backgroundImage} />
    </div>
  );
}
