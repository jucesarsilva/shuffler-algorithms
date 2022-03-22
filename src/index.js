window.onload = () => {
  const array = [1, 2, 3]
  let rounds = 0
  let algorithm = 'sort'
  let positions = {}
  
  const roundText = document.getElementById('round-text')
  const buttonStart = document.getElementById('button-start')
  const permutations = document.getElementById('permutations')
  
  roundText.addEventListener('input', (e) => {
    rounds = parseInt(e.target.value || 0)
  })
  
  buttonStart.addEventListener('click', () => {
    algorithm = document.forms.radios.algorithm.value || 'sort'
    reset()
    shuffler()
  })
  
  const reset = () => {
    permutations.innerHTML = ''
    positions = {
      one: {
        n1: 0,
        n2: 0,
        n3: 0,
      },
      two: {
        n1: 0,
        n2: 0,
        n3: 0,
      },
      tree: {
        n1: 0,
        n2: 0,
        n3: 0,
      }
    }
  }
  
  const shuffler = () => {
    let algorithmType = ''
    let shuffled = []
    let showPermutations = document.getElementById('show-permutations').checked
  
    for (let i = 0; i < rounds; i++) {
      if (algorithm === 'sort') {
        algorithmType = 'Javascript Sort Method'
        shuffled = array.sort(() => 0.5 - Math.random())
      } else if (algorithm === 'fisher') {
        algorithmType = 'Fisher Shuffle Method'
        shuffled = fisherShuffle(array)
      } else if (algorithm === 'yates') {
        algorithmType = 'Fisher Yates Shuffle Method'
        shuffled = fisherYatesShuffle(array)
      }
  
      if (shuffled[0] === 1) positions.one.n1 += 1
      else if (shuffled[0] === 2) positions.one.n2 += 1
      else if (shuffled[0] === 3) positions.one.n3 += 1
  
      if (shuffled[1] === 1) positions.two.n1 += 1
      else if (shuffled[1] === 2) positions.two.n2 += 1
      else if (shuffled[1] === 3) positions.two.n3 += 1
  
      if (shuffled[2] === 1) positions.tree.n1 += 1
      else if (shuffled[2] === 2) positions.tree.n2 += 1
      else if (shuffled[2] === 3) positions.tree.n3 += 1
  
      if (showPermutations) {
        const code = document.createElement('code')
        const p = document.createElement('p')
        code.innerText = `array = [${shuffled.join()}]`
        p.appendChild(code)
        permutations.appendChild(p)
      }
    }
  
    document.getElementById('sort-type').innerText = algorithmType
    document.getElementById('one-n1').innerText = `${positions.one.n1} = ${rounds > 0 ? positions.one.n1 * 100 / rounds : 0}%`
    document.getElementById('two-n1').innerText = `${positions.two.n1} = ${rounds > 0 ? positions.two.n1 * 100 / rounds : 0}%`
    document.getElementById('tree-n1').innerText = `${positions.tree.n1} = ${rounds > 0 ? positions.tree.n1 * 100 / rounds : 0}%`
    document.getElementById('one-n2').innerText = `${positions.one.n2} = ${rounds > 0 ? positions.one.n2 * 100 / rounds : 0}%`
    document.getElementById('two-n2').innerText = `${positions.two.n2} = ${rounds > 0 ? positions.two.n2 * 100 / rounds : 0}%`
    document.getElementById('tree-n2').innerText = `${positions.tree.n2} = ${rounds > 0 ? positions.tree.n2 * 100 / rounds : 0}%`
    document.getElementById('one-n3').innerText = `${positions.one.n3} = ${rounds > 0 ? positions.one.n3 * 100 / rounds : 0}%`
    document.getElementById('two-n3').innerText = `${positions.two.n3} = ${rounds > 0 ? positions.two.n3 * 100 / rounds : 0}%`
    document.getElementById('tree-n3').innerText = `${positions.tree.n3} = ${rounds > 0 ? positions.tree.n3 * 100 / rounds : 0}%`
  }
  
  const fisherShuffle = arr => {
    const result = []
    for (let i = arr.length - 1; i >= 0; i--) {
      const r = Math.floor(Math.random() * (i + 1))
      for (let j = 0, k = 0; j <= arr.length - 1; j++) {
        if (result[j] === undefined) {
          if (k === r) {
            result[j] = arr[i]
            break
          }
          k++
        }
      }
    }
    return result
  }
  
  const fisherYatesShuffle = a => {
    var j, x, i
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      x = a[i]
      a[i] = a[j]
      a[j] = x
    }
    return a
  }
  
  reset()
}