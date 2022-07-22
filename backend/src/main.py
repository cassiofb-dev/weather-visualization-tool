from fastapi import FastAPI
from src.routes.routes import router
from src.utils.core.orjson import ORJSONResponse

app = FastAPI(default_response_class=ORJSONResponse)

app.include_router(router)