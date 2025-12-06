// 开源项目，未经作者同意，不得以抄袭/复制代码/修改源代码版权信息。
// Copyright @ 2018-present xiejiahe. All rights reserved.
// See https://github.com/xjh22222228/nav

import { CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NzModalService } from 'ng-zorro-antd/modal'
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm'
import { NzSwitchModule } from 'ng-zorro-antd/switch'
import { NzTableModule } from 'ng-zorro-antd/table'
import { updateFileContent } from 'src/api'
import { TAG_PATH } from 'src/constants'
import { $t } from 'src/locale'
import { tagList } from 'src/store'
import type { ITagPropValues } from 'src/types'

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NzButtonModule,
    NzInputModule,
    NzTableModule,
    NzPopconfirmModule,
    NzSwitchModule,
    CdkDrag
  ],
  providers: [NzModalService, NzMessageService],
  selector: 'system-tag',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export default class SystemTagComponent {
  readonly $t = $t
  tagList: ITagPropValues[] = tagList().map(tag => ({ ...tag, ['checked']: false }))
  submitting: boolean = false
  incrementId = Math.max(...tagList().map((item) => Number(item.id))) + 1
  allChecked = false
  selectedTagIds = new Set<number>()

  constructor(
    private message: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit() {}

  // 上移
  moveUp(index: number): void {
    if (index === 0) {
      return
    }
    const current = this.tagList[index]
    const prev = this.tagList[index - 1]
    this.tagList[index - 1] = current
    this.tagList[index] = prev
  }

  // 下移
  moveDown(index: number): void {
    if (index === this.tagList.length - 1) {
      return
    }
    const current = this.tagList[index]
    const next = this.tagList[index + 1]
    this.tagList[index + 1] = current
    this.tagList[index] = next
  }

  onColorChange(e: any, idx: number) {
    const color = e.target.value
    this.tagList[idx].color = color
  }

  handleAdd() {
    const isEmpty = this.tagList.some((item) => !item.name.trim())
    if (isEmpty) {
      return
    }
    this.incrementId += 1
    this.tagList.unshift({
      id: this.incrementId,
      name: '',
      color: '#f50000',
      desc: '',
      isInner: false,
      ['checked']: false
    })
  }

  handleDelete(idx: number) {
    this.tagList.splice(idx, 1)
  }

  handleSubmit() {
    if (this.submitting) {
      return
    }

    // 去重
    const o: Record<string, any> = {}
    this.tagList.forEach((item: ITagPropValues) => {
      if (item.name?.trim?.()) {
        o[item.name] = {
          ...item,
          name: undefined
        }
      }
    })

    if (Object.keys(o).length !== this.tagList.length) {
      this.message.error($t('_repeatAdd'))
      return
    }
    const tagList = [...this.tagList].map((item) => {
      // 移除checked属性，因为它不应该被保存
      const { ['checked']: checkedValue, ...cleanItem } = item

      cleanItem.sort ||= ''
      if (typeof cleanItem.sort === 'string') {
        cleanItem.sort = cleanItem.sort.trim()
      }
      if (cleanItem.sort === '') {
        delete cleanItem.sort
      }
      if (Number.isNaN(Number(cleanItem.sort))) {
        delete cleanItem.sort
      }
      if (cleanItem.sort != null) {
        cleanItem.sort = Number(cleanItem.sort)
      }
      return cleanItem
    })
    this.modal.info({
      nzTitle: $t('_syncDataOut'),
      nzOkText: $t('_confirmSync'),
      nzContent: $t('_confirmSyncTip'),
      nzOnOk: () => {
        this.submitting = true
        updateFileContent({
          message: 'update tag',
          content: JSON.stringify(tagList),
          path: TAG_PATH
        })
          .then(() => {
            this.message.success($t('_syncSuccessTip'))
          })
          .finally(() => {
            this.submitting = false
          })
      }
    })
  }

  onAllChecked(checked: boolean) {
    this.tagList = this.tagList.map(tag => ({
      ...tag,
      ['checked']: checked
    }))
    this.selectedTagIds.clear()
    if (checked) {
      this.tagList.forEach(tag => this.selectedTagIds.add(tag.id))
    }
    this.allChecked = checked
  }

  onItemChecked(tag: ITagPropValues, checked: boolean) {
    tag['checked'] = checked
    if (checked) {
      this.selectedTagIds.add(tag.id)
    } else {
      this.selectedTagIds.delete(tag.id)
    }
    // 更新全选状态
    this.allChecked = this.tagList.every(t => t['checked'])
  }

  onBatchDelete() {
    if (this.selectedTagIds.size <= 0) {
      return
    }

    this.modal.confirm({
      nzTitle: $t('_confirmDel'),
      nzContent: `确定要删除选中的 ${this.selectedTagIds.size} 个标签吗？`,
      nzOnOk: () => {
        this.tagList = this.tagList.filter(tag => !this.selectedTagIds.has(tag.id))
        this.selectedTagIds.clear()
        this.allChecked = false
        this.message.success($t('_delSuccess'))
      }
    })
  }

  onDragDrop(event: any) {
    const dragEvent: CdkDragDrop<ITagPropValues[], ITagPropValues[]> = event;
    moveItemInArray(this.tagList, dragEvent.previousIndex, dragEvent.currentIndex)
  }

  trackByItem(i: number, item: any) {
    return item.id
  }
}
