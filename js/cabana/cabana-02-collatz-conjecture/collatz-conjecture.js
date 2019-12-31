import { Sketch } from '../../handcar'
const s = new Sketch()



function collatz(n) {
  if (n % 2 === 0) {
    // even
    return n / 2
  } else {
    // odd
    return n * 3 + 1
  }
}
