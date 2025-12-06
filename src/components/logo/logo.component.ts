// 开源项目，未经作者同意，不得以抄袭/复制代码/修改源代码版权信息。
// Copyright @ 2018-present xiejiahe. All rights reserved.
// See https://github.com/xjh22222228/nav
import { CommonModule } from '@angular/common'
import { Component, Input, ChangeDetectionStrategy } from '@angular/core'
import { SkeletonComponent } from '../skeleton/index.component'
import { randomColor, getTextContent } from 'src/utils'

@Component({
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  @Input() src: string = ''
  @Input() name: string = ''
  @Input() size: number = 35
  @Input() radius: number = 3

  firstLetter: string = ''
  isError: boolean = false
  isLoading: boolean = true

  constructor() {}

  ngOnInit() {
    // 不在初始化时设置firstLetter，只在需要显示首字母时设置
    // SVG图标应该是默认显示的
  }

  private generateColor() {
    // 不再使用backgroundColor属性
  }

  private getFirstLetter() {
    if (this.name) {
      this.firstLetter = getTextContent(this.name)[0].toUpperCase()
    }
  }

  onLoad() {
    this.isLoading = false
  }

  onError() {
    this.isError = true
    this.isLoading = false
    // 只在确实需要显示首字母时才设置
    // this.getFirstLetter()
  }
}
