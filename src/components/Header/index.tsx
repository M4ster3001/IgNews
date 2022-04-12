import Img from 'next/image';
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';

import logo from '../../../public/images/logo.svg'

export function Header() {
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Img src={logo} alt="Logo do site"/>
                <nav>
                    <a className={styles.active}>Home</a>
                    <a>Posts</a>
                </nav>

                <SignInButton />
            </div>
        </header>
    )
}