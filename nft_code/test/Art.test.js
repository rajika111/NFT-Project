const Art = artifacts.require('./Art.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Art', (accounts) => {
  let contract

  before(async () => {
    contract = await Art.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = contract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await contract.name()
      assert.equal(name, 'Art')
    })

    it('has a symbol', async () => {
      const symbol = await contract.symbol()
      assert.equal(symbol, 'ART')
    })

  })

  describe('minting', async () => {

    it('creates a new token', async () => {
      const result = await contract.mint('#EC058E')
      const totalSupply = await contract.totalSupply()
      // SUCCESS
      assert.equal(totalSupply, 1)
      const event = result.logs[0].args
      assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
      assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
      assert.equal(event.to, accounts[0], 'to is correct')

      // FAILURE: cannot mint same art twice
      await contract.mint('#EC058E').should.be.rejected;
    })
  })

  describe('indexing', async () => {
    it('lists arts', async () => {
      // Mint 3 more tokens
      await contract.mint('#5386E4')
      await contract.mint('#FFFFFF')
      await contract.mint('#000000')
      const totalSupply = await contract.totalSupply()

      let art
      let result = []

      for (var i = 1; i <= totalSupply; i++) {
        art = await contract.arts(i - 1)
        result.push(art)
      }

      let expected = ['#EC058E', '#5386E4', '#FFFFFF', '#000000']
      assert.equal(result.join(','), expected.join(','))
    })
  })

})