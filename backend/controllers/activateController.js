class ActivateController {
  activate(req, res) {
    //logic
    // const { name, avatar } = req.body;
    res.json({message:"ok"})
  }
}

module.exports = new ActivateController();
