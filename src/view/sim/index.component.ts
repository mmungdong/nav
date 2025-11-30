// 开源项目，未经作者同意，不得以抄袭/复制代码/修改源代码版权信息。
// Copyright @ 2018-present xiejiahe. All rights reserved.
// See https://github.com/xjh22222228/nav

import { CommonModule } from '@angular/common'
import {
  Component,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList
} from '@angular/core'
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { BackgroundSettingComponent } from 'src/components/background-setting/background-setting.component'
import { CardComponent } from 'src/components/card/index.component'
import { ClassTabsComponent } from 'src/components/class-tabs/index.component'
import { ComponentGroupComponent } from 'src/components/component-group/index.component'
import { FixbarComponent } from 'src/components/fixbar/index.component'
import { FooterComponent } from 'src/components/footer/footer.component'
import { NoDataComponent } from 'src/components/no-data/no-data.component'
import { PhoneClassComponent } from 'src/components/phone-class/index.component'
import { ElegantSearchComponent } from 'src/components/search'
import { ToolbarTitleWebComponent } from 'src/components/toolbar-title/index.component'
import { WebMoreMenuComponent } from 'src/components/web-more-menu/index.component'
import { SafeHtmlPipe } from 'src/pipe/safeHtml.pipe'
import { CommonService } from 'src/services/common'
import { settings } from 'src/store'
import type { INavProps } from 'src/types'
import { scrollIntoViewLeft } from 'src/utils'
import { compilerTemplate } from 'src/utils/utils'

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ToolbarTitleWebComponent,
    ComponentGroupComponent,
    WebMoreMenuComponent,
    ElegantSearchComponent,
    NzSpinModule,
    NzToolTipModule,
    CardComponent,
    NoDataComponent,
    FooterComponent,
    FixbarComponent,
    BackgroundSettingComponent,
    SafeHtmlPipe,
    ClassTabsComponent,
    PhoneClassComponent
  ],
  selector: 'app-sim',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export default class SimComponent {
  @ViewChild('parent') parentRef!: ElementRef
  @ViewChildren('item') itemsRef!: QueryList<ElementRef>

  readonly description: string = compilerTemplate(settings().simThemeDesc)
  backgroundImage: string = ''
  isEditMode: boolean = false

  constructor(public commonService: CommonService) {
    // 初始化背景图片（如果有设置的话）
    if (settings().simThemeImages && settings().simThemeImages.length > 0) {
      this.backgroundImage = settings().simThemeImages[0].src || ''
    }
  }

  ngOnDestroy() {
    this.commonService.setOverIndex()
  }

  get isEllipsis() {
    return this.commonService.settings().simOverType === 'ellipsis'
  }

  ngAfterViewInit() {
    if (this.isEllipsis) {
      this.commonService.getOverIndex('.top-nav .over-item')
    } else {
      scrollIntoViewLeft(
        this.parentRef.nativeElement,
        this.itemsRef.toArray()[this.commonService.oneIndex].nativeElement,
        {
          behavior: 'auto'
        }
      )
    }
  }

  handleClickTop(e: any, data: INavProps) {
    this.commonService.handleClickClass(data.id)
    if (!this.isEllipsis) {
      scrollIntoViewLeft(this.parentRef.nativeElement, e.target)
    }
  }

  onBackgroundChange(backgroundImage: string): void {
    this.backgroundImage = backgroundImage
    // 这里可以添加保存背景图片的逻辑
    console.log('Background image changed:', backgroundImage)
  }
}
