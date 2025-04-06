# 🍩 kcal Clicker Game

Um divertido clicker game onde você acumula **kcal** clicando em um doce de padaria, compra upgrades e ativa boosts para maximizar seus ganhos!

Construído com [Next.js](https://nextjs.org/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) e [Sonner](https://sonner.emilkowal.dev/).

---

## 🚀 Funcionalidades

- Clique no doce para ganhar **kcal**
- Compre **Mega Clicks** (+2 por clique)
- Compre **Auto Clicks** (+1 kcal/s)
- Ative o boost **Fúria do Açúcar** (x10 por clique por 10 segundos, 1 vez por nível)
- Evolua de nível para ganhar mais **kcal/s**
- Ganhos **offline** quando você sai do jogo
- Feedback visual e sonoro com animações e toasts ✨

---

## 💰 Custos que escalam por nível

Todos os upgrades aumentam conforme seu **nível atual**, tornando o progresso cada vez mais desafiador:

| Upgrade         | Fórmula do Custo                          |
|-----------------|--------------------------------------------|
| Evoluir Nível   | `nível atual * 100`                        |
| Mega Click      | `250 + (nível * 50)`                       |
| Auto Click      | `500 + (nível * 100)`                      |

---

## 🧱 Tecnologias

- [Next.js 15 (App Router)](https://nextjs.org/)
- [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Sonner](https://sonner.emilkowal.dev/) (notificações)

---

## 🖼️ Demonstração

> Adicione aqui um link do Vercel, Netlify ou um gif do jogo funcionando.

---

## 📦 Instalação local

1. Clone o repositório:
   ```bash
   git clone https://github.com/miguelitodev/kcal-clicker-game.git
   cd kcal-clicker-game
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Rode o projeto:
   ```bash
   npm run dev
   ```

4. Acesse em [http://localhost:3000](http://localhost:3000)

---

## 🤓 Autor

Desenvolvido com carinho por [Miguelito](https://miguelito.dev) 💻  
[![GitHub](https://img.shields.io/badge/GitHub-miguelitodev-181717?style=flat&logo=github)](https://github.com/miguelitodev)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-miguelitodev-0077B5?style=flat&logo=linkedin)](https://linkedin.com/in/miguelitodev)  
[![Twitter](https://img.shields.io/badge/Twitter-miguelitoodev-1DA1F2?style=flat&logo=twitter)](https://twitter.com/miguelitoodev)

---

> 🍬 Divirta-se e clique com moderação!
