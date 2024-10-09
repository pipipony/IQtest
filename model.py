from fastapi import FastAPI
from pydantic import BaseModel

class Original_url(BaseModel):
    original_url: str

