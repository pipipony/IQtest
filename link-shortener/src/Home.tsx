import React, { useState } from 'react';

const Home: React.FC = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonColor, setButtonColor] = useState('white');
  const [buttonPressed, setButtonPressed] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  const handleSubmit = () => {

    setShortUrl('');

    if (!isValidUrl(inputUrl)) {
      setError('Неверная ссылка');
      setShortUrl('');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      setShortUrl(`https://short.link`);
      setLoading(false);
    }, 2000);
  };

  // Проверка валидности введенной ссылки
  const isValidUrl = (url: string) => {
                                          const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // Протокол
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // Доменное имя
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // IP (v4)
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // Путь
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // Параметры
      '(\\#[-a-z\\d_]*)?$','i'); // Якорь
    return !!urlPattern.test(url);
  };

  const handleMouseDown = () => {
    setButtonPressed(true);
    setButtonColor('#BCB6D4');
  };

  const handleMouseUp = () => {
    setButtonPressed(false);
    setButtonColor('white');
  };

  const handleMouseEnter = () => {
     setButtonHovered(true);
     if (!buttonPressed) {
        setButtonColor('#BCB6D4');
     }
  };

  const handleMouseLeave = () => {
     setButtonHovered(false);
     if (!buttonPressed) {
        setButtonColor('white');
     }
  };

  return (
    <div className="container">
      <h1><strong>Сокращение ссылки</strong></h1>
      <input
        type="text"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        placeholder="Введите ссылку"
      />
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleSubmit}
        style={{ backgroundColor: buttonColor }}
      >
        <strong>Сократить</strong>
      </button>

      {loading && (
        <>
          <div className="loading-overlay">
              <div className="spinner"></div>
          </div>
        </>
      )}

      {error && <div className="error">{error}</div>}

      {!error && shortUrl && !loading && (
          <div className="short-url">
            <h2>Короткая ссылка: {shortUrl} </h2>
          </div>
      )}
    </div>
  );
};

export default Home;