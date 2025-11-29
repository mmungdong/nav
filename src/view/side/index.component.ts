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
import { ComponentGroupComponent } from 'src/components/component-group/index.component'
import { STORAGE_KEY_MAP } from 'src/constants'
import { $t } from 'src/locale'
import { navs } from 'src/store'
import type { INavProps, INavTwoProp } from 'src/types'
import { isMobile, isDark } from 'src/utils'
import { settings } from 'src/store'
import { CommonService } from 'src/services/common'
import { ButtonSearchComponent } from 'src/components/search/button-search.component'
import { CardComponent } from 'src/components/card/index.component'
import { NoDataComponent } from 'src/components/no-data/no-data.component'
import { FooterComponent } from 'src/components/footer/footer.component'
import { FixbarComponent } from 'src/components/fixbar/index.component'
import { TailwindBackgroundComponent } from 'src/components/background-setting/tailwind-background.component'
import { ToolbarTitleWebComponent } from 'src/components/toolbar-title/index.component'
import { WebListComponent } from 'src/components/web-list/index.component'
import { ClassTabsComponent } from 'src/components/class-tabs/index.component'
import { LogoComponent } from 'src/components/logo/logo.component'
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
    ClassTabsComponent,
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
  menuOpenId = 0

  constructor(public commonService: CommonService) {
    this.menuOpenId = this.navs[commonService.oneIndex]?.id || 0

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

  openMenu(item: INavProps) {
    this.menuOpenId = item.id
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

  onClickNav(item: INavTwoProp) {
    this.commonService.handleClickClass(item.id)
    this.toggleSidebar(false)
  }
}
