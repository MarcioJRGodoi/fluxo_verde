Este é um aplicativo mobile desenvolvido em **React Native** com **Expo**, utilizando o **Bun** como gerenciador de pacotes.

---

## ⚙️ Requisitos

Antes de rodar o projeto, certifique-se de ter os seguintes softwares instalados:

- [Node.js](https://nodejs.org/) (recomendado apenas para dependências que o Bun ainda não cobre totalmente)
- [Bun](https://bun.sh/)
- [Git](https://git-scm.com/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
- Um emulador Android configurado (Android Studio) ou o aplicativo [Expo Go](https://expo.dev/client) instalado no seu dispositivo móvel.

---

## 🐧 Instalação (Linux)


# 1. Clone o repositório
git clone https://github.com/MarcioJRGodoi/fluxo_verde
cd seu-repositorio

# 2. Instale o Bun (caso não tenha)
curl -fsSL https://bun.sh/install | bash

# Reinicie o terminal ou carregue o Bun:
source ~/.bashrc  # ou ~/.zshrc

# 3. Instale as dependências do projeto
bun install

# 4. Instale o Expo CLI globalmente (se necessário)
bun add -g expo-cli

# 5. Inicie o servidor de desenvolvimento
bun run start



## 🪟 Instalação (Windows)

:: 1. Clone o repositório
git clone https://github.com/MarcioJRGodoi/fluxo_verde
cd seu-repositorio

:: 2. Instale o Bun (requer WSL ou Node pré-instalado no Windows)
# Acesse https://bun.sh/docs/installation para o método mais recente no Windows

:: 3. Instale as dependências
bun install

:: 4. Instale o Expo CLI globalmente (se necessário)
bun add -g expo-cli

:: 5. Inicie o projeto
bun run start

