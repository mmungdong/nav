// 开源项目，未经作者同意，不得以抄袭/复制代码/修改源代码版权信息。
// Copyright @ 2018-present xiejiahe. All rights reserved.
// See https://github.com/xjh22222228/nav

import { CommonModule } from '@angular/common'
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core'

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-background-setting',
  templateUrl: './background-setting.component.html',
  styleUrls: ['./background-setting.component.scss']
})
export class BackgroundSettingComponent {
  @Input() backgroundImage: string = ''
  @Input() height: number = 300
  @Input() editable: boolean = false
  @Output() backgroundChange = new EventEmitter<string>()

  @ViewChild('fileInput') fileInput!: ElementRef

  showControls: boolean = false
  showUploadOverlay: boolean = false

  getHeightClass(): string {
    if (this.height <= 200) {
      return 'short'
    } else if (this.height >= 400) {
      return 'tall'
    }
    return ''
  }

  triggerFileInput(): void {
    if (this.editable && this.fileInput) {
      this.fileInput.nativeElement.click()
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        this.backgroundImage = e.target.result
        this.backgroundChange.emit(this.backgroundImage)
      }
      reader.readAsDataURL(file)
    }
  }

  removeBackground(): void {
    this.backgroundImage = ''
    this.backgroundChange.emit(this.backgroundImage)
  }
}
