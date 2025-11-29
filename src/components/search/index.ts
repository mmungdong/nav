// 开源项目，未经作者同意，不得以抄袭/复制代码/修改源代码版权信息。

export { SearchComponent } from './index.component'
export { ImprovedSearchComponent } from './improved-search.component'
export { ModernSearchComponent } from './modern-search.component'
export { ElegantSearchComponent } from './elegant-search.component'

export enum SearchType {
  All = 1,
  Title,
  Desc,
  Url,
  Current,
  Quick,
  Id,
  Tag,
  Class,
}
