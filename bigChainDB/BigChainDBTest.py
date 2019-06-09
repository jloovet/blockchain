
from bigchaindb_driver.crypto import generate_keypair
from bigchaindb_driver import BigchainDB

'''generate kyes'''
alice = generate_keypair()
print()
print("KEYS:", alice)
print()
print()
bdb_root_url = 'localhost:9984'


'''get connection'''
conn = BigchainDB('localhost:9984')


'''make up some data'''
bicycle = {
'data': {
    'bicycle': {
            'serial_number': 'abcd1234',
             'manufacturer': 'bkfab',
         },
    },
}
metadata = {'planet': 'earth'}


'''prepare, sign and send txn'''
prepared_creation_tx = conn.transactions.prepare(
    operation='CREATE',
    signers=alice.public_key,
    asset=bicycle,
    metadata=metadata,
)
fulfilled_creation_tx = conn.transactions.fulfill(prepared_creation_tx, private_keys=alice.private_key)
sent_creation_tx = conn.transactions.send_commit(fulfilled_creation_tx)
print("TXN:", fulfilled_creation_tx['id'])
print()
print()

''' verify txn'''
block_height = conn.blocks.get(txid=fulfilled_creation_tx['id'])
block = conn.blocks.retrieve(str(block_height))
print("BLOCK:",block)
print()
print()

''' query for data'''
result = conn.assets.get(search='abcd1234', limit=2)
print("QUERY RESULT:", result)
print()
print()