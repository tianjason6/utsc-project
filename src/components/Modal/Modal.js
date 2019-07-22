import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Modal.module.css';

const modal = ( props ) => (
        <div>
            <Backdrop showBackdrop={props.show} backdropClicked={props.closeModal}/>
            <div className={styles.Modal}
            style={{
                //making modal slide onto the screen
                transform: props.show? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1': '0'
            }}>
                {props.children}
            </div>
        </div>
);

export default modal;