// 开源项目，未经作者同意，不得以抄袭/复制代码/修改源代码版权信息。
// Copyright @ 2018-present xiejiahe. All rights reserved.
// See https://github.com/xjh22222228/nav

import { CommonModule } from '@angular/common'
import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzSwitchModule } from 'ng-zorro-antd/switch'
import { LogoComponent } from 'src/components/logo/logo.component'
import { UploadImageComponent } from 'src/components/upload-image/index.component'
import { $t } from 'src/locale'
import { navs } from 'src/store'
import { getClassById } from 'src/utils/index'
import event from 'src/utils/mitt'
import { getTempId, isSelfDevelop } from 'src/utils/utils'
import { setNavs, updateByClass, pushDataByAny } from 'src/utils/web'

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSwitchModule,
    LogoComponent,
    UploadImageComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  selector: 'edit-class',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class EditClassComponent {
  @Output() onOk = new EventEmitter()
  @ViewChild('input', { static: false }) input!: ElementRef

  readonly $t = $t
  validateForm!: FormGroup
  showModal = false
  isEdit = false
  submitting = false

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      icon: [''],
      ownVisible: [false],
      id: [-1]
    })
    const handleOpen = (props: any = {}) => {
      this.isEdit = !!props['title']
      this.validateForm.get('title')!.setValue(props['title'] || '')
      this.validateForm.get('icon')!.setValue(props['icon'] || '')
      this.validateForm.get('id')!.setValue(props['id'] || getTempId())
      this.validateForm.get('ownVisible')!.setValue(!!props['ownVisible'])
      this.showModal = true
      this.focusUrl()
    }
    event.on('EDIT_CLASS_OPEN', handleOpen)
  }

  get iconUrl(): string {
    return this.validateForm.get('icon')?.value || ''
  }

  focusUrl() {
    setTimeout(() => {
      this.input?.nativeElement?.focus()
    }, 400)
  }

  onChangeFile(data: any) {
    this.validateForm.get('icon')!.setValue(data.cdn)
  }

  onCancel() {
    this.validateForm.reset()
    this.showModal = false
  }

  handleOk() {
    let { title, icon, ownVisible, id } = this.validateForm.value
    title = title.trim()
    if (!title) {
      this.message.error('Cannot be empty')
      return
    }
    const params: Record<string, any> = {
      id,
      title,
      icon,
      ownVisible
    }

    try {
      this.submitting = true
      if (this.isEdit) {
        const ok = updateByClass(id, params)
        ok && this.message.success($t('_modifySuccess'))
      } else {
        // 创建三级分类
        params['id'] = getTempId()
        params['nav'] = []

        // 默认添加到第一个二级分类下，如果没有则创建一个
        const navsData = navs()
        if (navsData.length > 0 && navsData[0].nav.length > 0) {
          // 添加到第一个二级分类下
          const parentId = navsData[0].nav[0].id
          const ok = pushDataByAny(parentId, params)
          ok && this.message.success($t('_addSuccess'))
        } else if (navsData.length > 0) {
          // 如果没有二级分类，则添加到第一个一级分类下
          const parentId = navsData[0].id
          const ok = pushDataByAny(parentId, params)
          ok && this.message.success($t('_addSuccess'))
        } else {
          // 如果没有任何分类，则创建一个新的一级分类结构
          navs.update((prev) => {
            const newFirstLevel = {
              id: getTempId(),
              title: '默认分类',
              icon: '',
              nav: [{
                id: getTempId(),
                title: '默认二级分类',
                icon: '',
                nav: [params as any]
              }]
            }
            prev.push(newFirstLevel)
            setNavs(prev)
            return prev
          })
          this.message.success($t('_addSuccess'))
        }
      }

      // 刷新列表
      event.emit('WEB_REFRESH')
    } catch (error: any) {
      this.message.error(error.message)
    } finally {
      this.submitting = false
    }

    this.onOk.emit(params)
    this.onCancel()
    if (!isSelfDevelop) {
      event.emit('WEB_REFRESH')
    }
  }
}
