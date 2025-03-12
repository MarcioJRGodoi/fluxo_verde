import { tecnologiaImagens } from '../interfaces/Detalhes';
import { Tecnologias } from '../interfaces/Perguntas';
import { Detalhes } from '../interfaces/tipos';
import { Image } from 'react-native';

export const gerarHTMLDetalhes = (tecnologias: Tecnologias[], detalhes: Detalhes) => {
  return tecnologias
    .map((tec) => {
      const { descricaoCurta, descricaoDetalhada, comoImplementar, oQuePrecisa } = detalhes[tec];
      const imagens = tecnologiaImagens[tec] || [];

      return `
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #E7F6EF;
              padding: 20px;
              margin: 0;
            }
            .container {
              background-color: white;
              border: 1px solid #1E7C58;
              border-radius: 15px;
              padding: 25px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              margin-bottom: 30px;
              page-break-inside: avoid;
              overflow-wrap: break-word;
              margin-top: 20px;
            }
            .title {
              text-align: center;
              color: #1E7C58;
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 15px;
            }
            .subtitle {
              text-align: center;
              color: #1E7C58;
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 25px;
            }
            .images-flex {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              gap: 15px;
              margin-bottom: 15px;
              page-break-inside: avoid;
            }
            .tech-image {
              width: 300px; /* Tamanho padrão para o PDF */
              height: 200px; /* Tamanho padrão para o PDF */
              max-width: 100%;
              object-fit: cover;
              display: inline-block;
            }
            .section {
              margin-bottom: 25px;
              page-break-inside: avoid;
            }
            .section-title {
              color: #1E7C58;
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .description {
              font-size: 14px;
              color: #374151;
              text-align: justify;
              padding: 10px;
              overflow-wrap: break-word;
              word-wrap: break-word;
              margin-bottom: 20px;
            }
            .list-item {
              font-size: 14px;
              color: #374151;
              margin-bottom: 8px;
              overflow-wrap: break-word;
              word-wrap: break-word;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #888;
              margin-top: 10px;
              page-break-after: always;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="title">${tec}</div>
            <div class="subtitle">${descricaoCurta}</div>
            <div class="description">${descricaoDetalhada}</div>
            <div class="section">
              <div class="section-title">Como Implementar</div>
              ${comoImplementar.map(item => `<div class="list-item">• ${item}</div>`).join('')}
            </div>
            <div class="section">
              <div class="section-title">O Que Precisa</div>
              ${oQuePrecisa.map(item => `<div class="list-item">• ${item}</div>`).join('')}
            </div>
            <div class="section">
              <div class="section-title">Imagens</div>
              <div class="images-flex">
                ${imagens.map((img) => {
                  const imageSource = Image.resolveAssetSource(img as any);
                  return `<img src="${imageSource.uri}" alt="Imagem de ${tec}" class="tech-image" />`;
                }).join('')}
              </div>
            </div>
          </div>
          <div class="footer">
            <p>Gerado em ${new Date().toLocaleDateString()}</p>
          </div>
        </body>
      </html>
      `;
    })
    .join('');
};
