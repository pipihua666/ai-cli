import OpenAIApi from 'openai'
import env from '../env'
import BaseService from './base'

class DeepSeekService extends BaseService {
  config = {
    apiKey: env.DEEPSEEK_API_KEY,
    baseURL: env.DEEPSEEK_BASE_URL,
    model: env.DEEPSEEK_MODEL
  }

  client: OpenAIApi

  constructor() {
    super()
    this.client = new OpenAIApi(this.config)
  }
}

export default DeepSeekService
