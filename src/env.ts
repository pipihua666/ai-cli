import dotenv from 'dotenv'

export enum ServeEnum {
  ChatGPT = 'ChatGPT',
  DeepSeek = 'DeepSeek'
}

interface ChatGPTEnv {
  OPENAI_API_KEY: string
  OPENAI_PROXY_URL: string
  OPENAI_MODEL: string
}

interface DeepSeekEnv {
  DEEPSEEK_API_KEY: string
  DEEPSEEK_BASE_URL: string
  DEEPSEEK_MODEL: string
}

export interface IEnv extends DeepSeekEnv, ChatGPTEnv {
  SERVICE_TYPE: ServeEnum
}

const env = dotenv.config().parsed as unknown as IEnv

export default env
