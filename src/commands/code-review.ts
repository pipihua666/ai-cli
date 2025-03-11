import { execSync } from 'child_process'
import BaseCommand from './base'

export default class CodeReview extends BaseCommand {
  async apply() {
    try {
      // 执行 git diff 命令获取代码变更
      let diffContent: string
      try {
        diffContent = execSync('git diff', { encoding: 'utf-8' })
        if (!diffContent) {
          console.error('错误：当前目录没有代码变更')
          return
        }
      } catch (error) {
        console.error('执行 git diff 命令时发生错误：', error)
        return
      }

      const completion = await this.service.create([
        {
          role: 'system',
          content: `作为代码审查助手，请针对以下代码变更进行分析，重点关注：

1. 代码变更：
   - 具体修改了哪些功能或逻辑
   - 是否有不必要的改动
   - 是否遗漏了相关文件的更新

2. 潜在问题：
   - 性能影响
   - 安全隐患
   - 兼容性问题
   - 异常处理

请简要说明：
- 需要修改的具体代码位置
- 改进建议（配合代码示例）
- 其他注意事项`
        },
        {
          role: 'user',
          content: `请分析以下代码变更：\n\n${diffContent}`
        }
      ])

      // 格式化输出 AI 的反馈
      const response = completion?.choices[0]?.message?.content
      if (response) {
        console.log('\n=== AI 代码审查报告 ===\n')
        console.log(response)
        console.log('\n=====================\n')
      } else {
        console.error('错误：未能获取 AI 的审查反馈')
      }
    } catch (error) {
      console.error('执行代码审查时发生错误：', error)
    }
  }
}
