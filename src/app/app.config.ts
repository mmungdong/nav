import { registerLocaleData } from '@angular/common'
import zh from '@angular/common/locales/zh'
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter, withHashLocation } from '@angular/router'
import { provideServiceWorker } from '@angular/service-worker'
import { IconDefinition } from '@ant-design/icons-angular'
import {
  CheckOutline,
  CopyOutline,
  ShareAltOutline,
  EllipsisOutline,
  LoadingOutline,
  UploadOutline,
  MinusOutline,
  PlusOutline,
  StopOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  DoubleRightOutline,
  DoubleLeftOutline
} from '@ant-design/icons-angular/icons'
import { NZ_I18N } from 'ng-zorro-antd/i18n'
import { zh_CN } from 'ng-zorro-antd/i18n'
import { provideNzIcons } from 'ng-zorro-antd/icon'
import { isMobile } from 'src/utils'
import { unregisterServiceWorkers } from 'src/utils/sw'

import config from '../../nav.config.json'

import { routes } from './app.routes'

registerLocaleData(zh)

const icons: IconDefinition[] = [
  CheckOutline,
  CopyOutline,
  ShareAltOutline,
  EllipsisOutline,
  LoadingOutline,
  UploadOutline,
  MinusOutline,
  PlusOutline,
  StopOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  DoubleRightOutline,
  DoubleLeftOutline
]

const isPhone = isMobile()
const isHashMode = window.__HASH_MODE__ ?? config.hashMode
const pwaEnable =
  window.__PWA_ENABLE__ && location.protocol === 'https:' ? isPhone : false

if (!pwaEnable && isPhone) {
  unregisterServiceWorkers()
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideNzIcons(icons),
    provideZoneChangeDetection({ eventCoalescing: true }),
    isHashMode
      ? provideRouter(routes, withHashLocation())
      : provideRouter(routes),
    provideAnimations(),
    { provide: NZ_I18N, useValue: zh_CN },
    provideServiceWorker('ngsw-worker.js', {
      enabled: pwaEnable,
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
}
