import React, {useState, useEffect} from 'react';

// styles
import styles from './styles.css';

// images
import closeIcon from '../assets/close-icon.svg';
import smileIcon from '../assets/smile-face.svg';

function PcdCaptalizerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1)

  useEffect(() => {
    const showModal = window.localStorage.getItem("notShowMore");

    if(!showModal){
      setIsOpen(true)
    }
    
  }, [])

  const handleCloseModal = () => {
    setIsOpen(!isOpen)
  }

  const handleCloseModalForever = () => {
    window.localStorage.setItem("notShowMore", JSON.stringify(true))
    setIsOpen(!isOpen)
  }

  const handleNextPage = () => {
    setPage(page + 1)
  }

  const handlePreviousPage = () => {
    setPage(page - 1)
  }

  let actualPage;

  const firstModalPage = (
    <>
      <h2>Desejamos melhorar a acessibilidade de nosso site para pessoas PCD.</h2>
      <p>Você é portador de necessidades especiais?</p>

      <section className={styles.fluxeButtonsContainer}>
        <button className={styles.modalButton} onClick={() => handleNextPage()}>Sim</button>
        <button className={styles.modalButton} onClick={() => handleCloseModal()}>Não</button>
      </section>

      <button className={styles.modalButton} onClick={() => handleCloseModalForever()}>Não mostrar novamente</button>
    </>
  )

  const secondModalPage = (
    <>
      <h2>Desejamos melhorar a acessibilidade de nosso site para pessoas PCD.</h2>
      <p>Você é portador de necessidades especiais?</p>

      segunda pagina
      <button className={styles.modalButton} onClick={() => handleNextPage()}>Avançar</button>
    </>
  )

  const thirdModalPage = (
    <>
      <h2>Gostaria de aplicar a mudanças no site para as suas necessidades?.</h2>

      <button className={styles.modalButton} onClick={() => handleNextPage()}>Sim</button>
      <button className={styles.modalButton} onClick={() => handleNextPage()}>Não</button>

      <button className={styles.modalButton} onClick={() => handlePreviousPage()}>Voltar</button>
    </>
  )

  const lastModalPage = (
    <>
      <h2>Agradecemos pela participação!.</h2>
      <p>Buscamos melhorar continuamente a acessibilidade no nosso site.</p>
      <p>Esperamos que você tenha uma boa experiência. Boas compras!</p>

      <img src={smileIcon} alt='Smile face'/>

      <button className={styles.modalButton} onClick={() => handleCloseModal()}>Fechar</button>
    </>
  )

  if(page === 1) {
    actualPage = firstModalPage
  } else if (page === 2) {
    actualPage = secondModalPage
  } else if (page === 3) {
    actualPage = thirdModalPage
  } else {
    actualPage = lastModalPage
  }

  return <div className={styles.modalContainer}>
      <section className={styles.modal}>
        <img src={closeIcon} alt="close icon" className={styles.closeIcon} onClick={() => handleCloseModal()}/>
        {actualPage}
      </section>
  </div>;
}

export default PcdCaptalizerModal;