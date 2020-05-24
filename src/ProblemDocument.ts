import { statusCodes } from './StatusCodes'
import * as url from 'url'

export class ProblemDocument {
  public detail?: string
  public instance?: string
  public status: number
  public title: string
  public type?: string

  public constructor (options: ProblemDocumentOptions, extension?: ProblemDocumentExtension | Record<string, Object>) {
    const detail = options.detail
    const instance = options.instance
    let type = options.type
    let title = options.title
    const status = options.status

    if (status && !type) {
      type = 'about:blank'
    }

    if (status && type === 'about:blank') {
      title = statusCodes[status]
    }

    if (instance) {
      // eslint-disable-next-line node/no-deprecated-api
      url.parse(instance)
    }

    if (type) {
      // eslint-disable-next-line node/no-deprecated-api
      url.parse(type)
      // eslint-disable-next-line node/no-deprecated-api
    }

    // const result = {
    this.type = type
    this.title = title
    if (detail) {
      this.detail = detail
    }
    this.instance = instance
    this.status = status
    // };

    if (extension) {
      const extensionProperties = extension instanceof ProblemDocumentExtension
        ? extension.extensionProperties
        : extension

      for (const propertyName in extensionProperties) {
        if (extensionProperties.hasOwnProperty(propertyName)) {
          this[propertyName] = extensionProperties[propertyName]
        }
      }
    }
  }
}

export class ProblemDocumentOptions {
  public detail?: string
  public instance?: string
  public type?: string
  public title?: string
  public status?: number
}

export class ProblemDocumentExtension {
  public extensionProperties: Record<string, Object>;

  public constructor (extensionProperties: Record<string, Object>) {
    this.extensionProperties = extensionProperties
  }
}
