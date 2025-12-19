import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseUiService {
  private readonly _tempSelectedMapS = signal<Map<string, any>>(new Map());

  // ✅ 對外只讀（binding 用）
  readonly tempSelectedMapS = this._tempSelectedMapS.asReadonly();


  // ✅ 常用衍生狀態（UI 很常用）
  readonly tempSelectedListS = computed(() => [...this._tempSelectedMapS().values()]);
  readonly tempSelectedIdsS = computed(() => [...this._tempSelectedMapS().keys()]);
  readonly tempSelectedCountS = computed(() => this._tempSelectedMapS().size);

  constructor() { }
  set(any: any): void {
    this._tempSelectedMapS.update(prev => {
      const next = new Map(prev);
      next.set(any.id, any);
      return next;
    });
  }

  /** 移除 */
  remove(anyId: string): void {
    this._tempSelectedMapS.update(prev => {
      if (!prev.has(anyId)) return prev; // 沒變就不動
      const next = new Map(prev);
      next.delete(anyId);
      return next;
    });
  }

  /** 清空 */
  clear(): void {
    this._tempSelectedMapS.set(new Map());
  }

  /** 是否已選 */
  has(anyId: string): boolean {
    return this._tempSelectedMapS().has(anyId);
  }

  /** 取得單筆（可能 undefined） */
  get(anyId: string): any | undefined {
    return this._tempSelectedMapS().get(anyId);
  }

  /** toggle（常用於 checkbox） */
  toggle(any: any, checked?: boolean): void {
    const shouldSelect = checked ?? !this.has(any.id);
    if (shouldSelect) this.set(any);
    else this.remove(any.id);
  }

  /** 批次加入（可選） */
  setMany(anys: any[]): void {
    this._tempSelectedMapS.update(prev => {
      const next = new Map(prev);
      for (const c of anys) next.set(c.id, c);
      return next;
    });
  }

}
