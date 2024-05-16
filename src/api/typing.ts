export interface ResponseBody<T = any> {
  message?: string
  code?: number
  data?: T
  success: boolean
}

/** Unified return structure */
export interface PageResult<T = any> {
  data: T[]
  current?: number
  pageSize?: number
  total?: number
  success: boolean
}
