import 'should'
import { ProblemDocument, ProblemDocumentExtension } from '../src'

describe('When creating a Problem Document with type and title', (): void => {
  it('should contain title', (done): void => {
    const type = 'http://tempuri.org/my-problem'
    const title = 'something went wrong'
    const doc = new ProblemDocument({ type, title })

    doc.title.should.equal(title)
    doc.type.should.equal(type)

    return done()
  })
})

describe('When creating a Problem Document with invalid URI type member', (): void => {
  it('should throw an error', (done): void => {
    const type = 123

    try {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const doc = new ProblemDocument({ type })
    } catch (error) {
      error.should.not.be.null()

      return done()
    }
  })
})

describe('When creating a Problem Document with an Extension', (): void => {
  it('should contain extension', (done): void => {
    const type = 'http://tempuri.org/my-problem'
    const title = `something went wrong`
    const extensionName = 'invalid-params'
    const extensionValue = 'test'
    const extension = new ProblemDocumentExtension({ 'invalid-params': extensionValue })
    const doc = new ProblemDocument({ type, title }, extension)

    doc[extensionName].should.equal(extensionValue)

    return done()
  })

  it('should allow NULL in the extension value', (done): void => {
    const type = 'http://tempuri.org/my-problem'
    const title = `something went wrong`
    const extensionName = 'has-null'
    const extensionValue = null
    const extension = new ProblemDocumentExtension({ [extensionName]: extensionValue })
    const doc = new ProblemDocument({ type, title }, extension)

    // Note: chaining `should` off a NULL value doesn't work and wrapping
    // it the value to asset in `should` (as a function) also doesn't work
    ;(doc[extensionName] === null).should.be.true;

    return done()
  })

  it('should contain extension added as plain object', (done): void => {
    const type = 'http://tempuri.org/my-problem'
    const title = `something went wrong`
    const extensionName = 'invalid-params'
    const extensionValue = 'test'
    const extension = { 'invalid-params': extensionValue }
    const doc = new ProblemDocument({ type, title }, extension)

    doc[extensionName].should.equal(extensionValue)

    return done()
  })
})

describe('When creating a Problem Document with status member', (): void => {
  it('should contain status member', (done): void => {
    const status = 400
    const doc = new ProblemDocument({ status })

    doc.status.should.equal(status)

    return done()
  })
})

describe('When creating a Problem Document with detail member', (): void => {
  it('should contain detail member', (done): void => {
    const detail = 'Your current balance is 30, but that costs 50.'
    const doc = new ProblemDocument({ detail })

    doc.detail.should.equal(detail)

    return done()
  })
})

describe('When creating a Problem Document with empty string detail', (): void => {
  it('should not contain detail member', (done): void => {
    const doc = new ProblemDocument({ detail: '' })

    doc.should.not.have.property('detail')

    return done()
  })
})

describe('When creating a Problem Document with instance member', (): void => {
  it('should contain instance member', (done): void => {
    const instance = '/account/12345/msgs/abc'
    const doc = new ProblemDocument({ instance })

    doc.instance.should.equal(instance)

    return done()
  })
})

describe('When creating a Problem Document with invalid URI instance member', (): void => {
  it('should throw an error', (done): void => {
    const instance = 123

    try {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const doc = new ProblemDocument({ instance })
    } catch (error) {
      error.should.not.be.null()

      return done()
    }
  })
})
//
describe('When creating a Problem Document only with status member', (): void => {
  it('should contain status member', (done): void => {
    const status = 400
    const doc = new ProblemDocument({ status })

    doc.status.should.equal(status)

    return done()
  })

  it(`should have type 'about:blank'`, (done): void => {
    const status = 400
    const doc = new ProblemDocument({ status })

    doc.type.should.equal('about:blank')

    return done()
  })

  it(`should have title of status code per HTTP spec (e.g. 400 - Bad Request`, (done): void => {
    const status = 400
    const doc = new ProblemDocument({ status })

    doc.title.should.equal('Bad Request')

    return done()
  })
})
