// 开源项目，未经作者同意，不得以抄袭/复制代码/修改源代码版权信息。
// Copyright @ 2018-present xiejiahe. All rights reserved.
// See https://github.com/xjh22222228/nav

import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { CardComponent } from 'src/components/card/index.component'
import { FooterComponent } from 'src/components/footer/footer.component'
import { ElegantSearchComponent } from 'src/components/search'
import { ToolbarTitleWebComponent } from 'src/components/toolbar-title/index.component'
import { CommonService } from 'src/services/common'

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ElegantSearchComponent,
    CardComponent,
    FooterComponent,
    ToolbarTitleWebComponent
  ],
  selector: 'app-mobile',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export default class MobileComponent {
  open: boolean = false

  constructor(public commonService: CommonService) {}

  handleCilckNav(id: number) {
    this.commonService.handleClickClass(id)
    this.handleToggleOpen()
  }

  handleToggleOpen() {
    this.open = !this.open
  }
}
