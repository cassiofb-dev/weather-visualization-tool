from fastapi import APIRouter
from src.controllers.alerta_rio import alerta_rio_controller as alerta_rio
from src.controllers.satelite import satelite_controller as satelite

router = APIRouter()

router.include_router(alerta_rio.router, prefix = '/alerta-rio')
router.include_router(satelite.router, prefix = '/satelite')