import OpenAIApi from 'openai'
import env from '../env'
import BaseService from './base'

class ChatGPTService extends BaseService {
  config = {
    apiKey: env.OPENAI_API_KEY,
    baseURL: env.OPENAI_PROXY_URL,
    model: env.OPENAI_MODEL
  }

  client: OpenAIApi

  constructor() {
    super()
    this.client = new OpenAIApi(this.config)
  }
}

export default ChatGPTService
