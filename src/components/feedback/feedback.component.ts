// 反馈机制组件
import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'

interface FeedbackItem {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  dismissing: boolean;
}

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackItems: FeedbackItem[] = []

  ngOnInit(): void {
    // 组件初始化
  }

  /**
   * 显示成功反馈
   * @param message 反馈消息
   */
  showSuccess(message: string): void {
    this.addFeedback('success', message)
  }

  /**
   * 显示错误反馈
   * @param message 反馈消息
   */
  showError(message: string): void {
    this.addFeedback('error', message)
  }

  /**
   * 显示警告反馈
   * @param message 反馈消息
   */
  showWarning(message: string): void {
    this.addFeedback('warning', message)
  }

  /**
   * 显示信息反馈
   * @param message 反馈消息
   */
  showInfo(message: string): void {
    this.addFeedback('info', message)
  }

  /**
   * 添加反馈项
   * @param type 反馈类型
   * @param message 反馈消息
   */
  private addFeedback(
    type: 'success' | 'error' | 'warning' | 'info',
    message: string
  ): void {
    const item: FeedbackItem = {
      id: Date.now(),
      type,
      message,
      dismissing: false
    }

    this.feedbackItems.push(item)

    // 3秒后自动消失
    setTimeout(() => {
      this.dismiss(item, this.feedbackItems.indexOf(item))
    }, 3000)
  }

  /**
   * 关闭反馈项
   * @param item 反馈项
   * @param index 索引
   */
  dismiss(item: FeedbackItem, index: number): void {
    if (index >= 0 && index < this.feedbackItems.length) {
      // 标记为正在关闭
      item.dismissing = true

      // 动画结束后移除
      setTimeout(() => {
        this.feedbackItems.splice(index, 1)
      }, 300)
    }
  }
}
