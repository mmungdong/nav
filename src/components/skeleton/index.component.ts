// 开源项目，未经作者同意，不得以抄袭/复制代码/修改源代码版权信息。
// Copyright @ 2018-present xiejiahe. All rights reserved.
// See https://github.com/xjh22222228/nav

import { CommonModule } from '@angular/common'
import { Component, Input, ChangeDetectionStrategy } from '@angular/core'

@Component({
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-skeleton',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class SkeletonComponent {
  @Input() width: string | number = '100%'
  @Input() height: string | number = '100%'
  @Input() borderRadius: string = '4px'
  @Input() variant: 'text' | 'circular' | 'rectangular' = 'rectangular'
  @Input() animation: 'pulse' | 'wave' | 'none' = 'pulse'

  constructor() {}
}