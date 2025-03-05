import BaseCommand from './base'

export default class CodeReview extends BaseCommand {
  async apply() {
    const completion = await this.service.create([
      {
        role: 'system',
        content: '你是一个代码审查助手，专门分析合并请求（MR）代码。'
      },
      { role: 'user', content: '请分析以下代码的潜在问题：\n\n<代码内容>' },
      {
        role: 'assistant',
        content:
          '根据您的请求，我发现了以下潜在问题：\n\n1. 问题描述\n2. 问题描述\n...'
      }
    ])
    console.log(completion)
  }
}
