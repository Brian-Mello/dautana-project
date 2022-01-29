import React from 'react';
import styles from './styles.css';

export default function CustomInput({name, onChange}) {
  return (
    <div className={styles.radioButtonContainer}>
      <input type="checkbox" id={`${name}`} value={`${name}`} onChange={onChange}/>
      <label for={`${name}`}>{name}</label>
    </div>
  )
}
