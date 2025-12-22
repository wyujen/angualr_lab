import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntitySortableUiService {

  private _entitysSortWS = signal<any[]>([])
  entitysSortS = this._entitysSortWS.asReadonly()
  entitysIdSet = computed(() => new Set(this.entitysSortS().map(entity => entity.id)))
  entityCountS = computed(() => this.entitysSortS().length)

  constructor() { }

  updateSort(
    oldIndex: number,
    newIndex: number
  ) {
    if (typeof oldIndex !== 'number' || typeof newIndex !== 'number') return;
    if (oldIndex === newIndex) return;
    const next = [...this.entitysSortS()];
    const [moved] = next.splice(oldIndex, 1);
    next.splice(newIndex, 0, moved);
    this.setAll(next)
  }

  add(data: any) {
    console.log('data', data)
    const id = data?.id
    if (!id || this.entitysIdSet().has(id)) return
    this._entitysSortWS.update(prev => [...prev, data])
  }

  reload(dataList: any[], key?: string) {
    this.clear();
    const list = Array.isArray(dataList) ? [...dataList] : [];

    if (!key) {
      this.setAll(list);
      return;
    }
    const sorted = this._sortByIndexKey(list, key);
    const reIndexed = this._reindexByKey(sorted, key);
    this.setAll(reIndexed);
  }
  remove(id: string) {
    if (!id || !(this.entitysIdSet().has(id))) {
      console.warn(`remove error id:${id}, idSet:${this.entitysIdSet()}`)
    } else {
      const next = this.entitysSortS().filter(entity => entity.id !== id)
      this.setAll(next)
    }
  }
  clear() {
    this.setAll([])
  }



  private setAll(dataList: any[]) {
    this._entitysSortWS.set(dataList)
  }
  /** 依指定 key(當作 index) 排序；沒有/無效 index 的放最後；同分保持原順序(stable) */
  private _sortByIndexKey(list: any[], key: string): any[] {
    return list
      .map((item, originalPos) => ({ item, originalPos }))
      .sort((a, b) => {
        const ai = this._toValidIndexOrInfinity(a.item?.[key]);
        const bi = this._toValidIndexOrInfinity(b.item?.[key]);
        if (ai !== bi) return ai - bi;
        return a.originalPos - b.originalPos;
      })
      .map(x => x.item);
  }

  /** 把 key 指向的 index 重新編號成連續 0..n-1 */
  private _reindexByKey(list: any[], key: string): any[] {
    return list.map((item, idx) => ({
      ...item,
      [key]: idx
    }));
  }

  /** 將 value 轉成「有效 index」；無效回 Infinity */
  private _toValidIndexOrInfinity(value: any): number {
    const n = typeof value === 'number' ? value : Number(value);
    if (Number.isFinite(n) && n >= 0) return n;
    return Number.POSITIVE_INFINITY;
  }

}
