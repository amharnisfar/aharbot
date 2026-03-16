import pyrogram
from pyrogram import Client, filters

print(pyrogram.__version__)

app1 = Client("app1", api_id=1, api_hash="x", bot_token="a", in_memory=True)
app2 = Client("app2", api_id=1, api_hash="x", bot_token="b", in_memory=True)

@app1.on_message(filters.text)
async def my_handler(client, message):
    pass

print(app1.dispatcher.handlers)
