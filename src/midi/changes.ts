import _ from "lodash"
import { diff } from "jsondiffpatch"
import { notEmpty } from "../helpers/types"

export interface AddedChange<T> {
  type: "added"
  index: any
  value: T
}

export interface DeletedChange<T> {
  type: "deleted"
  index: any
  value: T
}

export interface MovedChange<T> {
  type: "moved"
  fromIndex: any
  toIndex: any
  value: T
}

export interface ModifiedChange<T> {
  type: "modified"
  index: any
  oldValue: T
  newValue: T
}

export type Change<T> =
  | AddedChange<T>
  | DeletedChange<T>
  | MovedChange<T>
  | ModifiedChange<T>

export const changes = <T>(a: T[], b: T[]): Change<T>[] => {
  const delta = diff(a, b)

  if (delta === undefined || delta._t !== "a") {
    return []
  }

  const d = _.omit(delta, "_t")
  return _.entries(d)
    .map(([key, value]) => {
      const index = parseInt(key)

      if (_.isArray(value)) {
        // modified whole object
        switch (value.length) {
          case 1:
            return {
              type: "added",
              index,
              value: value[0]
            } as AddedChange<T>
          case 2:
            return {
              type: "modified",
              index,
              oldValue: value[0],
              newValue: value[1]
            } as ModifiedChange<T>
          case 3:
            const fromIndex = parseInt(key.replace(/^_/, ""))
            // 3 is the magical number that indicates "array move"
            if (value[2] === 3) {
              return {
                type: "moved",
                fromIndex,
                toIndex: value[1],
                value: value[0]
              } as MovedChange<T>
            }
            return {
              type: "deleted",
              index: fromIndex,
              value: value[0]
            } as DeletedChange<T>
        }
      }

      // modified part of object
      if (_.isObject(value)) {
        const oldDiff = _.fromPairs(_.entries(value).map(([k, v]) => [k, v[0]]))
        const newDiff = _.fromPairs(_.entries(value).map(([k, v]) => [k, v[1]]))
        return {
          type: "modified",
          index,
          oldValue: { ...a[key], ...oldDiff },
          newValue: { ...a[key], ...newDiff }
        } as ModifiedChange<T>
      }
      return null
    })
    .filter(notEmpty)
}

export const isAddedChange = <T>(e: Change<T>): e is AddedChange<T> =>
  e.type === "added"
export const isModifiedChange = <T>(e: Change<T>): e is ModifiedChange<T> =>
  e.type === "modified"
export const isDeletedChange = <T>(e: Change<T>): e is DeletedChange<T> =>
  e.type === "deleted"
