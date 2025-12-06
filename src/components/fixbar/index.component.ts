// 开源项目，未经作者同意，不得以抄袭/复制代码/修改源代码版权信息。
// Copyright @ 2018-present xiejiahe. All rights reserved.
// See https://github.com/xjh22222228/nav

import { CommonModule } from '@angular/common'
import { Component, Output, EventEmitter, Input } from '@angular/core'
import { Router } from '@angular/router'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NzModalService } from 'ng-zorro-antd/modal'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { fromEvent, Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { updateFileContent } from 'src/api'
import { DB_PATH, STORAGE_KEY_MAP } from 'src/constants'
import { $t, getLocale } from 'src/locale'
import { navs, settings } from 'src/store'
import { isDark as isDarkFn } from 'src/utils'
import mitt from 'src/utils/mitt'
import { cleanWebAttrs } from 'src/utils/pureUtils'
import { unregisterServiceWorkers, isPwaMode } from 'src/utils/sw'
import { isLogin } from 'src/utils/user'
import { addDark, removeDark, isSelfDevelop } from 'src/utils/utils'

@Component({
  standalone: true,
  imports: [CommonModule, NzDropDownModule, NzToolTipModule],
  selector: 'app-fixbar',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [NzModalService, NzMessageService]
})
export class FixbarComponent {
  @Input() showTop: boolean = true
  @Input() showCollapse: boolean = true
  @Input() collapsed: boolean = false
  @Input() selector: string = ''
  @Output() onCollapse = new EventEmitter()

  readonly $t = $t
  readonly settings = settings()
  readonly language = getLocale()
  readonly isLogin = isLogin
  private scrollSubscription: Subscription | null = null
  readonly isSelfDevelop = isSelfDevelop
  readonly isPwaMode = isPwaMode() && window.__PWA_ENABLE__
  isDark: boolean = isDarkFn()
  isShowFace = true
  isShowTop = false
  entering = false
  checking = false
  open = localStorage.getItem(STORAGE_KEY_MAP.FIXBAR_OPEN) === 'true'

  constructor(
    private message: NzMessageService,
    private modal: NzModalService,
    private router: Router
  ) {
    if (this.isDark) {
      addDark()
    }


    if (!isLogin) {
      const isShowFace = !this.settings.showLanguage
      if (isShowFace) {
        this.open = true
        this.isShowFace = false
      }
    }
  }

  onScroll(event: any) {
    const top = event?.target?.scrollTop || scrollY
    this.isShowTop = top > 100
  }

  ngAfterViewInit() {
    const target = this.selector
      ? (document.querySelector(this.selector) as HTMLElement)
      : window

    this.onScroll(target)
    this.scrollSubscription = fromEvent(target, 'scroll')
      .pipe(debounceTime(100))
      .subscribe((event) => this.onScroll(event))
  }

  ngOnDestroy() {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe()
      this.scrollSubscription = null
    }
  }


  goTop() {
    const config: ScrollToOptions = {
      top: 0,
      behavior: 'smooth'
    }
    if (this.selector) {
      const el = document.querySelector(this.selector)
      if (el) {
        el.scrollTo(config)
      }
      return
    }

    window.scrollTo(config)
  }

  collapse() {
    this.onCollapse.emit()
  }

  toggleMode() {
    this.isDark = !this.isDark
    mitt.emit('EVENT_DARK', this.isDark)
    window.localStorage.setItem(
      STORAGE_KEY_MAP.IS_DARK,
      String(Number(this.isDark))
    )

    if (this.isDark) {
      addDark()
    } else {
      removeDark()
    }
  }

  goSystemPage() {
    this.entering = true
    this.router.navigate(['system'])
  }

  handleOpen() {
    if (!this.isShowFace) {
      return
    }
    this.open = !this.open
    localStorage.setItem(STORAGE_KEY_MAP.FIXBAR_OPEN, String(this.open))
  }

  unregisterServiceWorkers() {
    this.checking = true
    unregisterServiceWorkers()
      .then((status) => {
        if (status) {
          setTimeout(() => {
            location.reload()
          }, 2000)
        } else {
          this.checking = false
        }
      })
      .catch(() => {
        this.checking = false
      })
  }

  handleSync() {
    this.modal.info({
      nzTitle: $t('_syncDataOut'),
      nzOkText: $t('_confirmSync'),
      nzContent: $t('_confirmSyncTip'),
      nzOnOk: async () => {
        await updateFileContent({
          message: 'update db',
          content: JSON.stringify(
            cleanWebAttrs(JSON.parse(JSON.stringify(navs())))
          ),
          path: DB_PATH
        })
        this.message.success($t('_syncSuccessTip'))
      }
    })
  }

  toggleLocale() {
    this.handleOpen()
    const l = this.language === 'en' ? 'zh-CN' : 'en'
    localStorage.setItem(STORAGE_KEY_MAP.LANGUAGE, l)
    location.reload()
  }
}
