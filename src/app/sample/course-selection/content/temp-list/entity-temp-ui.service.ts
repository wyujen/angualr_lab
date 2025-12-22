import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntityTempUiService {

  private _entitysTempWS = signal<any[]>([])
  entitysTempS = this._entitysTempWS.asReadonly()
  entitysIdSet = computed(() => new Set(this.entitysTempS().map(entity => entity.id)))
  entityCountS = computed(() => this.entitysTempS().length)

  constructor() { }

  add(data: any) {
    console.log('data', data)
    const id = data?.id
    if (!id || this.entitysIdSet().has(id)) return
    this._entitysTempWS.update(prev => [...prev, data])
  }

  remove(id: string) {
    if (!id || !(this.entitysIdSet().has(id))) {
      console.warn(`remove error id:${id}, idSet:${this.entitysIdSet()}`)
    } else {
      const next = this.entitysTempS().filter(entity => entity.id !== id)
      this.setAll(next)
    }
  }
  clear() {
    this.setAll([])
  }

  private setAll(dataList: any[]) {
    this._entitysTempWS.set(dataList)
  }

}
