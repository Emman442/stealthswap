# StealthAgent - Private Trading Agent on Solana

Hey, welcome to StealthAgent.

I built this as a real private trading agent that lets you get smart swap recommendations on Solana without ever exposing your trading strategy to third-party servers.

### What is StealthAgent?

StealthAgent is a simple yet powerful chat interface where you talk to an AI trading assistant in natural language. You describe your idea, goal, or strategy, and the agent gives you tailored swap suggestions.

The big difference? Everything sensitive about your request gets encrypted on your device before it ever leaves your computer. This is powered by SolRouter.

### The Problem It Solves

Most AI trading tools today have a serious privacy issue.

When you ask something like:
"Analyze trending tokens for a medium-risk swap with 80 USDC using my momentum strategy"

...that full prompt (including your secret strategy rules, risk tolerance, and intent) gets sent in plain text to the AI provider's servers. That means your edge, your research, and your thinking process are no longer private.

This is risky for traders, researchers, and anyone running competitive strategies.

StealthAgent fixes this.

Your complete request and strategy reasoning are encrypted client-side using the SolRouter SDK. The inference happens inside secure isolated hardware, and only the final recommendation comes back. Your strategy never hits a public server in plaintext.

### How It Works

1. You type your trading idea in plain English.
2. The app sends your message through SolRouter's encrypted inference.
3. The agent reasons privately and returns clear swap recommendations.
4. You review the suggestions and can execute the swap (Jupiter integration ready for next step).

No forms. No rigid inputs. Just natural conversation with strong privacy.

### Quick Test Prompts

Here are some prompts you can copy and paste to test the app right away:

**Basic tests:**
- "Suggest a low risk swap with 50 USDC right now"
- "What should I do with 120 SOL? Give me safe options"
- "Find me a good momentum play with medium risk using 200 USDC"

**More advanced tests:**
- "Analyze trending tokens for a medium-risk swap with 80 USDC using my momentum strategy"
- "I want to rotate out of SOL into something with better short-term upside. Suggest 2 options"
- "Check for any low slippage opportunities to buy a high volume token with 150 USDC"
- "Run a quick scan and recommend the best risk-adjusted swap for me right now"

Feel free to be as specific or vague as you want. The agent handles natural language well.

### Tech Stack

- Next.js + TypeScript + Tailwind
- Solana Wallet Adapter
- SolRouter SDK for private encrypted inference
- shadcn/ui components
- Zod for response validation

### Why Private Inference Matters Here

In DeFi, your trading logic is often your biggest edge. Whether you are testing new signals, combining on-chain metrics with sentiment, or simply protecting your research, StealthAgent ensures that sensitive parts of your thinking stay private.

This is exactly the kind of use case SolRouter was built for.

### Setup Instructions

1. Clone the repo
2. Copy `.env.example` to `.env.local` and add your SolRouter API key which you can get <a href="https://www.solrouter.com/sdk">here</a>
3. Run `npm install`
4. Run `npm run dev`
5. Connect your Solana wallet (devnet recommended for testing)
6. Start chatting with the agent

Note: Swap execution is currently prepared with a toast notification. Real Jupiter transaction building and signing will be added soon.

### Future Improvements

- Full Jupiter swap execution with transaction preview
- Portfolio balance awareness
- Multi-step agent reasoning (using SolRouter agent framework)
- Trade history and performance tracking

I'd love feedback on how well the privacy feels or how useful the recommendations are.

Built for the SolRouter Bounty.

Let me know what you think!