import React, {useState} from 'react';
import styles from './styles.css';
import closeIcon from '../assets/close-icon.svg';

function PcdCaptalizerModal() {
  const [isOpen, setIsOpen] = useState(true);

  const handleCloseModal = () => {
    setIsOpen(!isOpen)
  }

  return isOpen && <div className={styles.modalContainer}>
      <section className={styles.modal}>
        <img src={closeIcon} alt="close icon" className={styles.closeIcon} onClick={() => handleCloseModal()}/>

      </section>
  </div>;
}

export default PcdCaptalizerModal;