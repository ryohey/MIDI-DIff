import { diff, Delta } from "jsondiffpatch"
import { AbsoluteMidiEvent } from "./AbsoluteMidiEvent"
import _ from "lodash"
import { notEmpty } from "../helpers/types"

export interface AddedChange<T> {
  type: "added"
  value: T
}

export interface DeletedChange<T> {
  type: "deleted"
  value: T
}

export interface ModifiedChange<T> {
  type: "modified"
  oldValue: T
  newValue: T
}

export type Change<T> = AddedChange<T> | DeletedChange<T> | ModifiedChange<T>

const changes = <T>(a: T[], b: T[]): Change<T>[] => {
  const delta = diff(a, b)

  if (delta === undefined || delta._t !== "a") {
    return []
  }

  const d = _.omit(delta, "_t")
  return _.entries(d)
    .map(([key, value]) => {
      if (_.isArray(value)) {
        // modified whole object
        switch (value.length) {
          case 1:
            return {
              type: "added",
              value: value[0]
            } as AddedChange<T>
          case 2:
            return {
              type: "modified",
              oldValue: value[0],
              newValue: value[1]
            } as ModifiedChange<T>
          case 3:
            // 3 is the magical number that indicates "array move"
            if (value[2] === 3) {
              return null
            }
            return {
              type: "deleted",
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
          oldValue: { ...a[key], ...oldDiff },
          newValue: { ...a[key], ...newDiff }
        } as ModifiedChange<T>
      }
      return null
    })
    .filter(notEmpty)
}

export const diffEvents = (
  a: AbsoluteMidiEvent[],
  b: AbsoluteMidiEvent[]
): Change<AbsoluteMidiEvent>[] => {
  return changes(a, b)
}
