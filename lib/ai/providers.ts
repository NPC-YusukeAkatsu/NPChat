import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { xai } from '@ai-sdk/xai';
import { bedrock } from '@ai-sdk/amazon-bedrock';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': bedrock('anthropic.claude-3-5-sonnet-20240620-v1:0'),
        //https://docs.aws.amazon.com/bedrock/latest/userguide/inference-reasoning.html
        // claude3.7sonnetかDeepSeek-R1しかBedrockではまだ対応していない
        // 'chat-model-reasoning': wrapLanguageModel({
        //   model: xai('grok-3-mini-beta'),
        //   middleware: extractReasoningMiddleware({ tagName: 'think' }),
        // }),
        'title-model': bedrock('anthropic.claude-3-5-sonnet-20240620-v1:0'),
        'artifact-model': bedrock('anthropic.claude-3-5-sonnet-20240620-v1:0'),
      },
      imageModels: {
        'small-model': bedrock.image('amazon.nova-canvas-v1:0'),
      },
    });
