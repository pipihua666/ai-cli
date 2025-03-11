# AI-CLI

一个基于 OpenAI API 的智能命令行工具。

## 特性

- 支持多种 AI 服务提供商（ChatGPT、DeepSeek）
- 简单易用的命令行界面
- 更多功能持续开发中...

## 环境要求

- Node.js >= 14

## 安装

```bash
npm install -g ai-cli
# 或者
yarn global add ai-cli
# 或者
pnpm add -g ai-cli
```

## 配置

1. 在项目根目录创建 `.env` 文件
2. 根据使用的 AI 服务商，配置相应的环境变量：

```env
# ChatGPT 配置
OPENAI_API_KEY=your_api_key
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-3.5-turbo

# DeepSeek 配置
DEEPSEEK_API_KEY=your_api_key
DEEPSEEK_BASE_URL=your_base_url
DEEPSEEK_MODEL=your_model
```

## 功能说明

### 1. 代码审查（Code Review）

> 注意：使用此功能需要安装 Git，并确保项目已初始化 Git 仓库。

智能分析代码变更，提供详细的审查报告。

#### 使用方法

```bash
ai-cli cr [options]
```

#### 命令参数

- `-s, --serve`: 指定使用的 AI 服务商（可选）
  - `chatgpt`: 使用 ChatGPT 服务
  - `deepseek`: 使用 DeepSeek 服务

#### 示例

```bash
# 使用默认配置进行代码审查
ai-cli cr

# 指定使用 ChatGPT 服务进行代码审查
ai-cli cr -s chatgpt

# 指定使用 DeepSeek 服务进行代码审查
ai-cli cr -s deepseek
```

#### 输出示例

```
=== AI 代码审查报告 ===

1. 代码变更：
   - 修改了用户认证逻辑
   - 添加了新的错误处理机制
   - 更新了配置文件结构

2. 潜在问题：
   - 性能：认证过程可能需要优化
   - 安全：建议添加输入验证
   - 建议添加单元测试

3. 改进建议：
   [具体的代码改进建议]

=====================
```

### 2. 更多功能

我们正在开发更多实用的功能，包括但不限于：

- 代码生成：根据自然语言描述生成代码
- 代码优化：自动分析并优化代码性能
- 文档生成：自动生成代码文档
- 依赖分析：智能分析和管理项目依赖
- 安全扫描：检测潜在的安全漏洞

敬请期待！

## 贡献指南

欢迎贡献代码或提出建议！请查看我们的贡献指南了解更多信息。

## 许可证

ISC
