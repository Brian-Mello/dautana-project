import React, {useState, useEffect} from 'react';

// styles
import styles from './styles.css';

// images
import closeIcon from '../assets/close-icon.svg';
import smileIcon from '../assets/smile-face.svg';
import CustomInput from './components/customInput';

function PcdCaptalizerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1)
  const [isPcd, setIsPcd] = useState(false)
  const [daltonismOption, setDaltonismOption] = useState(false)
  const [deafnessOption, setDeafnessOption] = useState(false)
  const [blindnessOption, setBlindnessOption] = useState(false)
  const [otherOptions, setOtherOptions] = useState(false)
  const [textAreaValue, setTextValueArea] = useState("")
  const [missingInputsError, setMissingInputsError] = useState(false)
  const [missingTextAreaError, setMissingTextAreaError] = useState(false)

  const inputsError = <p className={styles.errorMessage}>Você deve Selecionar alguma necessidade para prosseguir</p>
  const textAreaErrorMessage = <p className={styles.errorMessage}>Para prosseguir, você precisa preencher as outras necessidades</p>

  useEffect(() => {
    const showModal = window.localStorage.getItem("notShowMore");

    if(!showModal){
      setIsOpen(true)
    }
    
  }, [])

  const handleCloseModal = () => {
    window.localStorage.setItem("notShowMore", JSON.stringify(true));
    setIsOpen(false)
  }

  const handleNextPage = () => {

    if(!isPcd) {
      setIsPcd(true);
    }

    const data = {
      isPcd,
      daltonismOption,
      deafnessOption,
      blindnessOption,
      otherOptions,
      textAreaValue
    }
  
    // const isTrue = handleCheckFields();

    console.log("pcd data", data)
    
    // isTrue ? setPage(page + 1) : ""
    setPage(page + 1)
    
  }

  const handlePreviousPage = () => {
    setPage(page - 1)
  }

  const handleCheckFields = () => {
    if(!daltonismOption && !deafnessOption && !blindnessOption && !otherOptions){
      setMissingInputsError(true)
      setTimeout(() => {
        setMissingInputsError(false)
      }, 3000)
      return
    } else if (otherOptions && textAreaValue === ""){
      setMissingTextAreaError(true)
      setTimeout(() => {
        setMissingTextAreaError(false)
      }, 3000)
      return
    } 

    return true;
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

      <button className={styles.modalButton} onClick={() => handleCloseModal()}>Não mostrar novamente</button>
    </>
  )

  const secondModalPage = (
    <>
      <h2>Quais tipos de necessidades você tem?</h2>

      <section className={styles.inputsContainer}>
          <CustomInput name={"Daltonismo"} onChange={(e) => setDaltonismOption(e.target.checked)}/>
          <CustomInput name={"Deficiência visual"} onChange={(e) => setDeafnessOption(e.target.checked)}/>
          <CustomInput name={"Deficiência auditiva"} onChange={(e) => setBlindnessOption(e.target.checked)}/>
          <CustomInput name={"Outros"} onChange={(e) => setOtherOptions(e.target.checked)}/>
      </section>

      <textarea placeholder='Descreva as outras necessidades...' className={styles.optionTextArea} onChange={(e) => setTextValueArea(e.target.value)}/>

      <button className={styles.modalButton} onClick={() => handleNextPage()}>Avançar</button>
      {missingInputsError ? inputsError : ""}
      {missingTextAreaError ? textAreaErrorMessage : ""}
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

  return isOpen ? <div className={styles.modalContainer}>
      <section className={styles.modal}>
        <img src={closeIcon} alt="close icon" className={styles.closeIcon} onClick={() => handleCloseModal()}/>
        {actualPage}
      </section>
  </div> : <></>;
}

export default PcdCaptalizerModal;