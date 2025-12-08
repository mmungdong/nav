// 开源项目，未经作者同意，不得以抄袭/复制代码/修改源代码版权信息。
// Copyright @ 2018-present xiejiahe. All rights reserved.
// See https://github.com/xjh22222228/nav

import { CommonModule } from '@angular/common'
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NzModalModule } from 'ng-zorro-antd/modal'
import {
  verifyToken,
  createBranch,
  authorName,
  isStandaloneImage
} from 'src/api'
import { $t } from 'src/locale'
import {
  setToken,
  removeToken,
  removeWebsite,
  setImageToken
} from 'src/utils/user'
import { isSelfDevelop } from 'src/utils/utils'

import config from '../../../nav.config.json'

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, NzModalModule, NzInputModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Input() visible = false
  @Output() onCancel = new EventEmitter<void>()
  @ViewChild('input', { static: false }) input!: ElementRef

  readonly $t = $t
  readonly isSelfDevelop = isSelfDevelop
  token = ''
  imageToken = ''
  submitting = false
  showImgToken = false

  // 表单验证状态
  tokenValidation = {
    isValid: false,
    message: '',
    isDirty: false
  }

  imageTokenValidation = {
    isValid: false,
    message: '',
    isDirty: false
  }

  constructor(
    private readonly message: NzMessageService,
    private router: Router
  ) {
    if (!isSelfDevelop) {
      this.showImgToken = isStandaloneImage()
    }
  }

  ngAfterViewInit(): void {
    this.inputFocus()
  }

  handleCancel(): void {
    this.onCancel.emit()
    this.router.navigate(['/'])
  }

  private inputFocus(): void {
    setTimeout(() => {
      this.input?.nativeElement?.focus()
    }, 500)
  }

  // 验证Token输入
  validateToken(): void {
    this.tokenValidation.isDirty = true;
    const token = this.token.trim();

    if (!token) {
      this.tokenValidation.isValid = false;
      this.tokenValidation.message = this.$t('_pleaseInputToken');
      return;
    }

    if (token.length < 10) {
      this.tokenValidation.isValid = false;
      this.tokenValidation.message = this.$t('_tokenTooShort');
      return;
    }

    this.tokenValidation.isValid = true;
    this.tokenValidation.message = '';
  }

  // 验证图片Token输入
  validateImageToken(): void {
    this.imageTokenValidation.isDirty = true;
    const token = this.imageToken.trim();

    if (!token) {
      this.imageTokenValidation.isValid = false;
      this.imageTokenValidation.message = 'Please enter the image TOKEN';
      return;
    }

    if (token.length < 10) {
      this.imageTokenValidation.isValid = false;
      this.imageTokenValidation.message = 'Image token is too short';
      return;
    }

    this.imageTokenValidation.isValid = true;
    this.imageTokenValidation.message = '';
  }

  onKey(event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      this.login()
    }
  }

  onTokenChange(): void {
    this.validateToken();
  }

  onImageTokenChange(): void {
    this.validateImageToken();
  }

  async login(): Promise<void> {
    // 验证表单
    this.validateToken();
    if (this.showImgToken) {
      this.validateImageToken();
    }

    // 检查验证结果
    if (!this.tokenValidation.isValid) {
      this.message.error(this.tokenValidation.message || $t('_pleaseInputToken'));
      return;
    }

    if (this.showImgToken && !this.imageTokenValidation.isValid) {
      this.message.error(this.imageTokenValidation.message || 'Please enter the image TOKEN');
      return;
    }

    const token = this.token.trim();

    if (this.showImgToken) {
      const imageToken = this.imageToken.trim();
      try {
        this.submitting = true;
        const authorName = config.imageRepoUrl.split('/').at(-2);
        const res = await verifyToken(imageToken, config.imageRepoUrl);
        if ((res?.data?.login ?? res?.data?.username) !== authorName) {
          this.message.error('Image Bad credentials');
          return;
        }
        setImageToken(imageToken);
      } catch {
        this.message.error('Failed to verify image token');
        return;
      } finally {
        this.submitting = false;
      }
    }

    this.submitting = true;

    try {
      const res = await verifyToken(token);
      if (
        !isSelfDevelop &&
        (res?.data?.login ?? res?.data?.username) !== authorName
      ) {
        this.message.error('Bad credentials');
        throw new Error('Bad credentials');
      }
      setToken(token);

      try {
        createBranch('image').finally(() => {
          this.message.success($t('_tokenVerSuc'));
          removeWebsite().finally(() => {
            window.location.reload();
          });
        });
      } catch {
        removeToken();
        this.submitting = false;
      }
    } catch {
      this.message.error('Failed to verify token');
      this.submitting = false;
    }
  }
}
