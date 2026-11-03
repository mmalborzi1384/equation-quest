import type { ReactNode } from 'react';
import styles from './PageIntro.module.css';

type Props = { eyebrow: string; title: string; description: string; children?: ReactNode };
export function PageIntro({ eyebrow, title, description, children }: Props) {
  return (
    <div className={styles.intro}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
      {children && <div className={styles.actions}>{children}</div>}
    </div>
  );
}
