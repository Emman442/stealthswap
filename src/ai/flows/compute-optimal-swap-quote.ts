'use server';
/**
 * @fileOverview A Genkit flow for computing optimal swap quotes based on a trading strategy and real-time market data.
 *
 * - computeOptimalSwapQuote - A function that handles the computation of optimal swap quotes.
 * - ComputeOptimalSwapQuoteInput - The input type for the computeOptimalSwapQuote function.
 * - ComputeOptimalSwapQuoteOutput - The return type for the computeOptimalSwapQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const TokenDataSchema = z.object({
  symbol: z.string().describe('The symbol of the cryptocurrency token (e.g., ETH, USDC).'),
  priceUsd: z.number().describe('The current price of the token in USD.'),
  liquidityUsd: z.number().describe('The total liquidity of the token pair in USD.'),
  volume24hUsd: z.number().describe('The 24-hour trading volume of the token in USD.'),
  priceImpact: z.number().describe('The estimated price impact for a typical swap in percentage.'),
});

const ComputeOptimalSwapQuoteInputSchema = z.object({
  tradingStrategy: z.object({
    goal: z.string().describe('The objective of the trading strategy (e.g., "maximize profit", "minimize slippage", "arbitrage opportunity").'),
    riskTolerance: z.enum(['low', 'medium', 'high']).describe('The trader\'s risk tolerance for the swap.'),
    amountIn: z.number().describe('The amount of the input token to swap.'),
    tokenInSymbol: z.string().describe('The symbol of the token being swapped from.'),
    tokenOutSymbol: z.string().describe('The symbol of the token being swapped to.'),
  }).describe('The details of the user\'s local trading strategy.'),
  marketData: z.array(TokenDataSchema).describe('Real-time market data for relevant tokens, including input and output tokens.'),
  // Note: The prompt explicitly states "encrypted inference", but LLMs inherently process plaintext.
  // We assume that the secure processing refers to the Genkit backend being a trusted environment
  // and the prompt guiding the LLM to act as a neutral calculator rather than "learning" the strategy.
});
export type ComputeOptimalSwapQuoteInput = z.infer<typeof ComputeOptimalSwapQuoteInputSchema>;

// Output Schema
const SwapQuoteSchema = z.object({
  exchange: z.string().describe('The decentralized exchange providing the quote (e.g., Uniswap, Sushiswap, PancakeSwap).'),
  amountOut: z.number().describe('The estimated amount of the output token received.'),
  slippage: z.number().describe('The estimated slippage percentage for the swap.'),
  gasFeeUsd: z.number().describe('The estimated gas fee in USD for the transaction.'),
  estimatedProfitUsd: z.number().optional().describe('The estimated profit in USD for the swap, if applicable to the strategy.'),
  rationale: z.string().describe('A brief explanation of why this quote is considered optimal based on the strategy.'),
});

const ComputeOptimalSwapQuoteOutputSchema = z.object({
  optimalSwapQuotes: z.array(SwapQuoteSchema).describe('A list of recommended optimal swap quotes.'),
  strategySummary: z.string().describe('A summary of how the provided strategy and market data were used to determine the optimal quotes.'),
});
export type ComputeOptimalSwapQuoteOutput = z.infer<typeof ComputeOptimalSwapQuoteOutputSchema>;

export async function computeOptimalSwapQuote(input: ComputeOptimalSwapQuoteInput): Promise<ComputeOptimalSwapQuoteOutput> {
  return computeOptimalSwapQuoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'computeOptimalSwapQuotePrompt',
  input: {schema: ComputeOptimalSwapQuoteInputSchema},
  output: {schema: ComputeOptimalSwapQuoteOutputSchema},
  prompt: `You are a sophisticated and neutral financial AI assistant specializing in decentralized finance (DeFi) trading. Your task is to analyze a given trading strategy and real-time market data to compute and recommend optimal cryptocurrency swap quotes. You must adhere strictly to the provided strategy parameters and market conditions. Do not "learn" or store any strategy details beyond this interaction. Your goal is to act as an inference engine, providing calculated recommendations based solely on the input.

The user's local trading strategy is defined by:
- Goal: {{{tradingStrategy.goal}}}
- Risk Tolerance: {{{tradingStrategy.riskTolerance}}}
- Amount to swap: {{{tradingStrategy.amountIn}}} {{{tradingStrategy.tokenInSymbol}}}
- Target token: {{{tradingStrategy.tokenOutSymbol}}}

Real-time market data for relevant tokens:
{{#each marketData}}
- Symbol: {{{this.symbol}}}, Price (USD): {{{this.priceUsd}}}, Liquidity (USD): {{{this.liquidityUsd}}}, Volume 24h (USD): {{{this.volume24hUsd}}}, Price Impact: {{{this.priceImpact}}}%
{{/each}}

Based on the trading strategy and current market data, provide a list of optimal swap quotes. Focus on the best exchanges and parameters to achieve the 'Goal' while respecting the 'Risk Tolerance'. Consider factors like slippage, gas fees, and liquidity.

Generate the output in JSON format according to the provided schema. Ensure the 'rationale' for each quote is clear and directly links back to the strategy and market data. If no optimal quotes can be determined, provide an empty array for 'optimalSwapQuotes' and explain why in 'strategySummary'.`
});

const computeOptimalSwapQuoteFlow = ai.defineFlow(
  {
    name: 'computeOptimalSwapQuoteFlow',
    inputSchema: ComputeOptimalSwapQuoteInputSchema,
    outputSchema: ComputeOptimalSwapQuoteOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
