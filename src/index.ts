import inquirer from 'inquirer'
import env, { ServeEnum } from './env'
import ChatGPTService from './service/chatgpt'
import DeepSeekService from './service/deepseek'
import BaseService from './service/base'
import logger from './logger'

class Container {
  serveList = Object.entries(ServeEnum).map(([key, value]) => ({ key, value }))

  questions = [
    {
      type: 'list',
      name: 'serviceType',
      message: 'Please select a service type',
      choices: this.serveList
    }
  ]

  service!: BaseService
  /**
   * Service provider
   */
  serviceType: ServeEnum

  serviceMap = {
    [ServeEnum.ChatGPT]: ChatGPTService,
    [ServeEnum.DeepSeek]: DeepSeekService
  }

  constructor({ serve }: { serve: ServeEnum }) {
    this.serviceType = serve || env.SERVICE_TYPE
  }

  async run(commands?: any[]) {
    if (!this.serviceType) {
      await this.select()
    }
    if (this.checkServiceType()) {
      return
    }
    if (this.checkEnvApiKey()) {
      return
    }
    const Service = this.serviceMap[this.serviceType]
    this.service = new Service()
    commands?.forEach((Commander) => {
      const commander = new Commander(this.service)
      commander.apply()
    })
    return this.service
  }

  /**
   * Check if SERVICE_TYPE is configured in env and belongs to the values in serveList array
   */
  private checkServiceType() {
    const serveIncluded = this.serveList.find(
      (item) => item.value === this.serviceType
    )
    if (!serveIncluded) {
      logger.e('Please correctly configure the SERVICE_TYPE in the .env file')
      return true
    }
  }

  private checkEnvApiKey() {
    const failMap = {
      [ServeEnum.ChatGPT]: () => {
        if (!env.OPENAI_API_KEY) {
          logger.e('Please configure the OPENAI_API_KEY in the .env file first')
          return true
        }
      },
      [ServeEnum.DeepSeek]: () => {
        if (!env.DEEPSEEK_API_KEY) {
          logger.e(
            'Please configure the DEEPSEEK_API_KEY in the .env file first'
          )
          return true
        }
      }
    }
    const func = failMap[this.serviceType]
    return !!func?.()
  }

  private select() {
    return new Promise((resolve, reject) => {
      inquirer
        .prompt(this.questions as any)
        .then((res: any) => {
          this.serviceType = res.serviceType
          resolve(res)
        })
        .catch((error) => {
          console.log('❌ inquirer error:', error)
          reject(error)
        })
    })
  }
}

export default Container
