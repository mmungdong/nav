// 开源项目，未经作者同意，不得以抄袭/复制代码/修改源代码版权信息。
// Copyright @ 2018-present xiejiahe. All rights reserved.
// See https://github.com/xjh22222228/nav

import { CommonModule } from '@angular/common'
import { Component, HostListener } from '@angular/core'
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
  private currentIndex = 0

  constructor(public commonService: CommonService) {
    event.on('EVENT_DARK', (isDark: unknown) => {
      this.isDark = isDark as boolean
    })
  }

  // 监听键盘事件
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    // ESC键关闭侧边栏
    if (event.key === 'Escape') {
      this.closeSidebarWithEscape()
      return
    }

    // 只在侧边栏打开时处理导航键
    if (!this.openSidebar) {
      return
    }

    // 方向键导航
    if (event.key === 'ArrowDown') {
      this.navigateToNext()
      event.preventDefault()
    } else if (event.key === 'ArrowUp') {
      this.navigateToPrevious()
      event.preventDefault()
    } else if (event.key === 'Enter' || event.key === ' ') {
      this.selectCurrentItem()
      event.preventDefault()
    }
  }

  // 关闭侧边栏（通过ESC键）
  closeSidebarWithEscape(): void {
    if (this.openSidebar) {
      this.toggleSidebar(false)
    }
  }

  // 导航到下一个项目
  navigateToNext(): void {
    const items = this.commonService.thirdLevelNavs()
    if (items.length === 0) return

    this.currentIndex = (this.currentIndex + 1) % items.length
    this.focusCurrentItem()
  }

  // 导航到上一个项目
  navigateToPrevious(): void {
    const items = this.commonService.thirdLevelNavs()
    if (items.length === 0) return

    this.currentIndex = (this.currentIndex - 1 + items.length) % items.length
    this.focusCurrentItem()
  }

  // 选择当前项目
  selectCurrentItem(): void {
    const items = this.commonService.thirdLevelNavs()
    if (items.length === 0 || this.currentIndex >= items.length) return

    this.onClickNav(items[this.currentIndex])
  }

  // 聚焦当前项目
  focusCurrentItem(): void {
    const items = this.commonService.thirdLevelNavs()
    if (items.length === 0 || this.currentIndex >= items.length) return

    const element = document.querySelector(`[data-nav-id="${items[this.currentIndex].id}"]`)
    if (element) {
      (element as HTMLElement).focus()
    }
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
