// 开源项目，未经作者同意，不得以抄袭/复制代码/修改源代码版权信息。
// Copyright @ 2018-present xiejiahe. All rights reserved.
// See https://github.com/xjh22222228/nav

import { CommonModule } from '@angular/common'
import { Component, computed } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { $t } from 'src/locale'
import { getClassById } from 'src/utils'
import event from 'src/utils/mitt'
import { getTempId, isSelfDevelop } from 'src/utils/utils'
import { setNavs } from 'src/utils/web'
import { deleteWebByIds, deleteClassByIds } from 'src/utils/web'

import { navs } from '../../store'
import { INavTwoProp, INavThreeProp, IWebProps } from '../../types'

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCheckboxModule,
    NzModalModule,
    NzSelectModule
  ],
  selector: 'app-move-web',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class MoveWebComponent {
  readonly $t = $t
  readonly navs = navs
  twoOptions: INavTwoProp[] = []
  threeOptions: INavThreeProp[] = []
  isCopy = false
  isSame = false
  oneSelect: number = -1
  twoSelect: number = -1
  threeSelect: number = -1
  moveItems: any[] = []
  showModal = false
  level = 4
  id = -1

  // 获取扁平化的三级分类数据
  flattenedThirdLevelData = computed(() => {
    const result: INavThreeProp[] = []
    const navsData = this.navs()

    for (const firstLevel of navsData) {
      if (firstLevel.nav) {
        for (const secondLevel of firstLevel.nav) {
          if (secondLevel.nav) {
            result.push(...secondLevel.nav)
          }
        }
      }
    }

    return result
  })

  constructor(private message: NzMessageService) {
    event.on('MOVE_WEB', (props: any) => {
      this.open(this, props)
    })
  }

  ngOnInit() {}

  open(
    ctx: this,
    props: {
      id?: number
      level?: number
      data: IWebProps[]
    }
  ) {
    ctx.oneSelect = -1
    ctx.twoSelect = -1
    ctx.threeSelect = -1
    ctx.twoOptions = []
    ctx.threeOptions = []
    ctx.moveItems = props.data
    ctx.level = props.level ?? 4
    ctx.showModal = true
    ctx.id = props.id ?? -1
  }

  hanldeOneSelect(id: number) {
    this.oneSelect = id
    const data = this.navs().find((item) => item.id === id)
    this.twoOptions = data?.nav || []
    this.twoSelect = -1
    this.threeSelect = -1
  }

  hanldeTwoSelect(id: number) {
    this.twoSelect = id
    const data = this.twoOptions.find((item) => item.id === id)
    this.threeOptions = data?.nav || []
    this.threeSelect = -1
  }

  hanldeThreeSelect(id: number) {
    this.threeSelect = id
  }

  handleCancel() {
    this.isCopy = false
    this.isSame = false
    this.showModal = false
  }

  async hanldeOk(): Promise<any> {
    let tempId = getTempId()
    try {
      const moveItems: INavTwoProp[] & IWebProps[] & INavThreeProp[] =
        JSON.parse(JSON.stringify(this.moveItems))

      // 对于所有级别的移动操作，现在都只需要选择三级分类
      if (this.threeSelect == -1) {
        return this.message.error($t('_sel3'))
      }

      const { oneIndex, twoIndex, threeIndex } = getClassById(
        this.threeSelect
      )

      if (this.level === 2) {
        // 移动二级分类到指定的三级分类下（实际上是将其下的网站移动到目标三级分类）
        for (const item of moveItems) {
          const id = item.id
          const has = this.navs()[oneIndex].nav[twoIndex].nav[
            threeIndex
          ].nav.some((item) => item.id === id)
          if (has) {
            this.message.error($t('_sameExists'))
            return
          }

          if (this.isCopy) {
            tempId -= 1
            if (this.isSame) {
              item.rId = tempId
            } else {
              item.id = tempId
              delete item.rId
            }
          } else {
            await deleteClassByIds([item.rId || id], !!item.rId)
          }
          this.navs.update((prev) => {
            prev[oneIndex].nav[twoIndex].nav[threeIndex].nav.unshift(item)
            return prev
          })
          this.message.success(`"${item.title}" ${$t('_moveSuccess')}`)
        }
      } else if (this.level === 3) {
        // 移动三级分类到指定的三级分类下（实际上是将其下的网站移动到目标三级分类）
        for (const item of moveItems) {
          const id = item.id
          const has = this.navs()[oneIndex].nav[twoIndex].nav[
            threeIndex
          ].nav.some((item) => item.id === id)
          if (has) {
            this.message.error($t('_sameExists'))
            return
          }

          if (this.isCopy) {
            tempId -= 1
            if (this.isSame) {
              item.rId = tempId
            } else {
              item.id = tempId
              delete item.rId
            }
          } else {
            await deleteClassByIds([item.rId || id], !!item.rId)
          }
          this.navs.update((prev) => {
            prev[oneIndex].nav[twoIndex].nav[threeIndex].nav.unshift(item)
            return prev
          })
          this.message.success(`"${item.title}" ${$t('_moveSuccess')}`)
        }
      } else if (this.level === 4) {
        // 移动网站到指定的三级分类下
        for (const item of moveItems) {
          const id = item.id
          const has = this.navs()[oneIndex].nav[twoIndex].nav[
            threeIndex
          ].nav.some((item) => item.id === id)
          if (has) {
            this.message.error($t('_sameExists'))
            return
          }

          if (this.isCopy) {
            tempId -= 1
            if (this.isSame) {
              item.rId = tempId
            } else {
              item.id = tempId
              delete item.rId
            }
          } else {
            await deleteWebByIds([item.rId || id], !!item.rId)
          }
          this.navs.update((prev) => {
            prev[oneIndex].nav[twoIndex].nav[threeIndex].nav.unshift(item)
            return prev
          })
          this.message.success(`"${item.name}" ${$t('_moveSuccess')}`)
        }
      }

      setNavs(this.navs())
      this.handleCancel()
      if (!isSelfDevelop) {
        event.emit('WEB_REFRESH')
      }
    } catch (error: any) {
      this.message.error(error.message)
    }
  }
}
