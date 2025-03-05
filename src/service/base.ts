import path from 'path'
import fs from 'fs'
import OpenAIApi, { OpenAI } from 'openai'
import ora from 'ora'
import {
  ChatCompletionMessageParam,
  FilePurpose
} from 'openai/resources/index.mjs'
import logger from '../logger'
import { Uploadable } from 'openai/uploads.mjs'

export default abstract class BaseService {
  abstract config: {
    apiKey: string
    baseURL: string
    model: string
  }

  abstract client: OpenAIApi

  private loading = ora('loading...')

  constructor() {
    // Check if the .env file exists, if not, throw an error
    const envPath = path.join(process.cwd(), '.env')
    if (!fs.existsSync(envPath)) {
      logger.e(
        'Please create and configure the .env file according to the documentation!'
      )
      process.exit(1)
    }
  }

  /**
   * 处理 OpenAI API 调用过程中的错误
   * @param {any} err - OpenAI API 错误对象
   * @param {string} context - 错误发生的上下文描述
   * @throws {Error} 如果错误不是 OpenAI.APIError 类型，则抛出原始错误
   */
  private handleOpenAIError(err: any, context: string) {
    if (err instanceof OpenAI.APIError) {
      logger.e(
        `OpenAI API Error in ${context}:\nRequest ID: ${
          err.request_id
        }\nStatus: ${err.status}\nName: ${err.name}\nHeaders: ${JSON.stringify(
          err.headers
        )}`
      )
    } else {
      throw err
    }
  }

  /**
   * 创建普通的 OpenAI 聊天对话
   * @param {Array<ChatCompletionMessageParam>} messages - 聊天消息数组
   * @returns {Promise<OpenAI.Chat.Completions.ChatCompletion>} 返回聊天完成结果
   * @throws {OpenAI.APIError} 当 API 调用失败时抛出错误
   */
  async create(messages: Array<ChatCompletionMessageParam>) {
    try {
      this.loading.start()
      const completion = await this.client.chat.completions.create({
        messages,
        model: this.config.model
      })
      return completion
    } catch (err) {
      this.handleOpenAIError(err, 'create chat completion')
    } finally {
      this.loading.stop()
    }
  }

  /**
   * 创建流式的 OpenAI 聊天对话
   * @param {Array<ChatCompletionMessageParam>} messages - 聊天消息数组
   * @returns {Promise<OpenAI.Chat.Completions.ChatCompletionStream>} 返回流式聊天完成结果
   * @throws {OpenAI.APIError} 当 API 调用失败时抛出错误
   */
  async stream(messages: Array<ChatCompletionMessageParam>) {
    try {
      this.loading.start()
      const stream = await this.client.beta.chat.completions.stream({
        messages,
        model: this.config.model,
        stream: true
      })
      return stream
    } catch (err) {
      this.handleOpenAIError(err, 'stream chat completion')
    } finally {
      this.loading.stop()
    }
  }

  /**
   * 上传文件到 OpenAI API
   * @param {Uploadable} file - 要上传的文件
   * @param {FilePurpose} purpose - 文件用途，默认为 'assistants'
   * @returns {Promise<OpenAI.Files.FileObject>} 返回上传后的文件对象
   * @throws {OpenAI.APIError} 当文件上传失败时抛出错误
   */
  async file(file: Uploadable, purpose: FilePurpose = 'assistants') {
    try {
      this.loading.start()
      const fileObject = await this.client.files.create({
        file,
        purpose
      })
      return fileObject
    } catch (err) {
      this.handleOpenAIError(err, 'file upload')
    } finally {
      this.loading.stop()
    }
  }
}
