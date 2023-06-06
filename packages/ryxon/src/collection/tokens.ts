import type { Ref } from 'vue'

export type CollectionItem<T = Record<string, any>> = {
  ref: HTMLElement | null
} & T

export type RCollectionInjectionContext = {
  itemMap: Map<HTMLElement, CollectionItem>
  getItems: () => void
  collectionRef: Ref<HTMLElement | null>
}

export type RCollectionItemInjectionContext = {
  collectionItemRef: Ref<HTMLElement | null>
}
