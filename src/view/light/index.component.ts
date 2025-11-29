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
import { CardComponent } from 'src/components/card/index.component'
import { ClassTabsComponent } from 'src/components/class-tabs/index.component'
import { ComponentGroupComponent } from 'src/components/component-group/index.component'
import { FixbarComponent } from 'src/components/fixbar/index.component'
import { FooterComponent } from 'src/components/footer/footer.component'
import { NoDataComponent } from 'src/components/no-data/no-data.component'
import { ElegantSearchComponent } from 'src/components/search'
import { SideImagesComponent } from 'src/components/side-images/index.component'
import { ToolbarTitleWebComponent } from 'src/components/toolbar-title/index.component'
import { WebMoreMenuComponent } from 'src/components/web-more-menu/index.component'
import { CommonService } from 'src/services/common'
import type { INavProps } from 'src/types'
import { randomBgImg, removeBgImg, scrollIntoViewLeft } from 'src/utils'

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
    SideImagesComponent,
    ClassTabsComponent
  ],
  selector: 'app-light',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export default class LightComponent {
  @ViewChild('parent') parentElement!: ElementRef
  @ViewChild(ComponentGroupComponent) componentChild!: ComponentGroupComponent
  @ViewChildren('item') items!: QueryList<ElementRef>

  componentMaxWidth = ''

  constructor(public commonService: CommonService) {}

  get isEllipsis() {
    return this.commonService.settings().lightOverType === 'ellipsis'
  }

  ngOnInit() {
    randomBgImg()
  }

  ngOnDestroy() {
    this.commonService.setOverIndex()
    removeBgImg()
  }

  ngAfterViewInit() {
    if (this.isEllipsis) {
      this.commonService.getOverIndex('.top-nav .over-item')
    } else {
      scrollIntoViewLeft(
        this.parentElement.nativeElement,
        this.items.toArray()[this.commonService.oneIndex].nativeElement,
        {
          behavior: 'auto'
        }
      )
    }

    if (this.componentChild) {
      setTimeout(() => {
        this.componentMaxWidth =
          Math.max(...this.componentChild.getWidths()) + 'px'
      })
    }
  }

  handleClickTop(e: any, data: INavProps) {
    this.commonService.handleClickClass(data.id)
    if (!this.isEllipsis) {
      scrollIntoViewLeft(this.parentElement.nativeElement, e.target)
    }
  }
}
