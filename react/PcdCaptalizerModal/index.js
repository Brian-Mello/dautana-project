import React, { useState, useEffect } from "react";

// styles
import styles from "./styles.css";

// images
import closeIcon from "../assets/close-icon.svg";
import smileIcon from "../assets/smile-face.svg";
import audioOn from "../assets/volume-high.svg";
import audioOff from "../assets/volume-off.svg";
import CustomInput from './components/customInput';

// contants
import { PAGE_TEXT } from "./contants";

function PcdCaptalizerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isPcd, setIsPcd] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
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
    readText(1);
  }, [isAudioOn]);

  const readText = async (page) => {
    if (isAudioOn) {
      const textToPlay = PAGE_TEXT[page];

      textToPlay.forEach(async (element, index) => {
        await getNextAudio(element.text);
        if(index === (textToPlay.length -1)){
          setIsAudioOn(false)
        }
      });

      async function getNextAudio(sentence) {
        let audio = new SpeechSynthesisUtterance(sentence);
        const voices = window.speechSynthesis.getVoices();
        audio.voice = voices[16];
        window.speechSynthesis.speak(audio);
        return new Promise((resolve) => {
          audio.onend = resolve;
        });
      }
    } else {      
      const audio = window.speechSynthesis;
      audio.cancel();
    }
  };

  useEffect(() => {
    const showModal = window.localStorage.getItem("notShowMore");
    readText(1);
    if (!showModal) {
      setIsOpen(true);
    }
  }, []);

  const handleCloseModal = () => {
    window.localStorage.setItem("notShowMore", JSON.stringify(true));
    setIsOpen(false);
  };

  const handleNextPage = () => {
    if (!isPcd) {
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
    readText(page + 1);
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    readText(page - 1);
    setPage(page - 1);
  };

  const handleCheckFields = () => {
    if (!daltonismOption && !deafnessOption && !blindnessOption && !otherOptions) {
      setMissingInputsError(true)
      setTimeout(() => {
        setMissingInputsError(false)
      }, 3000)
      return
    } else if (otherOptions && textAreaValue === "") {
      setMissingTextAreaError(true)
      setTimeout(() => {
        setMissingTextAreaError(false)
      }, 3000)
      return
    }

    return true;
  }
  const handleIsPcd = () => {
    setIsPcd(true);
    handleNextPage();
  };
  const handleAudioClick = () => {
    setIsAudioOn(!isAudioOn);
  };

  let actualPage;

  const firstModalPage = (
    <>
      <section className={styles.modalTextContainer}>
        <h2>
          Desejamos melhorar a acessibilidade de nosso site para pessoas PCD.
        </h2>
        <p>Você é portador de necessidades especiais?</p>
      </section>

      <section className={styles.fluxeButtonsContainer}>

        <button className={styles.modalButton} onClick={() => handleIsPcd()}>
          Sim
        </button>
        <button
          className={styles.modalButton}
          onClick={() => handleCloseModal()}
        >
          Não
        </button>
      </section >

      <button className={styles.modalButton} onClick={() => handleCloseModal()}>
        Não mostrar novamente
      </button>
    </>
  );

  const secondModalPage = (
    <>
      <h2>Quais tipos de necessidades você tem?</h2>

      <section className={styles.inputsContainer}>
        <CustomInput name={"Daltonismo"} onChange={(e) => setDaltonismOption(e.target.checked)} />
        <CustomInput name={"Deficiência Visual"} onChange={(e) => setDeafnessOption(e.target.checked)} />
        <CustomInput name={"Deficiência Auditiva"} onChange={(e) => setBlindnessOption(e.target.checked)} />
        <CustomInput name={"Outros"} onChange={(e) => setOtherOptions(e.target.checked)} />
      </section>

      <textarea placeholder='Descreva as outras necessidades...' className={styles.optionTextArea} onChange={(e) => setTextValueArea(e.target.value)} />
      {missingTextAreaError ? textAreaErrorMessage : ""}

      <button className={styles.modalButton} onClick={() => handleNextPage()}>
        Avançar
      </button>
      {missingInputsError ? inputsError : ""}
    </>
  );

  const thirdModalPage = (
    <>
      <h2>
        Gostaria de aplicar a mudanças no site para as suas necessidades?
      </h2>

      <section className={styles.fluxeButtonsContainer}>

        <button className={styles.modalButton} onClick={() => handleNextPage()}>
          Sim
        </button>
        <button className={styles.modalButton} onClick={() => handleNextPage()}>
          Não
        </button>

      </section>
      <button
        className={styles.modalButton}
        onClick={() => handlePreviousPage()}
      >
        Voltar
      </button>
    </>
  );

  const lastModalPage = (
    <>
    <section className={styles.modalTextContainer}>
        <h2>Agradecemos pela participação!</h2>
        <p>Buscamos melhorar continuamente a acessibilidade no nosso site.</p>
        <p>Esperamos que você tenha uma boa experiência. Boas compras!</p>
      </section>
      <img src={smileIcon} alt="Smile face" className={styles.smileImage}/>

      <button className={styles.modalButton} onClick={() => handleCloseModal()}>
        Fechar
      </button>
    </>
  );

  if (page === 1) {
    actualPage = firstModalPage;
  } else if (page === 2) {
    actualPage = secondModalPage;
  } else if (page === 3) {
    actualPage = thirdModalPage;
  } else {
    actualPage = lastModalPage;
  }

  return isOpen ? (
    <div className={styles.modalContainer}>
      <section className={styles.modal}>
        <div className={styles.audioButton} onClick={handleAudioClick}>
          {" "}
          <img src={isAudioOn ? audioOn : audioOff} />{" "}
        </div>
        <img
          src={closeIcon}
          alt="close icon"
          className={styles.closeIcon}
          onClick={() => handleCloseModal()}
        />
        {actualPage}
      </section>
    </div>
  ) : (
    <></>
  );
}

export default PcdCaptalizerModal;
