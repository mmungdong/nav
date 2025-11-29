# 项目样式指南

## 颜色规范

### 主要颜色
- 主色: #4361ee (深蓝色)
- 辅助色: #3f37c9 (紫色)
- 成功色: #4cc9f0 (青色)
- 警告色: #f72585 (粉色)
- 背景色: #f8f9fa (浅灰色)
- 文字色: #212529 (深灰色)

### 暗色主题颜色
- 主背景色: #121826
- 次背景色: #1e293b
- 文字主色: #f1f5f9
- 文字次色: #cbd5e1

## 字体规范

### 字体家族
```scss
.family {
  font-family: 'text', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}
```

### 字体大小
- 标题1: 32px
- 标题2: 24px
- 标题3: 20px
- 正文: 16px
- 小字: 14px
- 微软雅黑: 12px

## 间距规范

### 间距比例 (8px网格系统)
- 微小: 4px
- 小: 8px
- 中: 16px
- 大: 24px
- 超大: 32px
- 巨大: 48px

### 内边距
- 卡片内边距: 20px
- 容器内边距: 15px
- 按钮内边距: 12px 20px

### 外边距
- 元素间间距: 16px
- 容器外边距: 20px
- 卡片间间距: 20px

## 圆角规范
- 微圆角: 2px
- 小圆角: 4px
- 中圆角: 8px
- 大圆角: 12px
- 圆形: 50%

## 阴影规范
### 浅阴影
```scss
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
```

### 中阴影
```scss
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
```

### 深阴影
```scss
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
```

## 动画规范

### 过渡时间
- 快速: 0.1s
- 标准: 0.3s
- 慢速: 0.5s

### 缓动函数
- 标准缓动: ease
- 进缓动: ease-in
- 出缓动: ease-out
- 进出缓动: ease-in-out

### 常用动画
- 淡入淡出: fade-in
- 滑入滑出: slide-in
- 弹跳效果: bounce
- 脉冲效果: pulse

## 响应式断点

### 移动端 (Mobile)
```scss
@media (max-width: 768px) {
  // 移动端样式
}
```

### 平板端 (Tablet)
```scss
@media (min-width: 769px) and (max-width: 1024px) {
  // 平板端样式
}
```

### 桌面端 (Desktop)
```scss
@media (min-width: 1025px) {
  // 桌面端样式
}
```

## 组件规范

### 按钮
```scss
.btn {
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;

  &.primary {
    background: linear-gradient(135deg, #4361ee, #3f37c9);
    color: white;
    border: none;
  }

  &.secondary {
    background: #f8f9fa;
    color: #212529;
    border: 1px solid #e9ecef;
  }
}
```

### 卡片
```scss
.card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
}
```

### 表单元素
```scss
.form-input {
  padding: 12px 16px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
  }
}
```

## 暗色主题适配

所有组件都需要提供暗色主题版本，使用 `.dark` 类名前缀：

```scss
.component {
  // 浅色主题样式

  .dark & {
    // 暗色主题样式
  }
}
```

## 可访问性

### 对比度
- 文字与背景对比度至少为 4.5:1
- 重要元素对比度至少为 3:1

### 焦点状态
```scss
.focusable {
  &:focus {
    outline: 2px solid #4361ee;
    outline-offset: 2px;
  }
}
```

### 屏幕阅读器
```scss
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

## 性能优化

### CSS选择器
- 避免使用ID选择器
- 减少选择器嵌套层级（最多3层）
- 使用类选择器而非标签选择器

### 动画性能
- 优先使用transform和opacity属性动画
- 避免同时动画多个属性
- 使用will-change属性提示浏览器优化

## 测试标准

### 跨浏览器兼容性
- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

### 响应式测试
- 320px (小手机)
- 768px (平板)
- 1024px (小桌面)
- 1200px (大桌面)
- 1440px (超大桌面)