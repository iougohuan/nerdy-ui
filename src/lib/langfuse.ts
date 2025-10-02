/**
 * Langfuse Client Configuration
 * 
 * Utility para gerenciar prompts do Langfuse e tracing
 */

import { Langfuse } from 'langfuse';

/**
 * Singleton do Langfuse client
 */
let langfuseInstance: Langfuse | null = null;

/**
 * Verifica se o Langfuse está configurado
 */
export function isLangfuseEnabled(): boolean {
  return (
    Boolean(process.env.LANGFUSE_SECRET_KEY) &&
    Boolean(process.env.LANGFUSE_PUBLIC_KEY) &&
    process.env.USE_LANGFUSE === 'true'
  );
}

/**
 * Obtém a instância do Langfuse client
 * Retorna null se as credenciais não estiverem configuradas
 */
export function getLangfuseClient(): Langfuse | null {
  if (!isLangfuseEnabled()) {
    console.log('[Langfuse] Not enabled or not configured. Using hardcoded prompt.');
    return null;
  }

  if (!langfuseInstance) {
    langfuseInstance = new Langfuse({
      secretKey: process.env.LANGFUSE_SECRET_KEY!,
      publicKey: process.env.LANGFUSE_PUBLIC_KEY!,
      baseUrl: process.env.LANGFUSE_HOST || 'https://cloud.langfuse.com',
    });
    console.log('[Langfuse] Client initialized successfully');
  }

  return langfuseInstance;
}

/**
 * Busca um prompt do Langfuse
 * 
 * @param promptName - Nome do prompt no formato "folder/name" (ex: "IEP/Generator")
 * @param version - Versão específica (opcional, usa "production" por padrão)
 * @returns Objeto com system message, user message template e config
 */
export async function getLangfusePrompt(
  promptName: string = process.env.LANGFUSE_PROMPT_NAME || 'IEP/Generator',
  version?: string | number
) {
  const client = getLangfuseClient();

  if (!client) {
    throw new Error('Langfuse is not enabled. Please check your environment variables.');
  }

  try {
    // Buscar o prompt (usa versão "production" por padrão)
    const prompt = await client.getPrompt(promptName, version);
    
    console.log(`[Langfuse] Successfully fetched prompt: ${promptName} (version: ${prompt.version})`);

    return {
      prompt,
      systemMessage: prompt.prompt.find((msg: any) => msg.role === 'system')?.content || '',
      userMessageTemplate: prompt.prompt.find((msg: any) => msg.role === 'user')?.content || '',
      config: prompt.config || {},
      version: prompt.version,
    };
  } catch (error) {
    console.error('[Langfuse] Error fetching prompt:', error);
    throw new Error(`Failed to fetch prompt from Langfuse: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Compila o template do prompt com variáveis
 * 
 * @param template - Template string com placeholders {{variable}}
 * @param variables - Objeto com valores das variáveis
 * @returns String compilada
 */
export function compilePromptTemplate(
  template: string,
  variables: Record<string, string>
): string {
  let compiled = template;

  // Substituir todas as variáveis {{variable}} pelos valores
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    compiled = compiled.replace(regex, value || '');
  });

  return compiled;
}

/**
 * Cria um trace no Langfuse para monitoramento
 * 
 * @param traceName - Nome do trace
 * @param metadata - Metadados adicionais
 * @returns Objeto de trace
 */
export function createLangfuseTrace(
  traceName: string,
  metadata?: Record<string, any>
) {
  const client = getLangfuseClient();

  if (!client) {
    // Retorna um objeto mock se Langfuse não estiver habilitado
    return {
      id: 'mock-trace',
      update: () => {},
      event: () => {},
      span: () => ({
        id: 'mock-span',
        update: () => {},
        end: () => {},
      }),
      generation: () => ({
        id: 'mock-generation',
        update: () => {},
        end: () => {},
      }),
    };
  }

  return client.trace({
    name: traceName,
    metadata,
  });
}

/**
 * Flush pendente de eventos para o Langfuse
 * Chame isso no final de operações importantes
 */
export async function flushLangfuse() {
  const client = getLangfuseClient();
  
  if (client) {
    await client.flushAsync();
    console.log('[Langfuse] Events flushed successfully');
  }
}

