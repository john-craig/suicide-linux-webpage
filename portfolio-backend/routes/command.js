var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path')
const { NodeSSH } = require('node-ssh')

const ssh = new NodeSSH()

ssh.connect({
  host: '172.17.0.2',
  username: 'visitor',
  privateKey: '/home/iranon/programming/by_project/portfolio/portfolio-container/visitor_id'
})

router.post("/", function(req, res) {
    const cmd = req.body.join(' ')

    ssh.execCommand(cmd, { cwd: '/home/visitor/', stream: 'stdout' }).then(function(result) {
        res.status(200).send(
          {
            "status": "Successful",
            "stdout": result['stdout']
          }
        )
    })
})

//export this router to use in our index.js
module.exports = router;