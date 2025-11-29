# Claude Code 项目指南 (CLAUDE.md)

这是项目的"圣经"文档，为Claude AI提供了关于此项目的完整上下文信息。Claude在参与项目时会自动加载此文档，确保其对项目有全面深入的理解。

## 项目概览

这是一个基于 Angular 的导航网站项目，具有以下特点：
- 纯静态、支持SEO、在线编辑
- 内置收录多达 800+ 优质网站
- 支持多种部署方式（GitHub Pages、Netlify、Vercel等）
- 无数据库、无服务器、零成本一键部署

## Claude Code 使用指南

### 最佳实践原则

1. **上下文完整性**：此文档包含了项目的所有关键信息，Claude应优先参考本文档而非外部知识
2. **代码质量优先**：所有代码变更都应遵循项目现有模式和最佳实践
3. **渐进式开发**：复杂功能应分解为小的、可验证的步骤
4. **测试驱动**：每次修改后都应验证构建和功能是否正常

### 项目工作流程

1. **理解需求**：仔细阅读用户请求，必要时询问澄清问题
2. **分析影响**：评估变更对现有功能的影响
3. **制定计划**：将任务分解为具体实施步骤
4. **编码实现**：编写符合项目规范的代码
5. **验证测试**：确保修改不会破坏现有功能
6. **文档更新**：必要时更新相关文档

### 主题偏好设置

用户主要使用 **side主题**，因此后续的所有更改和优化都应基于side主题的样式进行实现。在开发过程中需要特别关注：
- 确保修改与side主题的设计风格保持一致
- 验证在side主题下的功能表现和视觉效果
- 如涉及其他主题的修改，需要同时考虑对side主题的影响

### 代码规范

- 遵循项目现有的代码风格和架构模式
- 保持与现有组件的一致性
- 添加适当的注释说明复杂逻辑
- 确保代码的可读性和可维护性

### 代码质量保证

项目使用ESLint进行代码质量检查，确保代码符合规范：

1. **ESLint配置**：
   - 使用TypeScript ESLint解析器
   - 集成import插件管理导入顺序
   - 配置了适合Angular项目的规则集

2. **可用的脚本命令**：
   ```bash
   # 检查代码质量
   npm run lint

   # 自动修复可修复的问题
   npm run lint:fix

   # 格式化代码
   npm run format
   ```

3. **代码质量要求**：
   - 所有TypeScript文件都应通过ESLint检查
   - 提交代码前应运行`npm run lint:fix`自动修复问题
   - 避免使用`any`类型，应使用具体的类型定义
   - 保持导入语句的正确顺序和格式
   - 遵循单引号、无分号等基本代码风格

## 项目架构

### 技术栈

- **框架**: Angular 19
- **UI库**: ng-zorro-antd (Ant Design for Angular)
- **状态管理**: Angular Signals
- **构建工具**: Angular CLI
- **包管理**: pnpm
- **样式**: SCSS, TailwindCSS
- **其他依赖**:
  - axios (HTTP客户端)
  - dayjs (日期处理)
  - rxjs (响应式编程)
  - localforage (本地存储)

### 项目结构

```
nav/
├── .claude/                 # Claude配置目录
├── .github/                 # GitHub相关配置
├── data/                    # 静态数据文件
├── public/                  # 静态资源文件
├── scripts/                 # 构建脚本
├── src/                     # 源代码目录
│   ├── api/                 # API接口
│   ├── app/                 # 主应用组件和路由配置
│   ├── assets/              # 静态资源
│   ├── components/          # 可复用组件
│   ├── constants/           # 常量定义
│   ├── environments/        # 环境配置
│   ├── locale/              # 国际化文件
│   ├── pipe/                # Angular管道
│   ├── services/            # 服务层
│   ├── store/               # 状态管理
│   ├── types/               # TypeScript类型定义
│   ├── utils/               # 工具函数
│   ├── view/                # 页面视图组件
│   ├── main.html            # 主HTML模板
│   └── main.ts              # 应用入口文件
├── package.json             # 项目依赖和脚本
├── angular.json             # Angular配置文件
├── nav.config.yaml          # 导航配置文件
└── README.md                # 项目说明文档
```

### 核心模块

#### 1. 主应用模块 (src/app/)

包含应用的根组件和路由配置：
- `AppComponent`: 根组件，负责应用的整体布局和初始化
- `AppRoutingModule`: 路由配置，定义不同主题和系统的路由

#### 2. 视图层 (src/view/)

包含不同的主题页面和管理系统：
- `light/`: 简约主题
- `super/`: 超级主题
- `sim/`: 简单主题
- `side/`: 侧边栏主题
- `shortcut/`: 快捷方式主题
- `mobile/`: 移动端主题
- `system/`: 后台管理系统，包括：
  - info: 信息管理
  - bookmark: 书签管理
  - collect: 收录管理
  - auth: 权限管理
  - tag: 标签管理
  - search: 搜索管理
  - setting: 设置管理
  - component: 组件管理
  - web: 网站管理
  - config: 配置管理

#### 3. 组件库 (src/components/)

包含可复用的UI组件，如：
- breadcrumb: 面包屑导航
- calendar: 日历组件
- card: 卡片组件
- create-web: 创建网站组件
- delete-modal: 删除确认模态框
- edit-class: 编辑分类组件
- footer: 页脚组件
- loading: 加载动画
- login: 登录组件

#### 4. 状态管理 (src/store/)

使用Angular Signals进行状态管理：
- `settings`: 系统设置
- `search`: 搜索配置
- `tagList`: 标签列表
- `navs`: 导航数据
- `component`: 组件配置

#### 5. 服务层 (src/services/)

提供业务逻辑和服务封装：
- `common.ts`: 通用服务
- `jump.ts`: 跳转服务

#### 6. 工具函数 (src/utils/)

包含各种辅助函数：
- 路由处理
- 用户认证
- 数据处理
- 设备检测
- 字符串操作

## 配置文件

### nav.config.yaml

主要配置文件，包含：
- gitRepoUrl: 仓库地址
- branch: 部署分支
- imageRepoUrl: 图片仓库地址
- hashMode: 路由模式
- address: 自有部署地址
- password: 后台登录密码
- port: 启动端口
- email: 收录通知邮箱
- mailConfig: 邮件配置

### angular.json

Angular构建配置，定义：
- 构建选项
- 服务配置
- 测试配置

## 部署方式

1. **GitHub Pages**: 通过GitHub Actions自动部署
2. **Netlify**: 推荐的免费部署平台
3. **Vercel**: 推荐的免费部署平台
4. **Cloudflare Pages**: 推荐的免费部署平台
5. **自有部署**: 使用pm2、Docker或宝塔面板

## 开发流程

1. Fork项目
2. 修改nav.config.yaml配置
3. 配置GitHub Actions密钥
4. 启用GitHub Actions自动部署
5. 访问部署后的网站

## 主题系统

支持多种主题切换：
- light: 简约主题
- super: 超级主题
- sim: 简单主题
- side: 侧边栏主题
- shortcut: 快捷方式主题
- mobile: 移动端主题

## 功能特性

- 支持从浏览器书签导入导出
- 支持AI翻译
- 支持用户提交新增、编辑、删除
- 支持分类/网站移动和引用
- 支持SEO搜索引擎优化
- 支持网站关联多个网址或标签
- 支持检测网站存活状态
- 支持配置仅自己可见
- 支持自动抓取网站图标/名称/描述
- 支持小组件个性化定制
- 支持暗黑模式
- 支持后台管理，无需部署
- 支持足迹记忆
- 支持多种搜索查询
- 支持自定义引擎搜索
- 支持卡片广告展示
- 支持PWA应用
- 多款高颜值主题切换
- 强大的响应式系统
- 多种Loading加载动画
- 多种卡片风格设计

## 构建与测试

### 开发环境搭建

1. 安装依赖：
   ```bash
   pnpm install
   ```

2. 初始化项目：
   ```bash
   npm run init
   ```

### 本地开发测试

1. 启动开发服务器（无热重载）：
   ```bash
   npm run start
   ```
   访问地址：http://localhost:7001

2. 启动开发服务器（带热重载）：
   ```bash
   npm run start:reload
   ```
   访问地址：http://localhost:7001

### 构建测试

1. 基础构建：
   ```bash
   npm run build
   ```

2. GitHub Pages构建：
   ```bash
   npm run build-gh-pages
   ```

3. 监听模式构建（开发）：
   ```bash
   npm run watch
   ```

### Claude Code 构建验证指南

每次修改代码后，必须执行以下测试步骤确保项目正常运行：

1. **代码质量检查**：
   ```bash
   npm run lint
   ```
   验证：确保所有TypeScript文件通过ESLint检查，无严重错误

2. **本地构建测试**：
   ```bash
   npm run build
   ```
   验证：检查构建过程无错误，输出文件生成正确

3. **启动本地服务器验证构建结果**：
   ```bash
   # 使用Node.js简单服务器测试构建结果
   npx serve dist/
   ```
   验证：访问 http://localhost:3000 确认页面正常加载

4. **检查控制台是否有错误**：
   - 打开浏览器开发者工具
   - 检查Console面板是否有错误信息
   - 检查Network面板资源是否正常加载

5. **功能验证**：
   - 验证各主题页面是否正常显示
   - 验证导航功能是否正常
   - 验证搜索功能是否正常
   - 验证移动端适配是否正常

### 自动化测试

项目配置了测试环境（使用Karma和Jasmine），但未包含具体的测试用例。如需添加测试，可使用Angular CLI生成测试文件：
```bash
ng generate component [component-name] --skip-tests=false
```

运行测试：
```bash
ng test
```

### 代码格式化

提交代码前应格式化代码：
```bash
npm run format
```

## 更新与维护

### 项目更新

同步上游更新：
```bash
npm run update
```

手动更新：
```bash
npm run pull
```

### 依赖更新

定期更新项目依赖以确保安全性：
```bash
pnpm update
```

## Claude Code 界面设计指南

### 设计原则

1. **简洁清晰**：避免过多装饰，保持界面干净，减少用户认知负荷
2. **一致性**：全局统一的颜色方案、字体、间距和组件样式
3. **层次分明**：通过大小、颜色、留白区分内容优先级，引导用户视线
4. **响应式优先**：确保在所有设备上都有良好的用户体验

### 技术规范

#### CSS框架
项目使用Tailwind CSS实现快速响应式布局：
```html
<link href="https://cdn.tailwindcss.com" rel="stylesheet">
```

#### 响应式设计

##### 断点规范
- 移动端：默认样式（基础）
- 平板：`@media (min-width: 768px)`
- 桌面：`@media (min-width: 1024px)`
- 大屏：`@media (min-width: 1440px)`

##### 单位使用
- 字体大小：使用`rem`单位确保可访问性
- 间距：使用Tailwind的间距比例系统
- 容器宽度：使用百分比或`vw`单位

### UX最佳实践

#### 交互设计
- 按钮最小点击区域：44×44px
- 导航深度：不超过3级
- 反馈机制：提供即时的操作反馈
- 表单设计：清晰的标签和错误提示

#### 内容呈现
- 图片响应式：`max-width: 100%`
- 文本可读性：每行70-90字符
- 视觉层次：合理使用留白和对比

### Claude Code 提示词模板

#### 新增功能提示词
```
请为项目添加[功能描述]，要求：
1. 遵循现有设计风格和代码规范
2. 确保响应式兼容性（移动端/平板/桌面）
3. 添加必要的TypeScript类型定义
4. 集成到现有路由和状态管理系统
5. 提供构建验证说明
```

#### 代码优化提示词
```
请优化[具体组件/功能]的实现：
1. 提升性能和可维护性
2. 保持现有UI一致性
3. 确保TypeScript类型安全
4. 添加适当的错误处理
5. 验证构建和运行无误
```

#### Bug修复提示词
```
请修复[问题描述]：
1. 准确定位问题根源
2. 提供最小化的修复方案
3. 确保不引入新的问题
4. 添加回归测试验证
5. 说明验证方法
```

### Claude Code 工作流程

1. **需求理解**：仔细分析用户请求，必要时提出澄清问题
2. **影响评估**：分析变更对现有功能的影响范围
3. **方案设计**：制定实现计划，考虑最佳实践
4. **编码实现**：编写高质量、符合规范的代码
5. **验证测试**：确保构建成功且功能正常
6. **文档更新**：必要时更新相关文档

### 质量保证

每次代码变更都应：
1. 通过构建测试 (`npm run build`)
2. 验证核心功能正常运行
3. 检查控制台无错误信息
4. 确认响应式设计在各设备上正常
5. 遵循项目现有代码风格

## ESLint配置说明

项目使用现代化的ESLint配置，基于ESLint 9.x的扁平配置格式：

### 配置文件
- `eslint.config.js` - 主配置文件，使用ESM格式

### 主要特性
1. **TypeScript支持**：
   - 使用`@typescript-eslint/parser`解析TypeScript文件
   - 集成`@typescript-eslint/eslint-plugin`提供TypeScript规则

2. **导入管理**：
   - 使用`eslint-plugin-import`管理导入语句
   - 自动排序和分组导入语句
   - 检测循环依赖和未解析的导入

3. **代码风格**：
   - 单引号
   - 无分号
   - 2空格缩进
   - 行尾无空格

4. **Angular适配**：
   - 针对Angular项目优化的规则配置
   - 兼容Angular组件和模块结构

### 忽略文件
以下文件和目录被ESLint忽略：
- `data/` - 数据文件目录
- `main.ts` - 主入口文件
- `polyfills.ts` - polyfills文件
- `test.ts` - 测试入口文件
- `environments/` - 环境配置目录
- `assets/` - 静态资源目录

### 使用建议
1. 在编写代码时遵循ESLint规则
2. 提交前运行`npm run lint:fix`自动修复可修复的问题
3. 对于不可避免的规则违反，使用内联注释禁用特定规则
4. 定期更新ESLint及相关插件保持最新规则