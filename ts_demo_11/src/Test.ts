import validate from './StaticZipCodeValidator'
import { StringValidator } from './Validation'
import { ZipCodeValidator } from './ZipCodeValidator'
import { LettersOnlyValidator } from './LettersOnlyValidator'

let strings = ['Hello', '98052', '101']

strings.forEach(s => {
  console.log(`"${s}" ${validate(s) ? ' matches' : ' does not match'}`)
})


let validators: { [s: string]: StringValidator } = {}
validators['ZIP code'] = new ZipCodeValidator()
validators['Letters only'] = new LettersOnlyValidator()
