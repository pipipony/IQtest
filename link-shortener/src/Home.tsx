import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Сокращатель ссылок';
  }, []);

  const handleSubmit = async () => {
        setShortUrl('');
        setError('');

        if (!isValidUrl(inputUrl)) {
          setError('Неверная ссылка');
          return;
        }

        setLoading(true);

        try {
          const response = await axios.post('http://127.0.0.1:9000/test/', {
            original_url: inputUrl
          });
          setShortUrl(response.data.short_url);
        } catch (err) {
          setError('Ошибка при сокращении ссылки');
        } finally {
          setLoading(false);
        }
    };

    const handleShortUrlClick = async () => {
          setError('');
          setLoading(true);

          try {
            const response = await axios.get('http://127.0.0.1:9000/');
            window.location.href = response.data.original_url;
          } catch (err) {
            setError('Ошибка при получении сокращённой ссылки');
          } finally {
            setLoading(false);
          }
      };


  const isValidUrl = (url: string) => {
    const urlPattern = new RegExp('^(https?:\\/\\/)' + // Протокол (http или https)
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // Доменное имя
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // IP (v4)
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // Путь
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // Параметры
      '(\\#[-a-z\\d_]*)?$','i'); // Якорь
    return !!urlPattern.test(url);
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
        onClick={handleSubmit}
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
            <h2>
                Короткая ссылка: <a href="#" onClick={handleShortUrlClick} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
            </h2>
          </div>
      )}
    </div>
  );
};

export default Home;