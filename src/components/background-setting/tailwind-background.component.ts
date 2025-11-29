// 开源项目，未经作者同意，不得以抄袭/复制代码/修改源代码版权信息。
// Copyright @ 2018-present xiejiahe. All rights reserved.
// See https://github.com/xjh22222228/nav

import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-tailwind-background',
  templateUrl: './tailwind-background.component.html',
  styleUrls: ['./tailwind-background.component.scss']
})
export class TailwindBackgroundComponent {
  @Input() height: number = 300

  getHeightClass(): string {
    if (this.height <= 200) {
      return 'short'
    } else if (this.height >= 400) {
      return 'tall'
    }
    return ''
  }
}