from fastapi import FastAPI

from src.core.orjson import ORJSONResponse
from src.alerta_rio.alerta_rio_controller import alerta_rio_controller

app = FastAPI(default_response_class=ORJSONResponse)

app.include_router(alerta_rio_controller)
