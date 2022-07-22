from fastapi import FastAPI
from controllers.routes import router
from utils.core.orjson import ORJSONResponse

app = FastAPI(default_response_class=ORJSONResponse)

app.include_router(router)