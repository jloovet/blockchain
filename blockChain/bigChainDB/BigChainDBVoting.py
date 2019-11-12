#
# http://127.0.0.1:5002/files/BigChainDBVoting.html
#
from bigchaindb_driver import BigchainDB
from bigchaindb_driver.crypto import generate_keypair
from flask import Flask
from flask_restful import Resource, Api

'''flask stuff'''
app = Flask(__name__)
api = Api(app)

'''big chain db connetion'''
bdb = BigchainDB('localhost:9984')
electionMonitors = generate_keypair()
metadata = {'election': 'monetary_system'}

'''json struct to save vote'''
voteJSON = {
'data': {
    'vote': {
         },
    },
}

def vote(electionMonitors, vote, metadata) :
    prepared_creation_tx = bdb.transactions.prepare(
        operation='CREATE',
        signers=electionMonitors.public_key,
        asset=vote,
        metadata=metadata,
    )
    '''sign and send txn'''
    fulfilled_creation_tx = bdb.transactions.fulfill(
        prepared_creation_tx, private_keys=electionMonitors.private_key)
    bdb.transactions.send_commit(fulfilled_creation_tx)

@app.route("/files/<filepath>")
def get_file(filepath):
    return open(filepath).read()

class Voting(Resource):
    def get(self,currency, voterId):
        voteJSON["data"]["vote"]["voter_id"] = voterId
        voteJSON["data"]["vote"]["voter_object"] = currency
        vote(electionMonitors, voteJSON, metadata)

class Searching(Resource):
    def get(self,currency):
        return bdb.assets.get(search=currency)


class Blockinfo(Resource):
    def get(self, block_hash):
        return "APA"


api.add_resource(Voting, '/vote/<currency>/<voterId>')
api.add_resource(Searching, '/search_votes/<currency>')


if __name__ == '__main__':
     app.run(port='5002')
