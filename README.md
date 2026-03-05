# Projeto Site NASA 
Este projeto consiste em uma interface web para visualizar a "Astronomy Picture of the Day" (APOD) da NASA, utilizando um backend em Python (FastAPI) e um frontend simples (HTML/JS/CSS).

## Pré-requisitos

- Python 3.x instalado.
- Uma chave de API da NASA (pode ser obtida em [api.nasa.gov](https://api.nasa.gov/)).

## Configuração do Backend

### 1. Preparar o Ambiente Virtual (Windows)

Abra o terminal na pasta raiz do projeto e execute:

```powershell
cd backend
# Se o venv já não estiver criado, execute: python -m venv venv
.\venv\Scripts\activate
```

### 2. Instalar Dependências

Com o ambiente virtual ativado, instale as bibliotecas necessárias:

```powershell
pip install fastapi uvicorn requests python-dotenv certifi urllib3
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` dentro da pasta `backend` com o seguinte conteúdo:

```env
NASA_API_KEY=SUA_CHAVE_AQUI
```

### 4. Iniciar o Backend

Execute o servidor FastAPI:

```powershell
python main.py
```

O servidor estará rodando em `http://localhost:8000`.

## Configuração do Frontend

O frontend é composto por arquivos estáticos. Para visualizá-lo:

1. Navegue até a pasta `frontend`.
2. Abra o arquivo `index.html` em qualquer navegador moderno.

Certifique-se de que o backend está rodando para que a busca de imagens funcione corretamente.
