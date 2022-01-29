import React, { useEffect, useState } from "react";
import { useProduct } from "vtex.product-context";
import { BullHornIcon } from "./icons";

const localStorageKey = "should-show-acessibility";

const TextToSpeech = () => {
  const productContext = useProduct();
  const [acessibility, setAcessibility] = useState(null);
  const textToSpeech = productContext.product.properties.filter(
    (element) => element.name === "TTS"
  );

  useEffect(() => {
    const localAcessibility = localStorage.getItem(localStorageKey);

    if (localAcessibility) {
      setAcessibility(JSON.parse(localAcessibility));
    }
  }, []);

  const handleClick = () => {
    if (textToSpeech.length > 0) {
      const textValue = textToSpeech[0].values[0];
      const msg = new SpeechSynthesisUtterance();
      const voices = window.speechSynthesis.getVoices();
      msg.voice = voices[16];
      msg.lang = "pt-BR";
      msg.text = textValue;
      window.speechSynthesis.speak(msg);
    }
  };

  const renderComponent = () => {
    if (textToSpeech.length && true) {
      return (
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            cursor: "pointer",
            padding:"0.2rem 0.5rem"
          }}
          onClick={handleClick}
          type="button"
        >
          <BullHornIcon />
        </button>
      );
    }
    return null;
  };
  return renderComponent();
};

export default TextToSpeech;
