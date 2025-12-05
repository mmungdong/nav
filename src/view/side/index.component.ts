// 开源项目，未经作者同意，不得以抄袭/复制代码/修改源代码版权信息。
// Copyright @ 2018-present xiejiahe. All rights reserved.
// See https://github.com/xjh22222228/nav

import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { TailwindBackgroundComponent } from 'src/components/background-setting/tailwind-background.component'
import { CardComponent } from 'src/components/card/index.component'
import { ComponentGroupComponent } from 'src/components/component-group/index.component'
import { FixbarComponent } from 'src/components/fixbar/index.component'
import { FooterComponent } from 'src/components/footer/footer.component'
import { LogoComponent } from 'src/components/logo/logo.component'
import { NoDataComponent } from 'src/components/no-data/no-data.component'
import { ButtonSearchComponent } from 'src/components/search/button-search.component'
import { ToolbarTitleWebComponent } from 'src/components/toolbar-title/index.component'
import { WebListComponent } from 'src/components/web-list/index.component'
import { STORAGE_KEY_MAP } from 'src/constants'
import { $t } from 'src/locale'
import { CommonService } from 'src/services/common'
import { navs } from 'src/store'
import { settings } from 'src/store'
import type { INavProps, INavThreeProp } from 'src/types'
import { isMobile, isDark } from 'src/utils'
import event from 'src/utils/mitt'

function getDefaultCollapsed(): boolean {
  if (isMobile()) {
    return false
  }
  const localCollapsed = localStorage.getItem(STORAGE_KEY_MAP.SIDE_COLLAPSED)
  if (localCollapsed) {
    return localCollapsed === 'true'
  }
  return settings().sideCollapsed
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NzMenuModule,
    WebListComponent,
    ToolbarTitleWebComponent,
    ComponentGroupComponent,
    ButtonSearchComponent,
    NzSpinModule,
    NzToolTipModule,
    CardComponent,
    NoDataComponent,
    FooterComponent,
    FixbarComponent,
    NzLayoutModule,
    TailwindBackgroundComponent,
    NzIconModule,
    LogoComponent
  ],
  selector: 'app-side',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export default class SideComponent {
  readonly $t = $t
  isDark = isDark()
  navs: INavProps[] = navs()
  isCollapsed = getDefaultCollapsed()
  openSidebar = false

  constructor(public commonService: CommonService) {
    event.on('EVENT_DARK', (isDark: unknown) => {
      this.isDark = isDark as boolean
    })
  }

  get logoImage() {
    return this.isDark
      ? this.commonService.settings().darkLogo ||
          this.commonService.settings().logo
      : this.commonService.settings().logo ||
          this.commonService.settings().darkLogo
  }

  toggleSidebar(openSidebar?: boolean) {
    this.openSidebar = openSidebar ?? !this.openSidebar
    if (this.openSidebar) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }

  handleCollapsed() {
    this.isCollapsed = !this.isCollapsed
    localStorage.setItem(
      STORAGE_KEY_MAP.SIDE_COLLAPSED,
      String(this.isCollapsed)
    )
    setTimeout(() => {
      event.emit('COMPONENT_CHECK_OVER')
    }, 300)
  }

  onClickNav(item: INavThreeProp) {
    // 设置当前选中的三级分类ID
    this.commonService.currentSelectedThirdId = item.id

    // 定位到指定的三级分类，而不是过滤
    const element = document.getElementById(`nav-category-${item.id}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // 添加临时的高亮效果
      element.classList.add('highlight')
      setTimeout(() => {
        element.classList.remove('highlight')
      }, 2000)
    }
    this.toggleSidebar(false)
  }
}
