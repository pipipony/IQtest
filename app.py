from fastapi import FastAPI
from pydantic import BaseModel
from model import *
import random

app = FastAPI()
@app.get("/")
@app.post("/test/")
async def root(i: Original_url):
    return {"original_url": i.original_url}