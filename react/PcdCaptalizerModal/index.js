import React, { useState, useEffect } from "react";

// styles
import styles from "./styles.css";

// images
import closeIcon from "../assets/close-icon.svg";
import smileIcon from "../assets/smile-face.svg";
import audioOn from "../assets/volume-high.svg";
import audioOff from "../assets/volume-off.svg";

// contants
import { PAGE_TEXT } from "./contants";

function PcdCaptalizerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isPcd, setIsPcd] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);

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
    readText(page + 1);
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    readText(page - 1);
    setPage(page - 1);
  };

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
      <h2>
        Desejamos melhorar a acessibilidade de nosso site para pessoas PCD.
      </h2>
      <p>Você é portador de necessidades especiais?</p>

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
      </section>

      <button className={styles.modalButton} onClick={() => handleCloseModal()}>
        Não mostrar novamente
      </button>
    </>
  );

  const secondModalPage = (
    <>
      <h2>Quais tipos de necessidades você tem?</h2>

      <button className={styles.modalButton} onClick={() => handleNextPage()}>
        Avançar
      </button>
    </>
  );

  const thirdModalPage = (
    <>
      <h2>
        Gostaria de aplicar a mudanças no site para as suas necessidades?.
      </h2>

      <button className={styles.modalButton} onClick={() => handleNextPage()}>
        Sim
      </button>
      <button className={styles.modalButton} onClick={() => handleNextPage()}>
        Não
      </button>

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
      <h2>Agradecemos pela participação!.</h2>
      <p>Buscamos melhorar continuamente a acessibilidade no nosso site.</p>
      <p>Esperamos que você tenha uma boa experiência. Boas compras!</p>

      <img src={smileIcon} alt="Smile face" />

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
