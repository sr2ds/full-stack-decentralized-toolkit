const nodeRepository = require('../repositories/nodeRepository')

class nodeController {

  async index(req, res) {

    try {
      const list = await nodeRepository.getNodeList()
      // sim, seria melhor em um middleware mas por enquanto só tem essa rota precisando de cors
      res.setHeader('Access-Control-Allow-Origin', '*'); 
      return res.json(list)
    } catch (error) {
      console.log('ERROR', error)
      return res.status(500).send({ error: 'Something failed!' })
    }

  }

  async joinRequest(req, res) {
    try {
      await nodeRepository.joinRequest(req.body)
      return res.json({ status: 'PENDING'})
    }
    catch (error) {
      console.log('ERROR', error)
      return res.status(500).send({ error: 'Something failed!' })
    }
  }

  async updateNodeInfo(req, res) {
    console.log('post: updateNodeInfo')
    const { filename, file } = req.body
    nodeRepository.receiveBroadCast(filename, file)
    return res.json(true)
  }

}

module.exports = new nodeController();