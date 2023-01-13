const liveChatModel = require("../models/liveChat-model")

class liveChat {
    async saveChat(payload){
  return await liveChatModel.create(payload)
    }

    async getChatData(){
        return liveChatModel.find()
    }
}

module.exports = new liveChat()