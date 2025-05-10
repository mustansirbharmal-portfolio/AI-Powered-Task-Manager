import fetch from 'node-fetch';

const GROQ_API_KEY = process.env.GROQ_API_KEY || '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

interface GroqResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    logprobs: null;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Generate a summary of a task description using Groq API
 * @param description - The task description to summarize
 * @returns The generated summary or null if an error occurs
 */
export const generateTaskSummary = async (description: string): Promise<string | null> => {
  try {
    if (!description || description.trim() === '') {
      return null;
    }

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates concise summaries of task descriptions. Keep summaries short and to the point, focusing on the main action items and deadlines.'
          },
          {
            role: 'user',
            content: `Summarize the following task description in one brief sentence:\n\n${description}`
          }
        ],
        temperature: 0.3,
        max_tokens: 100
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', errorText);
      return null;
    }

    const data = await response.json() as GroqResponse;
    const summary = data.choices[0]?.message.content.trim();
    
    return summary || null;
  } catch (error) {
    console.error('Error generating task summary:', error);
    return null;
  }
};
