import React from 'react';
import styles from './Backdrop.module.css';

const backdrop= ( props ) => (
    props.showBackdrop ? <div className={styles.Backdrop} onClick={props.backdropClicked} /> : null

);

export default backdrop;