# ElisaBot

Este é um chatbot inspirado no clássico **ELIZA (1966)**, desenvolvido como projeto de estudo em **JavaScript (Node.js)**.  
O bot simula uma conversa teraputica simples utilizando **reflexão linguística**, **detecção de emoções** e **respostas dinâmicas**, mantendo um diálogo contínuo no terminal.

O projeto **não replica fielmente o algoritmo original**, mas se inspira em seus conceitos, aplicando-os com uma abordagem moderna baseada em **funções assíncronas**, **regex** e **estrutura modular**.

---

## Por que este projeto?

- Aprender **JavaScript na prática**, indo além do básico:
  - Promises e `async/await`
  - Manipulação de arrays e objetos
  - Normalização de texto
  - Expressões regulares (Regex)
- Entender como funcionam **chatbots clássicos baseados em regras**
- Criar uma base sólida para evoluções futuras, como:
  - Processamento de linguagem natural mais avançado
  - Memória de contexto
  - Integração com IA simbólica ou híbrida

---

## O que ele faz?

- Interage com o usuário via **terminal**
- Captura a entrada do usuário de forma assíncrona
- Normaliza a frase (caixa alta, remoção de pontuação, divisão em palavras)
- Realiza **reflexão pronominal**, trocando perspectivas (EU ↔ VOCÊ)
- Identifica **emoções** a partir de palavras-chave
- Gera perguntas coerentes com a emoção detectada
- Aplica **regras gramaticais** para ajustar a frase final
- Exibe respostas com **animação de digitação** e efeito sonoro (beep)

---

## Como funciona (fluxo simplificado)

1. Elisa inicia a conversa com uma pergunta.
2. O usuário digita uma frase.
3. A frase é convertida em um array de palavras.
4. Palavras são refletidas usando um dicionário linguístico.
5. Palavras emocionais são detectadas e categorizadas.
6. Uma resposta emocional é escolhida aleatoriamente.
7. A frase refletida passa por um normalizador gramatical.
8. Elisa exibe a resposta de forma animada e continua a conversa.

---

## Estrutura do código

- **userPromise**: captura a entrada do usuário usando `Promise`
- **userTalk**: controla exibição e retorno da fala do usuário
- **elisaAppear**: exibe o ASCII art da Elisa
- **elisaTalkingAnim**: anima a fala da Elisa caractere por caractere
- **elisaReflection**: reflete pronomes e reorganiza a frase
- **emotionsFilter**: detecta emoções e escolhe respostas apropriadas
- **sentenceNormalizer**: corrige construções gramaticais usando regex
- **main**: controla o fluxo principal da conversa

---

## Requisitos

- **Windows** (necessário para o beep via PowerShell)
- **Node.js** instalado

---

## Como rodar

1. Clone ou baixe o projeto
2. Abra o terminal na pasta do arquivo
3. Execute:

```bash
node elisa-anya.js
