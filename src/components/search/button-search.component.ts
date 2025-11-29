// 开源项目，未经作者同意，不得以抄袭/复制代码/修改源代码版权信息。
// Copyright @ 2018-present xiejiahe. All rights reserved.

import { CommonModule } from '@angular/common'
import { Component, Input, ViewChild, ElementRef } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzPopoverModule } from 'ng-zorro-antd/popover'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { $t } from 'src/locale'
import { search } from 'src/store'
import type { ISearchItemProps } from 'src/types'
import {
  getDefaultSearchEngine,
  setDefaultSearchEngine,
  queryString,
  isDark,
  isMobile
} from 'src/utils'
import event from 'src/utils/mitt'
import { isLogin } from 'src/utils/user'

import { SearchType } from './index'

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NzInputModule,
    NzPopoverModule,
    NzSelectModule
  ],
  selector: 'app-button-search',
  templateUrl: './button-search.component.html',
  styleUrls: ['./button-search.component.scss']
})
export class ButtonSearchComponent {
  @Input() showLogo = true

  readonly $t = $t
  readonly searchEngineList: ISearchItemProps[] = search().list.filter(
    (item) => !item.blocked && !item.isInner
  )
  readonly search = search()
  readonly isMobile = isMobile()
  isDark = isDark()

  constructor() {
    event.on('EVENT_DARK', (isDark: unknown) => {
      this.isDark = isDark as boolean
    })
  }

  get logoImage() {
    const { darkLogo, logo } = search()
    return this.isDark ? darkLogo || logo : logo || darkLogo
  }

  selectEngine(engine: ISearchItemProps) {
    // 如果是外部搜索引擎，直接跳转到搜索引擎首页
    if (engine.url) {
      window.open(engine.url, '_blank')
    }
  }
}