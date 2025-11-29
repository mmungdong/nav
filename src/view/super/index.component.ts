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
import { ComponentGroupComponent } from 'src/components/component-group/index.component'
import { FixbarComponent } from 'src/components/fixbar/index.component'
import { FooterComponent } from 'src/components/footer/footer.component'
import { NoDataComponent } from 'src/components/no-data/no-data.component'
import { PhoneClassComponent } from 'src/components/phone-class/index.component'
import { ElegantSearchComponent } from 'src/components/search'
import { SideImagesComponent } from 'src/components/side-images/index.component'
import { WebMoreMenuComponent } from 'src/components/web-more-menu/index.component'
import { $t } from 'src/locale'
import { CommonService } from 'src/services/common'
import type { INavThreeProp, INavProps, INavTwoProp } from 'src/types'
import { queryString, scrollIntoViewLeft } from 'src/utils'
import event from 'src/utils/mitt'

@Component({
  standalone: true,
  imports: [
    CommonModule,
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
    PhoneClassComponent
  ],
  selector: 'app-side',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export default class SideComponent {
  @ViewChild('parentThree') parentThreeElement!: ElementRef
  @ViewChild('parent') parentElement!: ElementRef
  @ViewChildren('item') items!: QueryList<ElementRef>
  @ViewChildren('itemThree') itemsThree!: QueryList<ElementRef>

  readonly $t = $t

  constructor(public commonService: CommonService) {}

  get isEllipsis() {
    return this.commonService.settings().superOverType === 'ellipsis'
  }

  ngAfterViewInit() {
    if (this.isEllipsis) {
      this.commonService.getOverIndex('.topnav .over-item')
    } else {
      scrollIntoViewLeft(
        this.parentElement.nativeElement,
        this.items.toArray()[this.commonService.oneIndex].nativeElement,
        {
          behavior: 'auto'
        }
      )
    }

    scrollIntoViewLeft(
      this.parentThreeElement.nativeElement,
      this.itemsThree.toArray()[this.commonService.selectedThreeIndex]
        .nativeElement,
      { behavior: 'auto' }
    )
  }

  ngOnDestroy() {
    this.commonService.setOverIndex()
  }

  openCreateWebModal() {
    const { id } = queryString()
    event.emit('CREATE_WEB', {
      parentId: Number.parseInt(id as string)
    })
  }

  handleClickTop(e: any, data: INavProps) {
    if (!this.isEllipsis) {
      scrollIntoViewLeft(this.parentElement.nativeElement, e.target)
    }
    queueMicrotask(() => {
      this.commonService.handleClickClass(data.id)
    })
  }

  handleClickThree(e: any, data: INavThreeProp) {
    this.commonService.handleClickClass(data.id)
    scrollIntoViewLeft(this.parentThreeElement.nativeElement, e.target)
  }
}
